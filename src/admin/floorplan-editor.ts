import { getZonesData, currentFloorplanUrl } from '../zones';
import { showZonaModal } from '../ui';

// Variables para rastrear el estado del lienzo
export let isDesignMode = false;
let tempPositions: Record<string, { x: number, y: number, w: number, h: number }> = {};
let activePointerId: number | null = null;
let dragTarget: HTMLElement | null = null;
let dragOffset = { x: 0, y: 0 };
let isResizing = false;
let initialRect = { x: 0, y: 0, w: 0, h: 0 };
let initialPointer = { x: 0, y: 0 };

export function renderFloorplan() {
    const canvas = document.getElementById('floorplan-canvas');
    const svgFallback = document.getElementById('plano-svg');
    const toolbar = document.getElementById('floorplan-toolbar');

    if (!canvas || !svgFallback) return;

    // Verificar si el usuario está autenticado y es admin para mostrar el toolbar
    const isAdmin = !document.getElementById('admin-content')?.classList.contains('hidden');
    if (toolbar) {
        toolbar.style.display = isAdmin ? 'flex' : 'none';
    }

    if (!currentFloorplanUrl) {
        // Fallback: mostrar el SVG estático
        canvas.style.display = 'none';
        svgFallback.style.display = 'block';
        
        const hint = document.getElementById('floorplan-edit-hint');
        if (hint) hint.style.display = 'none';
        return;
    }

    // Mostrar el lienzo y ocultar el SVG
    svgFallback.style.display = 'none';
    canvas.style.display = 'block';
    canvas.style.backgroundImage = `url("${currentFloorplanUrl}")`;

    // Si entramos en modo diseño, aplicamos clase
    if (isDesignMode) {
        canvas.classList.add('design-mode');
    } else {
        canvas.classList.remove('design-mode');
    }

    // Limpiar canvas
    canvas.innerHTML = '';

    const zones = getZonesData();
    zones.forEach(z => {
        // Posiciones por defecto si no están configuradas
        const pos = z.position || {
            x: 5 + (zones.indexOf(z) * 14) % 80,
            y: 10 + Math.floor((zones.indexOf(z) * 14) / 80) * 20,
            width: 14,
            height: 14
        };

        // Si ya hay posiciones modificadas temporalmente en el editor
        const currentPos = tempPositions[z.id] || {
            x: pos.x,
            y: pos.y,
            w: pos.width,
            h: pos.height
        };

        // Crear elemento DOM de la zona
        const block = document.createElement('div');
        block.className = 'canvas-zone-block';
        block.setAttribute('data-zone-id', z.id);
        
        // Estilos de posición absoluta en base a porcentajes
        block.style.left = `${currentPos.x}%`;
        block.style.top = `${currentPos.y}%`;
        block.style.width = `${currentPos.w}%`;
        block.style.height = `${currentPos.h}%`;

        // Contenido de texto
        const idSpan = document.createElement('span');
        idSpan.className = 'canvas-zone-id';
        idSpan.textContent = z.id;
        block.appendChild(idSpan);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'canvas-zone-label';
        nameSpan.textContent = z.nombre;
        block.appendChild(nameSpan);

        // Si es modo diseño, añadir tirador de redimensión y habilitar drag
        if (isDesignMode) {
            const handle = document.createElement('div');
            handle.className = 'zone-resize-handle';
            block.appendChild(handle);

            // Escuchar drag del bloque
            block.addEventListener('pointerdown', (e) => {
                const targetEl = e.target as HTMLElement;
                if (targetEl.classList.contains('zone-resize-handle')) {
                    // Iniciando redimensión
                    isResizing = true;
                    dragTarget = block;
                    activePointerId = e.pointerId;
                    initialRect = {
                        x: currentPos.x,
                        y: currentPos.y,
                        w: currentPos.w,
                        h: currentPos.h
                    };
                    initialPointer = { x: e.clientX, y: e.clientY };
                    block.setPointerCapture(e.pointerId);
                    e.stopPropagation();
                    return;
                }

                // Iniciando movimiento
                isResizing = false;
                dragTarget = block;
                activePointerId = e.pointerId;
                
                const clientRect = block.getBoundingClientRect();
                dragOffset.x = e.clientX - clientRect.left;
                dragOffset.y = e.clientY - clientRect.top;
                
                block.setPointerCapture(e.pointerId);
                e.stopPropagation();
            });

            block.addEventListener('pointermove', (e) => {
                if (dragTarget !== block || activePointerId !== e.pointerId) return;

                const parentRect = canvas.getBoundingClientRect();

                if (isResizing) {
                    // Cálculo de nueva anchura y altura en %
                    const deltaX = e.clientX - initialPointer.x;
                    const deltaY = e.clientY - initialPointer.y;
                    
                    const deltaWPercent = (deltaX / parentRect.width) * 100;
                    const deltaHPercent = (deltaY / parentRect.height) * 100;

                    let newW = Math.max(5, initialRect.w + deltaWPercent);
                    let newH = Math.max(5, initialRect.h + deltaHPercent);

                    // Limitar para no salir del canvas
                    if (initialRect.x + newW > 100) newW = 100 - initialRect.x;
                    if (initialRect.y + newH > 100) newH = 100 - initialRect.y;

                    block.style.width = `${newW}%`;
                    block.style.height = `${newH}%`;

                    tempPositions[z.id] = {
                        x: initialRect.x,
                        y: initialRect.y,
                        w: newW,
                        h: newH
                    };
                } else {
                    // Cálculo de nueva posición en %
                    const clientXInParent = e.clientX - parentRect.left - dragOffset.x;
                    const clientYInParent = e.clientY - parentRect.top - dragOffset.y;

                    let percentX = (clientXInParent / parentRect.width) * 100;
                    let percentY = (clientYInParent / parentRect.height) * 100;

                    // Limitar dentro del lienzo (0% a 100%)
                    const blockW = currentPos.w;
                    const blockH = currentPos.h;

                    percentX = Math.max(0, Math.min(100 - blockW, percentX));
                    percentY = Math.max(0, Math.min(100 - blockH, percentY));

                    block.style.left = `${percentX}%`;
                    block.style.top = `${percentY}%`;

                    tempPositions[z.id] = {
                        x: percentX,
                        y: percentY,
                        w: blockW,
                        h: blockH
                    };
                }
            });

            block.addEventListener('pointerup', (e) => {
                if (dragTarget === block && activePointerId === e.pointerId) {
                    block.releasePointerCapture(e.pointerId);
                    dragTarget = null;
                    activePointerId = null;
                }
            });
        } else {
            // Modo camarero o lectura: abrir modal de detalles al hacer click
            block.addEventListener('click', () => {
                showZonaModal(z.id);
            });
        }

        canvas.appendChild(block);
    });
}

// Iniciar eventos del panel del plano
let toolbarInitialized = false;
export function initFloorplanToolbar() {
    if (toolbarInitialized) return;
    toolbarInitialized = true;

    const btnEdit = document.getElementById('btn-edit-layout');
    const btnSave = document.getElementById('btn-save-layout');
    const btnCancel = document.getElementById('btn-cancel-layout');
    const hint = document.getElementById('floorplan-edit-hint');

    if (!btnEdit || !btnSave || !btnCancel) return;

    btnEdit.addEventListener('click', () => {
        isDesignMode = true;
        tempPositions = {}; // reset temporales
        btnEdit.style.display = 'none';
        btnSave.style.display = 'inline-flex';
        btnCancel.style.display = 'inline-flex';
        if (hint) hint.style.display = 'block';
        renderFloorplan();
    });

    btnCancel.addEventListener('click', () => {
        isDesignMode = false;
        tempPositions = {};
        btnEdit.style.display = 'inline-flex';
        btnSave.style.display = 'none';
        btnCancel.style.display = 'none';
        if (hint) hint.style.display = 'none';
        renderFloorplan();
    });

    btnSave.addEventListener('click', async () => {
        if (!confirm('¿Deseas guardar la nueva distribución del plano?')) return;

        try {
            const { ref, set } = await import('firebase/database');
            const { db } = await import('../firebase');
            const { activeRestaurantId } = await import('../zones');

            const promises = Object.keys(tempPositions).map(async (zoneId) => {
                const pos = tempPositions[zoneId];
                // Persistir posición
                await set(ref(db, `restaurants/${activeRestaurantId}/zones/${zoneId}/position`), {
                    x: Math.round(pos.x * 10) / 10,
                    y: Math.round(pos.y * 10) / 10,
                    width: Math.round(pos.w * 10) / 10,
                    height: Math.round(pos.h * 10) / 10
                });
            });

            await Promise.all(promises);
            alert('¡Distribución del plano guardada con éxito!');
            
            isDesignMode = false;
            tempPositions = {};
            btnEdit.style.display = 'inline-flex';
            btnSave.style.display = 'none';
            btnCancel.style.display = 'none';
            if (hint) hint.style.display = 'none';
            renderFloorplan();
        } catch (err) {
            console.error('Error al guardar distribución:', err);
            alert('Error al guardar la distribución del plano. Revisa tu conexión.');
        }
    });
}
