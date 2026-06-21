import { ref, set, remove, get, push } from 'firebase/database';
import { db } from '../firebase';
import { activeRestaurantId } from '../zones';

export interface Shift {
  id?: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  updatedAt: number;
}

export function validateShiftTimes(horaInicio: string, horaFin: string): { horaInicio?: string; horaFin?: string } {
  const errors: { horaInicio?: string; horaFin?: string } = {};
  const hhmmRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!hhmmRegex.test(horaInicio)) errors.horaInicio = 'Formato inválido. Usa HH:MM';
  if (!hhmmRegex.test(horaFin)) errors.horaFin = 'Formato inválido. Usa HH:MM';
  if (horaInicio === horaFin && !errors.horaInicio && !errors.horaFin) errors.horaFin = 'horaFin debe ser distinta a horaInicio';
  return errors;
}

export async function createShift(shift: Omit<Shift, 'id'>): Promise<string> {
  const shiftsRef = ref(db, `restaurants/${activeRestaurantId}/shifts`);
  const newRef = push(shiftsRef);
  const id = newRef.key as string;
  await set(newRef, { ...shift, id });
  return id;
}

export async function updateShift(shiftId: string, patch: Partial<Shift>) {
  const shiftRef = ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}`);
  const fbPatch: any = {};
  if (patch.nombre !== undefined) fbPatch.nombre = patch.nombre;
  if (patch.horaInicio !== undefined) fbPatch.horaInicio = patch.horaInicio;
  if (patch.horaFin !== undefined) fbPatch.horaFin = patch.horaFin;
  if (patch.updatedAt !== undefined) fbPatch.updatedAt = patch.updatedAt;
  await set(shiftRef, fbPatch);
}

export async function deleteShift(shiftId: string) {
  await remove(ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}`));
}

export async function getShiftsData(): Promise<Shift[]> {
  const snap = await get(ref(db, `restaurants/${activeRestaurantId}/shifts`));
  if (!snap.exists()) return [];
  const data = snap.val() as Record<string, Shift>;
  return Object.values(data).sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export async function getShift(shiftId: string): Promise<Shift | null> {
  const snap = await get(ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}`));
  if (!snap.exists()) return null;
  return snap.val() as Shift;
}

export async function saveShiftAssignment(shiftId: string, zoneId: string, nombre: string) {
  await set(ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}/assignments/${zoneId}`), nombre);
}

export async function clearShiftAssignments(shiftId: string) {
  await remove(ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}/assignments`));
}

export async function getShiftAssignments(shiftId: string): Promise<Record<string, string>> {
  const snap = await get(ref(db, `restaurants/${activeRestaurantId}/shifts/${shiftId}/assignments`));
  return (snap.val() || {}) as Record<string, string>;
}

let initialized = false;

export function initShiftForm() {
  if (initialized) return;
  initialized = true;
}

export function renderShiftsList() {
  const container = document.getElementById('shifts-list-container');
  if (!container) return;
  container.innerHTML = '<p class="text-muted">Cargando turnos...</p>';
  getShiftsData().then((shifts) => {
    if (shifts.length === 0) {
      container.innerHTML = '<p class="text-muted">Sin turnos creados.</p>';
      return;
    }
    container.innerHTML = shifts
      .map(
        (s) => `
      <div class="shift-row">
        <span>${escapeHTML(s.nombre)} · ${escapeHTML(s.horaInicio)}–${escapeHTML(s.horaFin)}</span>
        <button class="btn btn-sm btn-secondary" data-action="edit-shift" data-id="${s.id}">Editar</button>
        <button class="btn btn-sm btn-danger" data-action="delete-shift" data-id="${s.id}">Eliminar</button>
      </div>
    `,
      )
      .join('');
  });

  container.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const action = target.getAttribute('data-action');
    const id = target.getAttribute('data-id');
    if (!action || !id) return;

    if (action === 'delete-shift') {
      if (!confirm('¿Borrar turno y sus asignaciones?')) return;
      await deleteShift(id);
      await renderShiftsList();
    }
  });
}

function escapeHTML(str: string) {
  return String(str).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));
}
