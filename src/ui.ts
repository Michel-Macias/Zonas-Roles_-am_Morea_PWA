import { escapeHTML } from './utils';
import { getZonesData, currentAsignaciones, saveAsignacion, clearAssignments, currentFloorplanUrl, activeRestaurantId, activeShiftId } from './zones';
import { renderZonesList } from './admin/zones';
import { initZoneForm } from './admin/zone-form';
import { renderFloorplan, initFloorplanToolbar } from './admin/floorplan-editor';
import { renderShiftsList } from './admin/shifts';
import { initShiftForm } from './admin/shift-form';
import { onShiftsChange } from './services/shifts';

export function showAdminPanel(username: string) {
    document.getElementById('admin-login-container')?.classList.add('hidden');
    document.getElementById('admin-content')?.classList.remove('hidden');
    const el = document.getElementById('logged-user-name');
    if(el) el.textContent = username;
    const cfgBtn = document.getElementById('btn-restaurant-config');
    if(cfgBtn) cfgBtn.style.display = 'inline-flex';
    renderZonesList();
    initZoneForm();
    renderFloorplan();
    initShiftForm();
    renderShiftsList();
}

export function hideAdminPanel() {
    document.getElementById('admin-content')?.classList.add('hidden');
    document.getElementById('admin-login-container')?.classList.remove('hidden');
    const el = document.getElementById('logged-user-name');
    if(el) el.textContent = '';
}

export function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if(target.id === 'btn-normas') {
                (document.getElementById('modal-normas') as HTMLDialogElement)?.showModal();
                return;
            }
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            const targetId = target.getAttribute('data-target');
            document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
            if(targetId) {
                document.getElementById(targetId)?.classList.remove('hidden');
                if (targetId === 'view-plano') {
                    renderFloorplan();
                }
            }
        });
    });
}

export function initModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dialog = (e.target as HTMLElement).closest('dialog');
            if(dialog) dialog.close();
        });
    });
}

export function renderAdmin() {
    const container = document.getElementById('grid-zonas-admin');
    if(!container) return;
    
    const zonasData = getZonesData();
    container.innerHTML = zonasData.map(z => `
        <div class="admin-row">
            <label>${z.id} - ${escapeHTML(z.nombre)} (${escapeHTML(z.ubicacion)})</label>
            <input type="text" placeholder="Nombre del camarero/a" data-id="${z.id}" value="${escapeHTML(currentAsignaciones[z.id] || '')}">
        </div>
    `).join('');

    let debounceTimeout: any = null;
    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const id = target.getAttribute('data-id');
                if(id) saveAsignacion(id, target.value.trim());
            }, 600);
        });
    });

    const btnClear = document.getElementById('btn-clear-assignments');
    if(btnClear) {
        // Remove existing listeners by cloning (to prevent duplicates during hot reloads in Vite)
        const newBtn = btnClear.cloneNode(true);
        btnClear.parentNode?.replaceChild(newBtn, btnClear);
        newBtn.addEventListener('click', () => {
            if(confirm('🚨 ¿ALERTA: Seguro que quieres borrar TODAS las asignaciones del turno? (Se borrará instantáneamente en los móviles de TODOS los camareros)')) {
                clearAssignments();
            }
        });
    }
}

export function updateAdminInputs() {
    const container = document.getElementById('grid-zonas-admin');
    if (!container) return;
    container.querySelectorAll('input').forEach(input => {
        if (document.activeElement !== input) {
            const id = input.getAttribute('data-id');
            if(id) input.value = currentAsignaciones[id] || '';
        }
    });
}

function getMiZonaId(): string | null {
    return localStorage.getItem('puestoya_mi_zona_' + activeRestaurantId);
}

export function renderCamareros() {
    const container = document.getElementById('grid-zonas-camarero');
    if(!container) return;
    const zonasData = getZonesData();
    const miZonaId = getMiZonaId();
    container.innerHTML = zonasData.map(z => {
        const asignado = currentAsignaciones[z.id];
        const isMiZona = z.id === miZonaId;
        return `
            <div class="zona-card ${asignado ? 'has-asignado' : ''} ${isMiZona ? 'is-mi-zona' : ''}" data-id="${z.id}">
                <div class="zona-id">${z.id}</div>
                <div class="zona-nombre">${escapeHTML(z.nombre)}</div>
                ${asignado ? `<div class="zona-asignado">👤 ${escapeHTML(asignado)}</div>` : `<div class="zona-asignado" style="background:transparent;color:var(--text-muted);border:1px solid var(--border-color);">Sin asignar</div>`}
            </div>
        `;
    }).join('');

    container.querySelectorAll('.zona-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            if(id) showZonaModal(id);
        });
    });
}

export function showZonaModal(id: string) {
    const modal = document.getElementById('modal-zona') as HTMLDialogElement;
    if(!modal) return;
    
    modal.setAttribute('data-active-zona', id);
    const zonasData = getZonesData();
    const zona = zonasData.find(z => z.id === id);
    if(!zona) return;
    
    const asignado = currentAsignaciones[id] || 'Sin asignar';
    const dynamicCanvas = document.getElementById('floorplan-canvas');
    let mapHtml = '';
    if (dynamicCanvas && dynamicCanvas.style.display !== 'none') {
        mapHtml = dynamicCanvas.outerHTML;
    } else {
        mapHtml = document.getElementById('plano-svg')?.outerHTML || '';
    }

    const isMiZona = id === getMiZonaId();
    const btnText = isMiZona ? '⭐ Quitar de mi zona' : '☆ Marcar como mi zona';
    const btnStyle = isMiZona
        ? 'background: #EFF6FF; border-color: #3B82F6; color: #1D4ED8;'
        : 'background: var(--bg-card); border-color: var(--border-color); color: var(--text-muted);';

    const html = `
        <div class="modal-body-zona">
            <h2>${zona.id} - ${escapeHTML(zona.nombre)}</h2>
            <p style="color:var(--text-muted); margin-bottom:10px; font-size:0.95rem; font-weight:500;">📍 ${escapeHTML(zona.ubicacion)}</p>
            <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>👤 Camarero/a:</strong> <span style="color:var(--primary-hover); font-weight:800;">${escapeHTML(asignado)}</span></p>
            
            <button id="btn-toggle-mi-zona" class="btn-manual" style="margin-top: 5px; margin-bottom: 15px; width: 100%; font-weight: 600; display: inline-flex; justify-content: center; align-items: center; gap: 6px; ${btnStyle}" data-zone-id="${id}">
                ${btnText}
            </button>

            <div class="modal-map-container">
                ${mapHtml}
            </div>
            
            <div class="section-title">🎯 Misión Principal</div>
            <p style="font-size: 1rem;">${escapeHTML(zona.mision_principal)}</p>
            
            <div class="section-title">📋 Tareas y Equipamiento</div>
            <div>${zona.tareas_secundarias.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
            <div style="margin-top:8px;">${zona.equipamiento.map(e => `<span class="tag" style="background:#FFF7ED; color:#EA580C; border-color:#FDBA74;">⚙️ ${escapeHTML(e)}</span>`).join('')}</div>
            
            <div class="section-title">🔄 Flujos de Trabajo</div>
            <p style="font-size: 0.95rem;"><strong>Pide a:</strong> ${zona.flujos.pide_a.map(x => escapeHTML(x)).join(', ')}</p>
            <p style="font-size: 0.95rem;"><strong>Da soporte a:</strong> ${zona.flujos.da_soporte_a.map(x => escapeHTML(x)).join(', ')}</p>
            
            ${zona.notas_especiales ? `<div class="section-title" style="color:var(--danger)">⚠️ Notas Críticas</div><p style="font-size: 0.95rem;">${escapeHTML(zona.notas_especiales)}</p>` : ''}
        </div>
    `;
    
    const bodyEl = document.getElementById('modal-body-zona');
    if(bodyEl) bodyEl.innerHTML = html;

    const toggleBtn = document.getElementById('btn-toggle-mi-zona');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentMiZona = getMiZonaId();
            if (currentMiZona === id) {
                localStorage.removeItem('puestoya_mi_zona_' + activeRestaurantId);
            } else {
                localStorage.setItem('puestoya_mi_zona_' + activeRestaurantId, id);
            }
            renderCamareros();
            showZonaModal(id);
        });
    }
    
    const modalMap = document.querySelector('#modal-body-zona .plano-svg');
    if(modalMap) {
        modalMap.removeAttribute('id');
        const activeGroup = modalMap.querySelector('#map-' + id);
        if(activeGroup) activeGroup.classList.add('active');
    }

    const modalCanvas = document.querySelector('#modal-body-zona .floorplan-canvas') as HTMLElement | null;
    if (modalCanvas) {
        modalCanvas.removeAttribute('id');
        modalCanvas.classList.remove('design-mode');
        const activeBlock = modalCanvas.querySelector(`[data-zone-id="${id}"]`);
        if (activeBlock) {
            activeBlock.classList.add('active');
        }
    }
    
    if (!modal.open) {
        modal.showModal();
    }
}

export function updateModalIfOpen() {
    const modal = document.getElementById('modal-zona') as HTMLDialogElement;
    if (modal && modal.open) {
        const activeId = modal.getAttribute('data-active-zona');
        if (activeId) showZonaModal(activeId);
    }
}

export function renderAll() {
    updateAdminInputs();
    renderZonesList();
    renderCamareros();
    updateModalIfOpen();
    renderFloorplanPreview();
    renderFloorplan();
    updateShiftSelectors();

    if (!document.getElementById('admin-content')?.classList.contains('hidden')) {
        renderShiftsList();
    }
}

export function initRestaurantNameConfig() {
    const btn = document.getElementById('btn-restaurant-config');
    const modal = document.getElementById('modal-restaurant-config') as HTMLDialogElement | null;
    const form = document.getElementById('form-restaurant-name') as HTMLFormElement | null;
    const input = document.getElementById('input-restaurant-name') as HTMLInputElement | null;
    const errorEl = document.getElementById('restaurant-config-error');

    if(!btn || !modal || !form || !input || !errorEl) return;

    btn.addEventListener('click', () => {
        errorEl.style.display = 'none';
        const current = (document.getElementById('restaurant-name-badge')?.textContent || '').trim();
        input.value = current;
        modal.showModal();
    });

    document.querySelector('#modal-restaurant-config .close-modal')?.addEventListener('click', () => modal.close());

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.style.display = 'none';
        const name = input.value.trim();
        if(!name) {
            errorEl.textContent = 'El nombre no puede estar vacío.';
            errorEl.style.display = 'block';
            return;
        }

        try {
            const { set, ref } = await import('firebase/database');
            const { db } = await import('./firebase');
            const { activeRestaurantId } = await import('./zones');
            await set(ref(db, `restaurants/${activeRestaurantId}/config/name`), name);
            const badge = document.getElementById('restaurant-name-badge');
            if(badge) badge.textContent = name;
            modal.close();
        } catch(err) {
            console.error('Error guardando nombre de restaurante', err);
            errorEl.textContent = 'Error al guardar. Revisa tu conexión e inténtalo de nuevo.';
            errorEl.style.display = 'block';
        }
    });
}

export function renderFloorplanPreview() {
    const previewContainer = document.getElementById('floorplan-preview-container');
    const previewImg = document.getElementById('floorplan-preview') as HTMLImageElement | null;
    const dropzone = document.getElementById('floorplan-dropzone');

    if (!previewContainer || !previewImg || !dropzone) return;

    if (currentFloorplanUrl) {
        previewImg.src = currentFloorplanUrl;
        previewContainer.style.display = 'block';
        const dropzoneText = dropzone.querySelector('p');
        if (dropzoneText) {
            dropzoneText.textContent = 'Arrastra aquí para reemplazar el plano o haz clic';
        }
    } else {
        previewImg.src = '';
        previewContainer.style.display = 'none';
        const dropzoneText = dropzone.querySelector('p');
        if (dropzoneText) {
            dropzoneText.textContent = 'Arrastra aquí la foto del plano o haz clic para buscar';
        }
    }
}

export function initFloorplanUpload() {
    const dropzone = document.getElementById('floorplan-dropzone');
    const fileInput = document.getElementById('floorplan-file-input') as HTMLInputElement | null;
    const progressContainer = document.getElementById('floorplan-progress-container');
    const progressText = document.getElementById('floorplan-progress-text');
    const progressBar = document.getElementById('floorplan-progress-bar') as HTMLElement | null;
    const previewContainer = document.getElementById('floorplan-preview-container');
    const previewImg = document.getElementById('floorplan-preview') as HTMLImageElement | null;
    const btnRemove = document.getElementById('btn-remove-floorplan');

    if (!dropzone || !fileInput || !progressContainer || !progressText || !progressBar || !previewContainer || !previewImg || !btnRemove) {
        return;
    }

    const inputEl = fileInput;
    const containerEl = progressContainer;
    const barEl = progressBar;
    const textEl = progressText;

    // Manejo de drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt?.files;
        if (files && files.length > 0) {
            handleFileSelection(files[0]);
        }
    });

    dropzone.addEventListener('click', () => {
        inputEl.click();
    });

    inputEl.addEventListener('change', () => {
        const files = inputEl.files;
        if (files && files.length > 0) {
            handleFileSelection(files[0]);
        }
    });

    function handleFileSelection(file: File) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert('Formato de archivo no válido. Solo se permiten imágenes JPG y PNG.');
            inputEl.value = '';
            return;
        }

        const maxBytes = 5 * 1024 * 1024;
        if (file.size > maxBytes) {
            alert('El archivo supera el tamaño máximo permitido de 5MB.');
            inputEl.value = '';
            return;
        }

        uploadFile(file);
    }

    async function uploadFile(file: File) {
        try {
            const { ref: storageRef, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
            const { ref: dbRef, set } = await import('firebase/database');
            const { storage, db } = await import('./firebase');
            const { activeRestaurantId } = await import('./zones');

            if (!activeRestaurantId) {
                alert('No hay un restaurante activo seleccionado.');
                return;
            }

            const fileRef = storageRef(storage, `restaurants/${activeRestaurantId}/floorplan.png`);
            
            containerEl.style.display = 'block';
            barEl.style.width = '0%';
            textEl.textContent = '0%';

            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    barEl.style.width = `${progress}%`;
                    textEl.textContent = `${progress}%`;
                },
                (error) => {
                    console.error('Error al subir el plano:', error);
                    alert(`Fallo en la subida: ${error.message}`);
                    containerEl.style.display = 'none';
                    inputEl.value = '';
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        await set(dbRef(db, `restaurants/${activeRestaurantId}/config/floorplanUrl`), downloadUrl);
                        alert('¡Plano subido con éxito!');
                        containerEl.style.display = 'none';
                        inputEl.value = '';
                    } catch (dbErr) {
                        console.error('Error al guardar URL en la base de datos:', dbErr);
                        alert('Error al guardar la referencia en la base de datos.');
                        containerEl.style.display = 'none';
                        inputEl.value = '';
                    }
                }
            );
        } catch (err) {
            console.error('Error al cargar módulos de Firebase:', err);
            alert('Error del sistema al iniciar la subida.');
            containerEl.style.display = 'none';
        }
    }

    btnRemove.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!confirm('¿Estás seguro de que quieres eliminar el plano actual?')) {
            return;
        }

        try {
            const { ref: storageRef, deleteObject } = await import('firebase/storage');
            const { ref: dbRef, remove } = await import('firebase/database');
            const { storage, db } = await import('./firebase');
            const { activeRestaurantId } = await import('./zones');

            if (!activeRestaurantId) return;

            const fileRef = storageRef(storage, `restaurants/${activeRestaurantId}/floorplan.png`);
            
            try {
                await deleteObject(fileRef);
            } catch (storageErr: any) {
                if (storageErr.code !== 'storage/object-not-found') {
                    console.error('Error al eliminar plano de Firebase Storage:', storageErr);
                }
            }

            await remove(dbRef(db, `restaurants/${activeRestaurantId}/config/floorplanUrl`));
            alert('Plano eliminado correctamente.');
        } catch (err) {
            console.error('Error al eliminar el plano:', err);
            alert('Error al eliminar el plano. Revisa tu conexión.');
        }
    });
}

export function initFloorplanTab() {
    initFloorplanToolbar();
}

function setupShiftSelectors() {
    onShiftsChange((shifts) => {
        const adminSelect = document.getElementById('select-active-shift-admin') as HTMLSelectElement | null;
        const camareroSelect = document.getElementById('select-active-shift-camarero') as HTMLSelectElement | null;
        
        const optionsHtml = `
            <option value="">-- Sin Turno Asignado --</option>
            ${shifts.map(s => `<option value="${s.id || ''}" ${s.id === activeShiftId ? 'selected' : ''}>${escapeHTML(s.nombre)} (${escapeHTML(s.horaInicio)} - ${escapeHTML(s.horaFin)})</option>`).join('')}
        `;
        
        if (adminSelect) {
            adminSelect.innerHTML = optionsHtml;
            adminSelect.value = activeShiftId || '';
        }
        if (camareroSelect) {
            camareroSelect.innerHTML = optionsHtml;
            camareroSelect.value = activeShiftId || '';
        }
    });

    const handleSelectChange = async (e: Event) => {
        const val = (e.target as HTMLSelectElement).value;
        try {
            const { set, ref } = await import('firebase/database');
            const { db } = await import('./firebase');
            await set(ref(db, `restaurants/${activeRestaurantId}/config/activeShiftId`), val || null);
        } catch (err) {
            console.error("Error setting active shift:", err);
        }
    };

    const adminSelect = document.getElementById('select-active-shift-admin');
    if (adminSelect) {
        adminSelect.addEventListener('change', handleSelectChange);
    }

    const camareroSelect = document.getElementById('select-active-shift-camarero');
    if (camareroSelect) {
        camareroSelect.addEventListener('change', handleSelectChange);
    }
}

export function updateShiftSelectors() {
    const adminSelect = document.getElementById('select-active-shift-admin') as HTMLSelectElement | null;
    const camareroSelect = document.getElementById('select-active-shift-camarero') as HTMLSelectElement | null;
    if (adminSelect) adminSelect.value = activeShiftId || '';
    if (camareroSelect) camareroSelect.value = activeShiftId || '';
}

export function initShiftsUI() {
    setupShiftSelectors();
}
