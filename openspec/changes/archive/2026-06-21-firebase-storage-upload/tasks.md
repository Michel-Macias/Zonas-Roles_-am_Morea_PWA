# Tasks: 04-firebase-storage-upload

## Checklist de Tareas

### 🔧 1. Inicialización de Firebase Storage
- [ ] Modificar `src/firebase.ts` para importar `getStorage` de `firebase/storage` e inicializar la instancia `storage`.
- [ ] Exportar `storage` de forma correcta para su consumo en la UI.

### 🎛️ 2. Maquetación e Interfaz (HTML/CSS)
- [ ] Añadir la estructura de zona drag-and-drop, barra de progreso y miniatura de previsualización en la sección del administrador en `index.html`.
- [ ] Agregar las clases CSS necesarias en `css/style.css` para estilizar la dropzone y la barra de progreso.

### 🔑 3. Implementación de la Lógica de Subida
- [ ] En `src/ui.ts`, capturar eventos de selección de archivo e implementar validaciones (formato JPG/PNG, tamaño < 5MB).
- [ ] Conectar el drag-and-drop para que soporte arrastre de imágenes.
- [ ] Implementar la función de subida en `src/ui.ts` usando `uploadBytesResumable` para actualizar el porcentaje visual de la barra de progreso en tiempo real.
- [ ] Obtener la URL de descarga y persistirla en la base de datos bajo `/restaurants/{restaurantId}/config/floorplanUrl`.
- [ ] Sincronizar el arranque para que, si el restaurante ya tiene un plano configurado en Firebase RTDB, se dibuje la vista previa en el panel de control.

### 🔍 4. Compilación y Verificación
- [ ] Correr `npm run build` localmente para verificar que no hay fallos de compilación ni errores TypeScript.
