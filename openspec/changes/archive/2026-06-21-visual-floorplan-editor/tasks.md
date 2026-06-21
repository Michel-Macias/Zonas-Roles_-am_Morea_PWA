# Tasks: 05-visual-floorplan-editor

## 🛠️ 1. Modificaciones de HTML y UI General
- [ ] Añadir el botón de pestaña `🗺️ Plano` en el menú superior en `index.html`
- [ ] Crear la estructura de la pestaña `#view-plano` en `index.html` con controles de administrador (botón de editar, botón de guardar layout, selector de modo) y el contenedor del lienzo `#floorplan-canvas-container`
- [ ] Añadir clases CSS en `css/style.css` para el lienzo del plano, los bloques de zonas dinámicas, tiradores de redimensión, y el modo diseño

## 📐 2. Lógica del Canvas Interactivo
- [ ] Crear un archivo `src/admin/floorplan-editor.ts` para gestionar el modo edición: arrastre, tiradores de redimensión y cálculo de porcentajes
- [ ] En `src/ui.ts`, importar y enlazar las interacciones de la pestaña "Plano"
- [ ] Cargar el plano estático original (`#plano-svg`) como fallback si no existe `currentFloorplanUrl`

## 📡 3. Persistencia y Reactividad
- [ ] En `src/services/zones.ts`, agregar soporte para actualizar la posición de una zona (`updateZonePosition`) o guardar la colección de zonas de manera masiva
- [ ] Conectar la pestaña para que sea reactiva a cambios remotos de posición (se actualiza el renderizado del plano dinámico si las coordenadas en RTDB cambian)
- [ ] Habilitar que los camareros abran el modal de detalles de zona pulsando sobre las zonas del plano dinámico en modo de solo lectura

## 🔍 4. Verificación
- [ ] Validar propuesta con `validate`
- [ ] Verificar compilación exitosa con `npm run build`
