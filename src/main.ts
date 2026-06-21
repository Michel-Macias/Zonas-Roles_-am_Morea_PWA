import { initAuth } from './auth';
import { initTabs, initModals, initRestaurantNameConfig, initFloorplanUpload, renderAdmin, renderCamareros, renderAll, initFloorplanTab, initShiftsUI } from './ui';
import { initZones, setRestaurantId } from './zones';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Extraer parámetro de restaurante de la URL (?r=xxxx) si existe
    const params = new URLSearchParams(window.location.search);
    const rParam = params.get('r');
    if (rParam) {
        setRestaurantId(rParam.trim());
    }

    // 2. Inicializar UI pura
    initTabs();
    initModals();
    initRestaurantNameConfig();
    initFloorplanUpload();
    initFloorplanTab();
    initShiftsUI();
    
    // 3. Inicializar estado inicial vacío
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
