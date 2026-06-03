const zonasData = [
    { "id": "Z1", "nombre": "Zona 1", "ubicacion": "Barra - Sup Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Reposición de material", "Apoyo a Zona 2"], "equipamiento": ["Plancha 1", "Microondas 2"], "flujos": { "pide_a": ["Z2 (Cafés)"], "da_soporte_a": ["Z2"] } },
    { "id": "Z2", "nombre": "Zona 2", "ubicacion": "Barra - Media Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Preparar cafés", "Preparar tortillas"], "equipamiento": ["Cafetera 1"], "flujos": { "pide_a": ["Z1 (Zumos)", "Z4 (Sándwiches)"], "da_soporte_a": ["Z1", "Z3"] } },
    { "id": "Z3", "nombre": "Zona 3", "ubicacion": "Barra - Inf Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Preparar tortillas", "Gestión Pulmón 3", "Reposición platos"], "equipamiento": ["Plancha 2", "Micro 1"], "flujos": { "pide_a": ["Z2 (Cafés)", "Z1 (Zumos)", "Z4 (Bollos)"], "da_soporte_a": ["Z2", "Z4"] } },
    { "id": "Z4", "nombre": "Zona 4", "ubicacion": "Barra - Esq Inf Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Gestión cámara fría", "Bollería"], "equipamiento": ["Plancha 2", "Micro 1"], "flujos": { "pide_a": ["Z5 (Cafés)", "Z3 (Tortillas)"], "da_soporte_a": ["Z3", "Z5"] } },
    { "id": "Z5", "nombre": "Zona 5", "ubicacion": "Caja / Barra Izquierda", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Cobro comedor"], "equipamiento": ["Cafetera 2", "Caja Registradora"], "flujos": { "pide_a": ["Z3/Z4 (Tortillas)"], "da_soporte_a": ["Z4", "Z6"] } },
    { "id": "Z6", "nombre": "Zona 6", "ubicacion": "Pasillo Izquierdo", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Gestión vajilla", "Pulmones vasos/platos"], "equipamiento": ["Plancha 1", "Micro 2"], "flujos": { "pide_a": ["Z1 (Zumos)", "Z3/Z4 (Tortillas)"], "da_soporte_a": ["Z5", "Z7", "Comedor"] } },
    { "id": "Z7", "nombre": "Zona 7", "ubicacion": "Fregadero / Lavavajillas", "mision_principal": "Soporte logístico y limpieza", "tareas_secundarias": ["Recorrido carro vajilla", "Limpieza sillas comedor"], "equipamiento": ["Carro de vajilla", "Lavavajillas 1 y 2"], "notas_especiales": "Rota cada 2 horas. No atención directa.", "flujos": { "pide_a": ["Z1/Z2 (Zumos y reposición si desborda)"], "da_soporte_a": ["Z1", "Z6", "Comedor"] } }
];

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderAdmin();
    renderCamareros();
    initModals();
});

function getAsignaciones() {
    return JSON.parse(localStorage.getItem('asignaciones_nam') || '{}');
}

function saveAsignacion(id, name) {
    const asignaciones = getAsignaciones();
    asignaciones[id] = name;
    localStorage.setItem('asignaciones_nam', JSON.stringify(asignaciones));
    renderCamareros();
}

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(e.target.id === 'btn-normas') {
                document.getElementById('modal-normas').showModal();
                return;
            }
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const targetId = e.target.getAttribute('data-target');
            document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
        });
    });
}

function renderAdmin() {
    const container = document.getElementById('grid-zonas-admin');
    const asignaciones = getAsignaciones();
    container.innerHTML = zonasData.map(z => `
        <div class="admin-row">
            <label>${z.id} - ${z.nombre} (${z.ubicacion})</label>
            <input type="text" placeholder="Nombre del camarero/a" data-id="${z.id}" value="${asignaciones[z.id] || ''}">
        </div>
    `).join('');

    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => saveAsignacion(e.target.getAttribute('data-id'), e.target.value));
    });

    document.getElementById('btn-clear-assignments').addEventListener('click', () => {
        if(confirm('¿Limpiar todas las asignaciones?')) {
            localStorage.removeItem('asignaciones_nam');
            renderAdmin();
            renderCamareros();
        }
    });
}

function renderCamareros() {
    const container = document.getElementById('grid-zonas-camarero');
    const asignaciones = getAsignaciones();
    container.innerHTML = zonasData.map(z => {
        const asignado = asignaciones[z.id];
        return `
            <div class="zona-card ${asignado ? 'has-asignado' : ''}" data-id="${z.id}">
                <div class="zona-id">${z.id}</div>
                <div class="zona-nombre">${z.nombre}</div>
                ${asignado ? `<div class="zona-asignado">👤 ${asignado}</div>` : `<div class="zona-asignado" style="background:transparent;color:var(--text-muted)">Sin asignar</div>`}
            </div>
        `;
    }).join('');

    container.querySelectorAll('.zona-card').forEach(card => {
        card.addEventListener('click', () => showZonaModal(card.getAttribute('data-id')));
    });
}

function showZonaModal(id) {
    const zona = zonasData.find(z => z.id === id);
    const asignaciones = getAsignaciones();
    const asignado = asignaciones[id] || 'Sin asignar';
    
    const html = `
        <h2>${zona.id} - ${zona.nombre}</h2>
        <p style="color:var(--text-muted); margin-bottom:10px; font-size:0.9rem;">📍 ${zona.ubicacion}</p>
        <p><strong>👤 Camarero/a:</strong> <span style="color:var(--primary)">${asignado}</span></p>
        
        <div class="section-title">🎯 Misión Principal</div>
        <p style="font-size: 0.95rem;">${zona.mision_principal}</p>
        
        <div class="section-title">📋 Tareas y Equipamiento</div>
        <div>${zona.tareas_secundarias.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div style="margin-top:5px;">${zona.equipamiento.map(e => `<span class="tag" style="background:#4A1A00; color:#FFB300;">${e}</span>`).join('')}</div>
        
        <div class="section-title">🔄 Flujos de Trabajo</div>
        <p style="font-size: 0.9rem;"><strong>Pide a:</strong> ${zona.flujos.pide_a.join(', ')}</p>
        <p style="font-size: 0.9rem;"><strong>Da soporte a:</strong> ${zona.flujos.da_soporte_a.join(', ')}</p>
        
        ${zona.notas_especiales ? `<div class="section-title" style="color:var(--danger)">⚠️ Notas</div><p style="font-size: 0.9rem;">${zona.notas_especiales}</p>` : ''}
    `;
    
    document.getElementById('modal-body-zona').innerHTML = html;
    document.getElementById('modal-zona').showModal();
}

function initModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('dialog').close());
    });
}
