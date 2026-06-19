import { ref, onValue, set, remove, get } from 'firebase/database';
import { db } from './firebase';
import zonasData from './data/zones.json';

// Tipo base
export interface Zona {
  id: string;
  nombre: string;
  ubicacion: string;
  mision_principal: string;
  tareas_secundarias: string[];
  equipamiento: string[];
  notas_especiales?: string;
  flujos: {
    pide_a: string[];
    da_soporte_a: string[];
  };
}

export const getZonesData = (): Zona[] => zonasData as Zona[];

export let currentAsignaciones: Record<string, string> = {};
export let activeRestaurantId: string = localStorage.getItem('active_restaurant_id') || 'demo-restaurant';

let unsubscribeAssignments: (() => void) | null = null;
let lastOnUpdate: (() => void) | null = null;

export function setRestaurantId(id: string) {
    activeRestaurantId = id;
    localStorage.setItem('active_restaurant_id', id);
    if (lastOnUpdate) {
        initZones(lastOnUpdate);
    }
}

export function initZones(onUpdate: () => void) {
    lastOnUpdate = onUpdate;
    if (unsubscribeAssignments) {
        unsubscribeAssignments();
    }

    // Leer nombre del restaurante para actualizar la insignia en el header
    get(ref(db, `restaurants/${activeRestaurantId}/config/name`)).then((snap) => {
        const restName = snap.val() || activeRestaurantId;
        const badge = document.getElementById('restaurant-name-badge');
        if (badge) {
            badge.textContent = restName;
        }
    }).catch(err => {
        console.error("Error al obtener nombre de restaurante", err);
        const badge = document.getElementById('restaurant-name-badge');
        if (badge) {
            badge.textContent = activeRestaurantId;
        }
    });

    const asignacionesRef = ref(db, `restaurants/${activeRestaurantId}/assignments`);
    unsubscribeAssignments = onValue(asignacionesRef, (snapshot) => {
        currentAsignaciones = snapshot.val() || {};
        onUpdate();
    });

    // Indicador de conexión 🟢/🔴
    const connectedRef = ref(db, '.info/connected');
    onValue(connectedRef, (snap) => {
        const statusEl = document.getElementById('connection-status');
        if (!statusEl) return;
        const isOnline = snap.val() === true;
        statusEl.classList.toggle('online', isOnline);
        statusEl.classList.toggle('offline', !isOnline);
        const textEl = statusEl.querySelector('.status-text');
        if (textEl) {
            textEl.textContent = isOnline ? 'Online' : 'Offline';
        }
    });
}

export function saveAsignacion(id: string, name: string) {
    set(ref(db, `restaurants/${activeRestaurantId}/assignments/` + id), name);
}

export function clearAssignments() {
    remove(ref(db, `restaurants/${activeRestaurantId}/assignments`));
}
