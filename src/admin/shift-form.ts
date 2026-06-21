import { validateShiftTimes } from './shifts';
import { createShift, updateShift } from '../services/shifts';

let editingId: string | null = null;
let initialized = false;

export function initShiftForm() {
  if (initialized) return;
  initialized = true;

  const btnAdd = document.getElementById('btn-add-shift');
  if (!btnAdd) return;

  btnAdd.addEventListener('click', () => {
    editingId = null;
    const form = document.getElementById('form-shift') as HTMLFormElement | null;
    if (form) form.reset();
    hideAllErrors();
    const modal = document.getElementById('modal-shift-form') as HTMLDialogElement | null;
    if (modal) modal.showModal();
  });

  const form = document.getElementById('form-shift');
  if (!form) return;

  const clonedForm = form.cloneNode(true) as HTMLFormElement;
  form.parentNode?.replaceChild(clonedForm, form);

  clonedForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAllErrors();

    const nombreEl = document.getElementById('shift-nombre') as HTMLInputElement | null;
    const inicioEl = document.getElementById('shift-hora-inicio') as HTMLInputElement | null;
    const finEl = document.getElementById('shift-hora-fin') as HTMLInputElement | null;
    if (!nombreEl || !inicioEl || !finEl) return;

    const nombre = nombreEl.value.trim();
    const horaInicio = inicioEl.value.trim();
    const horaFin = finEl.value.trim();

    let hasError = false;

    if (!nombre) {
      showFieldError('shift-nombre', 'El nombre es obligatorio');
      hasError = true;
    }

    const timeErrors = validateShiftTimes(horaInicio, horaFin);
    if (timeErrors.horaInicio) {
      showFieldError('shift-hora-inicio', timeErrors.horaInicio);
      hasError = true;
    }
    if (timeErrors.horaFin) {
      showFieldError('shift-hora-fin', timeErrors.horaFin);
      hasError = true;
    }

    if (hasError) return;

    const shift = {
      nombre,
      horaInicio,
      horaFin,
      updatedAt: Date.now(),
    };

    try {
      if (editingId) {
        await updateShift(editingId, shift);
      } else {
        await createShift(shift);
      }
      const modal = document.getElementById('modal-shift-form') as HTMLDialogElement | null;
      if (modal) modal.close();
    } catch (err) {
      console.error('Error guardando turno:', err);
      const el = document.getElementById('shift-form-error');
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
  document.querySelectorAll('[id$="-error"]').forEach((el) => {
    if (el instanceof HTMLElement) el.style.display = 'none';
  });
}
