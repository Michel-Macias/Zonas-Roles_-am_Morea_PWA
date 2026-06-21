import { escapeHTML } from '../utils';
import { getZonesData } from '../zones';

export function renderZonesList() {
    const container = document.getElementById('zones-admin-list');
    if (!container) return;

    const zonas = getZonesData();
    container.innerHTML = zonas.map(z => `
        <div class="admin-zone-row" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid var(--border-color);">
            <strong style="width:40px;">${escapeHTML(z.id)}</strong>
            <span style="flex:1;">${escapeHTML(z.nombre)} — ${escapeHTML(z.ubicacion)}</span>
            <button type="button" class="btn-edit-zone" data-id="${escapeHTML(z.id)}" style="padding:6px 12px; background:#EFF6FF; border:1px solid #3B82F6; border-radius:6px; color:#1D4ED8; cursor:pointer; font-weight:700; font-size:0.85rem;">Editar</button>
            <button type="button" class="btn-delete-zone" data-id="${escapeHTML(z.id)}" style="padding:6px 12px; background:#FEF2F2; border:1px solid #EF4444; border-radius:6px; color:#DC2626; cursor:pointer; font-weight:700; font-size:0.85rem;">Eliminar</button>
        </div>
    `).join('');

    container.querySelectorAll('.btn-edit-zone').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id') || '';
            try {
                const { getZone } = await import('../services/zones');
                const zone = await getZone(id);
                if (zone) {
                    const mod = await import('./zone-form');
                    mod.openZoneForm(zone);
                }
            } catch (err) {
                console.error('Error cargando zona:', err);
                alert('Error al cargar la zona. Revisa tu conexión.');
            }
        });
    });

    container.querySelectorAll('.btn-delete-zone').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id') || '';
            if (!confirm(`¿Eliminar la zona ${id}? Esta acción no se puede deshacer.`)) return;
            try {
                const { deleteZone } = await import('../services/zones');
                await deleteZone(id);
            } catch (err) {
                console.error('Error eliminando zona:', err);
                alert('Error al eliminar. Revisa tu conexión.');
            }
        });
    });
}
