import { ref, onValue, set, remove } from 'firebase/database';
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

export function initZones(onUpdate: () => void) {
    const asignacionesRef = ref(db, 'asignaciones');
    onValue(asignacionesRef, (snapshot) => {
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
    set(ref(db, 'asignaciones/' + id), name);
}

export function clearAssignments() {
    remove(ref(db, 'asignaciones'));
}
