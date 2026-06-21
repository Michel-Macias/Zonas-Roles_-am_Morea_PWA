import { Zone } from '../services/zones';
import { createZone, updateZone } from '../services/zones';

let editingId: string | null = null;
let initialized = false;

export function openZoneForm(zone?: Zone) {
    const modal = document.getElementById('modal-zone-form') as HTMLDialogElement;
    const nomeEl = document.getElementById('zone-nombre') as HTMLInputElement;
    const ubicEl = document.getElementById('zone-ubicacion') as HTMLInputElement;
    const misionEl = document.getElementById('zone-mision') as HTMLInputElement;
    const tareasEl = document.getElementById('zone-tareas') as HTMLTextAreaElement;
    const equiposEl = document.getElementById('zone-equipos') as HTMLTextAreaElement;
    const pideAEl = document.getElementById('zone-pide-a') as HTMLTextAreaElement;
    const daSoporteEl = document.getElementById('zone-da-soporte') as HTMLTextAreaElement;

    if (!modal || !nomeEl || !ubicEl || !misionEl || !tareasEl || !equiposEl || !pideAEl || !daSoporteEl) return;

    hideAllErrors();

    if (zone) {
        editingId = zone.id || null;
        nomeEl.value = zone.nombre;
        ubicEl.value = zone.ubicacion;
        misionEl.value = zone.mision;
        tareasEl.value = zone.tareasSecundarias.join('\n');
        equiposEl.value = zone.equipamientos.join('\n');
        pideAEl.value = zone.flujos.pide_a.join('\n');
        daSoporteEl.value = zone.flujos.da_soporte_a.join('\n');
    } else {
        editingId = null;
        const form = document.getElementById('form-zone') as HTMLFormElement;
        if (form) form.reset();
    }

    if (!modal.open) modal.showModal();
}

export function initZoneForm() {
    if (initialized) return;
    initialized = true;

    const btnAdd = document.getElementById('btn-add-zone');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            editingId = null;
            const form = document.getElementById('form-zone') as HTMLFormElement;
            if (form) form.reset();
            hideAllErrors();
            const modal = document.getElementById('modal-zone-form') as HTMLDialogElement;
            if (modal) modal.showModal();
        });
    }

    const form = document.getElementById('form-zone');
    if (!form) return;

    // Clone to ensure clean state before attaching listener
    const clonedForm = form.cloneNode(true) as HTMLFormElement;
    form.parentNode?.replaceChild(clonedForm, form);

    clonedForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAllErrors();

        const nomeEl = document.getElementById('zone-nombre') as HTMLInputElement;
        const ubicEl = document.getElementById('zone-ubicacion') as HTMLInputElement;
        const misionEl = document.getElementById('zone-mision') as HTMLInputElement;
        const tareasEl = document.getElementById('zone-tareas') as HTMLTextAreaElement;
        const equiposEl = document.getElementById('zone-equipos') as HTMLTextAreaElement;
        const pideAEl = document.getElementById('zone-pide-a') as HTMLTextAreaElement;
        const daSoporteEl = document.getElementById('zone-da-soporte') as HTMLTextAreaElement;

        if (!nomeEl || !ubicEl || !misionEl || !tareasEl || !equiposEl || !pideAEl || !daSoporteEl) return;

        const nombre = nomeEl.value.trim();
        const ubicacion = ubicEl.value.trim();
        const mision = misionEl.value.trim();
        const tareasSecundarias = tareasEl.value.split('\n').map(s => s.trim()).filter(Boolean);
        const equipamientos = equiposEl.value.split('\n').map(s => s.trim()).filter(Boolean);
        const pideA = pideAEl.value.split('\n').map(s => s.trim()).filter(Boolean);
        const daSoporteA = daSoporteEl.value.split('\n').map(s => s.trim()).filter(Boolean);

        let hasError = false;
        if (!nombre) {
            showFieldError('zone-nombre', 'El nombre es obligatorio');
            hasError = true;
        }
        if (!ubicacion) {
            showFieldError('zone-ubicacion', 'La ubicación es obligatoria');
            hasError = true;
        }
        if (!mision) {
            showFieldError('zone-mision', 'La misión es obligatoria');
            hasError = true;
        }
        if (hasError) return;

        const zone: Zone = {
            id: editingId || undefined,
            nombre,
            ubicacion,
            mision,
            tareasSecundarias,
            equipamientos,
            flujos: { pide_a: pideA, da_soporte_a: daSoporteA },
            updatedAt: Date.now(),
        };

        try {
            if (editingId) {
                await updateZone(editingId, zone);
            } else {
                await createZone(zone);
            }
            const modal = document.getElementById('modal-zone-form') as HTMLDialogElement;
            if (modal) modal.close();
        } catch (err) {
            console.error('Error guardando zona:', err);
            const el = document.getElementById('zone-form-error');
            if (el) {
                el.textContent = 'Error al guardar. Revisa tu conexión e inténtalo de nuevo.';
                el.style.display = 'block';
            }
        }
    });
}

function showFieldError(fieldId: string, msg: string) {
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
}

function hideAllErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
        (el as HTMLElement).style.display = 'none';
    });
}
