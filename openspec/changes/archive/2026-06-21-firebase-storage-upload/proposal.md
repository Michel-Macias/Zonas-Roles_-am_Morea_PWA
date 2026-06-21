# Proposal: 04-firebase-storage-upload

## Why
En la Fase 2 (Zonas y Plano Dinámico), un requisito clave es que cada restaurante pueda personalizar su plano digital. Para ello, el administrador debe ser capaz de subir una foto del plano real o borrador físico de su local.

Actualmente, el proyecto no cuenta con el servicio de almacenamiento de archivos de Firebase (Firebase Storage) integrado en su código. Necesitamos inicializar esta capacidad en el stack técnico e implementar la interfaz de usuario que permita subir y persistir las imágenes del plano de forma segura por cada restaurante.

## What Changes
1. **Inicialización de Firebase Storage:** Integrar y exportar el servicio de almacenamiento de Firebase en [src/firebase.ts](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/firebase.ts) consumiendo la variable `storageBucket` existente.
2. **Interfaz de Subida de Imagen:** Añadir un input de archivo estilizado y drag-and-drop en la sección de configuración del panel del administrador para subir la foto del plano físico.
3. **Persistencia en Firebase Storage:** Implementar el flujo de subida de imágenes para almacenar el archivo en Firebase Storage bajo la ruta `/restaurants/{restaurantId}/floorplan.png` (o su tipo mime correspondiente).
4. **Enlace en Realtime Database:** Al completar la subida de la imagen, guardar la URL de descarga resultante en la base de datos en `/restaurants/{restaurantId}/config/floorplanUrl` para que esté disponible para ser renderizada en la UI.

### Alcance
* ✅ **Incluido:**
  * Integración de `@firebase/storage` en el empaquetado del proyecto.
  * Formulario de subida de archivos (limitado a imágenes JPG/PNG de máximo 5MB) en la UI del panel de administración.
  * Persistencia del archivo y mapeo de la URL pública en Realtime DB.
  * Feedback visual de progreso de subida (barra de carga).
* ❌ **Excluido:**
  * Procesamiento inteligente de la imagen para extraer las zonas con visión por computador (Gemini Vision) — esto se deja para la Fase 2.3 avanzada.
  * Edición y recorte de la imagen en caliente desde el navegador.

### Criterios de Éxito
* [ ] El administrador puede seleccionar o arrastrar una imagen y ver el progreso de subida en tiempo real.
* [ ] La imagen del plano se guarda en Firebase Storage con el ID del restaurante, sobrescribiendo de forma segura versiones anteriores.
* [ ] La URL pública de descarga se persiste en `/restaurants/{restaurantId}/config/floorplanUrl`.
* [ ] `npm run build` compila correctamente incluyendo las dependencias de Firebase Storage.
