import { escapeHTML } from './utils';
import { getZonesData, currentAsignaciones, saveAsignacion, clearAssignments } from './zones';

export function showAdminPanel(username: string) {
    document.getElementById('admin-login-container')?.classList.add('hidden');
    document.getElementById('admin-content')?.classList.remove('hidden');
    const el = document.getElementById('logged-user-name');
    if(el) el.textContent = username;
    const cfgBtn = document.getElementById('btn-restaurant-config');
    if(cfgBtn) cfgBtn.style.display = 'inline-flex';
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

export function renderCamareros() {
    const container = document.getElementById('grid-zonas-camarero');
    if(!container) return;
    const zonasData = getZonesData();
    container.innerHTML = zonasData.map(z => {
        const asignado = currentAsignaciones[z.id];
        return `
            <div class="zona-card ${asignado ? 'has-asignado' : ''}" data-id="${z.id}">
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
    const mapHtml = document.getElementById('plano-svg')?.outerHTML || '';
    
    const html = `
        <div class="modal-body-zona">
            <h2>${zona.id} - ${escapeHTML(zona.nombre)}</h2>
            <p style="color:var(--text-muted); margin-bottom:10px; font-size:0.95rem; font-weight:500;">📍 ${escapeHTML(zona.ubicacion)}</p>
            <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>👤 Camarero/a:</strong> <span style="color:var(--primary-hover); font-weight:800;">${escapeHTML(asignado)}</span></p>
            
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
    
    const modalMap = document.querySelector('#modal-body-zona .plano-svg');
    if(modalMap) {
        modalMap.removeAttribute('id');
        const activeGroup = modalMap.querySelector('#map-' + id);
        if(activeGroup) activeGroup.classList.add('active');
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
    renderCamareros();
    updateModalIfOpen();
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
