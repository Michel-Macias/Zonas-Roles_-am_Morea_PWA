import { ref, onValue, set, remove, push, get } from 'firebase/database';
import { db } from '../firebase';
import { activeRestaurantId } from '../zones';

export interface Shift {
  id?: string;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  updatedAt: number;
}

let currentShifts: Shift[] = [];
let unsubscribeShifts: (() => void) | null = null;
let lastShiftsUpdate: ((shifts: Shift[]) => void) | null = null;

export function getCurrentShifts(): Shift[] {
  return currentShifts;
}

export function onShiftsChange(next: (shifts: Shift[]) => void): (() => void) | null {
  lastShiftsUpdate = next;
  return unsubscribeShifts;
}

export function clearShiftsSubscription() {
  if (unsubscribeShifts) {
    unsubscribeShifts();
    unsubscribeShifts = null;
    lastShiftsUpdate = null;
  }
}

export function subscribeShifts() {
  if (unsubscribeShifts) {
    unsubscribeShifts();
  }
  const shiftsRef = ref(db, `restaurants/${activeRestaurantId}/shifts`);
  unsubscribeShifts = onValue(shiftsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      currentShifts = [];
    } else {
      currentShifts = Object.values(data).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre)) as Shift[];
    }
    if (lastShiftsUpdate) {
      lastShiftsUpdate(currentShifts);
    }
  });
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
