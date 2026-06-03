import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Credenciales inyectadas por el Director
const firebaseConfig = {
  apiKey: "AIzaSyArHwZMlyz71o24VIj5yZlPxgswGpKJkVA",
  authDomain: "nam-zonas.firebaseapp.com",
  databaseURL: "https://nam-zonas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nam-zonas",
  storageBucket: "nam-zonas.firebasestorage.app",
  messagingSenderId: "491108708871",
  appId: "1:491108708871:web:1e275d78ac0d25de8330a2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Estado de la memoria central (SOT)
let currentAsignaciones = {};

const zonasData = [
    { "id": "Z1", "nombre": "Zona 1", "ubicacion": "Barra - Sup Izquierda", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Reposición de material", "Apoyo a Zona 2"], "equipamiento": ["Plancha 1", "Microondas 2"], "flujos": { "pide_a": ["Z2 (Cafés)"], "da_soporte_a": ["Z2"] } },
    { "id": "Z2", "nombre": "Zona 2", "ubicacion": "Barra - Media Frontal", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Preparar cafés", "Preparar tortillas"], "equipamiento": ["Cafetera 1"], "flujos": { "pide_a": ["Z1 (Zumos)", "Z4 (Sándwiches)"], "da_soporte_a": ["Z1", "Z3"] } },
    { "id": "Z3", "nombre": "Zona 3", "ubicacion": "Barra - Sup Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Preparar tortillas", "Gestión Pulmón 3", "Reposición platos"], "equipamiento": ["Plancha 2", "Micro 1"], "flujos": { "pide_a": ["Z2 (Cafés)", "Z1 (Zumos)", "Z4 (Bollos)"], "da_soporte_a": ["Z2", "Z4"] } },
    { "id": "Z4", "nombre": "Zona 4", "ubicacion": "Esquina / Barra Lateral Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Gestión cámara fría", "Bollería"], "equipamiento": ["Plancha 2", "Micro 1"], "flujos": { "pide_a": ["Z5 (Cafés)", "Z3 (Tortillas)"], "da_soporte_a": ["Z3", "Z5"] } },
    { "id": "Z5", "nombre": "Zona 5", "ubicacion": "Caja / Esquina Inferior Derecha", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Cobro comedor"], "equipamiento": ["Cafetera 2", "Caja Registradora"], "flujos": { "pide_a": ["Z3/Z4 (Tortillas)"], "da_soporte_a": ["Z4", "Z6"] } },
    { "id": "Z6", "nombre": "Zona 6", "ubicacion": "Pasillo Central Inferior", "mision_principal": "Atención al cliente de su zona", "tareas_secundarias": ["Gestión vajilla", "Pulmones vasos/platos"], "equipamiento": ["Plancha 1", "Micro 2"], "flujos": { "pide_a": ["Z1 (Zumos)", "Z3/Z4 (Tortillas)"], "da_soporte_a": ["Z5", "Z7", "Comedor"] } },
    { "id": "Z7", "nombre": "Zona 7", "ubicacion": "Esquina Inferior Izquierda / Fregadero", "mision_principal": "Soporte logístico y limpieza", "tareas_secundarias": ["Recorrido carro vajilla", "Limpieza sillas comedor"], "equipamiento": ["Carro de vajilla", "Lavavajillas 1 y 2"], "notas_especiales": "Rota cada 2 horas. No atención directa.", "flujos": { "pide_a": ["Z1/Z2 (Zumos y reposición si desborda)"], "da_soporte_a": ["Z1", "Z6", "Comedor"] } }
];

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initModals();
    renderAdmin(); // Montaje inicial de inputs
    renderCamareros(); // Estado visual inicial
    
    // Nex-OS: Suscripción a Firebase (Reactividad Pura)
    const asignacionesRef = ref(db, 'asignaciones');
    onValue(asignacionesRef, (snapshot) => {
        currentAsignaciones = snapshot.val() || {};
        updateAdminInputs();
        renderCamareros();
        updateModalIfOpen();
    });
});

function saveAsignacion(id, name) {
    // Si name viene vacío, Firebase elimina el nodo automáticamente o lo deja nulo (que es lo que queremos)
    set(ref(db, 'asignaciones/' + id), name);
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
    container.innerHTML = zonasData.map(z => `
        <div class="admin-row">
            <label>${z.id} - ${z.nombre} (${z.ubicacion})</label>
            <input type="text" placeholder="Nombre del camarero/a" data-id="${z.id}" value="${currentAsignaciones[z.id] || ''}">
        </div>
    `).join('');

    // Nex-OS: Implementamos 'Debounce' de 600ms para evitar saturar el servidor Firebase con llamadas por cada pulsación.
    let debounceTimeout = null;
    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                saveAsignacion(e.target.getAttribute('data-id'), e.target.value.trim());
            }, 600);
        });
    });

    document.getElementById('btn-clear-assignments').addEventListener('click', () => {
        if(confirm('🚨 ¿ALERTA: Seguro que quieres borrar TODAS las asignaciones del turno? (Se borrará instantáneamente en los móviles de TODOS los camareros)')) {
            remove(ref(db, 'asignaciones'));
            // No hacemos render manual. La suscripción de Firebase lo borrará del DOM.
        }
    });
}

// Actualiza los inputs si un tercer admin hace cambios remotamente, sin robarte el foco
function updateAdminInputs() {
    const container = document.getElementById('grid-zonas-admin');
    if (!container) return;
    container.querySelectorAll('input').forEach(input => {
        // Solo actualizamos si el input NO tiene el cursor actualmente
        if (document.activeElement !== input) {
            input.value = currentAsignaciones[input.getAttribute('data-id')] || '';
        }
    });
}

function renderCamareros() {
    const container = document.getElementById('grid-zonas-camarero');
    container.innerHTML = zonasData.map(z => {
        const asignado = currentAsignaciones[z.id];
        return `
            <div class="zona-card ${asignado ? 'has-asignado' : ''}" data-id="${z.id}">
                <div class="zona-id">${z.id}</div>
                <div class="zona-nombre">${z.nombre}</div>
                ${asignado ? `<div class="zona-asignado">👤 ${asignado}</div>` : `<div class="zona-asignado" style="background:transparent;color:var(--text-muted);border:1px solid var(--border-color);">Sin asignar</div>`}
            </div>
        `;
    }).join('');

    container.querySelectorAll('.zona-card').forEach(card => {
        card.addEventListener('click', () => showZonaModal(card.getAttribute('data-id')));
    });
}

function showZonaModal(id) {
    const modal = document.getElementById('modal-zona');
    modal.setAttribute('data-active-zona', id); // Tracker para Reactividad
    
    const zona = zonasData.find(z => z.id === id);
    const asignado = currentAsignaciones[id] || 'Sin asignar';
    
    const mapHtml = document.getElementById('plano-svg').outerHTML;
    
    const html = `
        <div class="modal-body-zona">
            <h2>${zona.id} - ${zona.nombre}</h2>
            <p style="color:var(--text-muted); margin-bottom:10px; font-size:0.95rem; font-weight:500;">📍 ${zona.ubicacion}</p>
            <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>👤 Camarero/a:</strong> <span style="color:var(--primary-hover); font-weight:800;">${asignado}</span></p>
            
            <div class="modal-map-container">
                ${mapHtml}
            </div>
            
            <div class="section-title">🎯 Misión Principal</div>
            <p style="font-size: 1rem;">${zona.mision_principal}</p>
            
            <div class="section-title">📋 Tareas y Equipamiento</div>
            <div>${zona.tareas_secundarias.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div style="margin-top:8px;">${zona.equipamiento.map(e => `<span class="tag" style="background:#FFF7ED; color:#EA580C; border-color:#FDBA74;">⚙️ ${e}</span>`).join('')}</div>
            
            <div class="section-title">🔄 Flujos de Trabajo</div>
            <p style="font-size: 0.95rem;"><strong>Pide a:</strong> ${zona.flujos.pide_a.join(', ')}</p>
            <p style="font-size: 0.95rem;"><strong>Da soporte a:</strong> ${zona.flujos.da_soporte_a.join(', ')}</p>
            
            ${zona.notas_especiales ? `<div class="section-title" style="color:var(--danger)">⚠️ Notas Críticas</div><p style="font-size: 0.95rem;">${zona.notas_especiales}</p>` : ''}
        </div>
    `;
    
    document.getElementById('modal-body-zona').innerHTML = html;
    
    const modalMap = document.querySelector('#modal-body-zona .plano-svg');
    modalMap.removeAttribute('id');
    const activeGroup = modalMap.querySelector('#map-' + id);
    if(activeGroup) {
        activeGroup.classList.add('active');
    }
    
    if (!modal.open) {
        modal.showModal();
    }
}

function updateModalIfOpen() {
    const modal = document.getElementById('modal-zona');
    if (modal.open) {
        const activeId = modal.getAttribute('data-active-zona');
        if (activeId) showZonaModal(activeId);
    }
}

function initModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('dialog').close());
    });
}
