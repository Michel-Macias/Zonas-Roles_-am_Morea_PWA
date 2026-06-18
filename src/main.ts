import { initAuth } from './auth';
import { initTabs, initModals, renderAdmin, renderCamareros, renderAll } from './ui';
import { initZones } from './zones';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar UI pura
    initTabs();
    initModals();
    
    // Inicializar estado inicial vacío
    renderAdmin();
    renderCamareros();

    // Inicializar Auth
    initAuth();
    
    // Inicializar conexión Firebase y reactividad (SOT)
    initZones(() => {
        // Callback que se ejecuta cada vez que Firebase manda datos nuevos
        renderAll();
    });
});
