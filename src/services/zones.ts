import { ref, set, remove, get, push } from 'firebase/database';
import { db } from '../firebase';
import { activeRestaurantId } from '../zones';

export interface Zone {
    id?: string;
    nombre: string;
    ubicacion: string;
    mision: string;
    tareasSecundarias: string[];
    equipamientos: string[];
    flujos: {
        pide_a: string[];
        da_soporte_a: string[];
    };
    updatedAt: number;
    position?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface ZonaFirebase {
    id: string;
    nombre: string;
    ubicacion: string;
    mision_principal: string;
    tareas_secundarias: string[];
    equipamiento: string[];
    flujos: {
        pide_a: string[];
        da_soporte_a: string[];
    };
    updatedAt: number;
    position?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

function toFirebase(zone: Zone): ZonaFirebase {
    return {
        id: zone.id || '',
        nombre: zone.nombre,
        ubicacion: zone.ubicacion,
        mision_principal: zone.mision,
        tareas_secundarias: zone.tareasSecundarias,
        equipamiento: zone.equipamientos,
        flujos: zone.flujos,
        updatedAt: zone.updatedAt,
        position: zone.position,
    };
}

export function fromFirebase(raw: ZonaFirebase): Zone {
    return {
        id: raw.id,
        nombre: raw.nombre,
        ubicacion: raw.ubicacion,
        mision: raw.mision_principal,
        tareasSecundarias: raw.tareas_secundarias,
        equipamientos: raw.equipamiento,
        flujos: raw.flujos,
        updatedAt: raw.updatedAt,
        position: raw.position,
    };
}

export async function createZone(zone: Omit<Zone, 'id'>): Promise<string> {
    const zonesRef = ref(db, `restaurants/${activeRestaurantId}/zones`);
    const newRef = push(zonesRef);
    const id = newRef.key!;
    await set(newRef, toFirebase({ ...zone, id } as Zone));
    return id;
}

export async function updateZone(zoneId: string, patch: Partial<Zone>): Promise<void> {
    const zoneRef = ref(db, `restaurants/${activeRestaurantId}/zones/${zoneId}`);
    const firebasePatch: any = {};
    if (patch.nombre !== undefined) firebasePatch.nombre = patch.nombre;
    if (patch.ubicacion !== undefined) firebasePatch.ubicacion = patch.ubicacion;
    if (patch.mision !== undefined) firebasePatch.mision_principal = patch.mision;
    if (patch.tareasSecundarias !== undefined) firebasePatch.tareas_secundarias = patch.tareasSecundarias;
    if (patch.equipamientos !== undefined) firebasePatch.equipamiento = patch.equipamientos;
    if (patch.flujos !== undefined) firebasePatch.flujos = patch.flujos;
    if (patch.updatedAt !== undefined) firebasePatch.updatedAt = patch.updatedAt;
    await set(zoneRef, firebasePatch);
}

export async function deleteZone(zoneId: string): Promise<void> {
    await remove(ref(db, `restaurants/${activeRestaurantId}/zones/${zoneId}`));
}

export async function getZone(zoneId: string): Promise<Zone | null> {
    const snap = await get(ref(db, `restaurants/${activeRestaurantId}/zones/${zoneId}`));
    if (!snap.exists()) return null;
    const raw = snap.val() as ZonaFirebase;
    return fromFirebase(raw);
}
