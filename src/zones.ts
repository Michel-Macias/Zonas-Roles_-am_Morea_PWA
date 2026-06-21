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
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export let currentZones: Zona[] = [];
export const getZonesData = (): Zona[] => {
    return currentZones.length > 0 ? currentZones : (zonasData as Zona[]);
};

export let currentAsignaciones: Record<string, string> = {};
export let activeRestaurantId: string = localStorage.getItem('active_restaurant_id') || 'demo-restaurant';
export let currentFloorplanUrl: string | null = null;

export let activeShiftId: string | null = null;

let unsubscribeAssignments: (() => void) | null = null;
let unsubscribeZones: (() => void) | null = null;
let unsubscribeFloorplan: (() => void) | null = null;
let unsubscribeActiveShift: (() => void) | null = null;
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
    if (unsubscribeZones) {
        unsubscribeZones();
    }
    if (unsubscribeFloorplan) {
        unsubscribeFloorplan();
    }
    if (unsubscribeActiveShift) {
        unsubscribeActiveShift();
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

    const zonesRef = ref(db, `restaurants/${activeRestaurantId}/zones`);
    unsubscribeZones = onValue(zonesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            currentZones = Object.values(data).sort((a: any, b: any) => {
                return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
            }) as Zona[];
        } else {
            currentZones = zonasData as Zona[];
        }
        onUpdate();
    });

    const activeShiftRef = ref(db, `restaurants/${activeRestaurantId}/config/activeShiftId`);
    unsubscribeActiveShift = onValue(activeShiftRef, (snapshot) => {
        const newShiftId = snapshot.val() || null;
        activeShiftId = newShiftId;

        if (unsubscribeAssignments) {
            unsubscribeAssignments();
        }

        const assignmentsPath = newShiftId 
            ? `restaurants/${activeRestaurantId}/shifts/${newShiftId}/assignments`
            : `restaurants/${activeRestaurantId}/assignments`;

        const asignacionesRef = ref(db, assignmentsPath);
        unsubscribeAssignments = onValue(asignacionesRef, (snap) => {
            currentAsignaciones = snap.val() || {};
            onUpdate();
        });
    });

    // Suscribirse a los turnos de manera reactiva para poblar los selectores
    import('./services/shifts').then(({ subscribeShifts }) => {
        subscribeShifts();
    });

    const floorplanRef = ref(db, `restaurants/${activeRestaurantId}/config/floorplanUrl`);
    unsubscribeFloorplan = onValue(floorplanRef, (snapshot) => {
        currentFloorplanUrl = snapshot.val() || null;
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
    const path = activeShiftId 
        ? `restaurants/${activeRestaurantId}/shifts/${activeShiftId}/assignments/` + id
        : `restaurants/${activeRestaurantId}/assignments/` + id;
    set(ref(db, path), name);
}

export function clearAssignments() {
    const path = activeShiftId
        ? `restaurants/${activeRestaurantId}/shifts/${activeShiftId}/assignments`
        : `restaurants/${activeRestaurantId}/assignments`;
    remove(ref(db, path));
}
