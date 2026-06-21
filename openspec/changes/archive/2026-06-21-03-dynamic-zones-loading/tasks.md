# Tasks: 03-dynamic-zones-loading

## Checklist de Tareas

### 🔑 1. Inyección de Zonas en el Registro
- [x] Modificar `src/auth.ts` para mapear el array de `zones.json` a un objeto indexado por ID.
- [x] Guardar este objeto de zonas en `/restaurants/{restaurantId}/zones` durante el registro de un administrador.

### 🗺️ 2. Lógica Dinámica en zones.ts
- [x] Declarar la variable mutable `currentZones` en `src/zones.ts`.
- [x] Modificar `getZonesData()` para retornar `currentZones` si contiene elementos, o hacer fallback seguro al JSON estático.
- [x] Modificar `initZones(onUpdate)`:
  - Añadir variable `unsubscribeZones` para el control de la escucha.
  - Suscribir a `/restaurants/{activeRestaurantId}/zones`.
  - Convertir el snapshot a array de zonas y disparar `onUpdate()`.
  - Asegurar la cancelación de escuchas anteriores tanto de zonas como de asignaciones al re-inicializar.

### 💅 3. UI y Validación
- [x] Verificar que la UI del panel de camareros y el panel de administración se pintan correctamente con la información dinámica remota.
- [x] Comprobar que, al actualizar una propiedad de una zona en la consola de Firebase Realtime DB, la interfaz se refresca automáticamente sin recargar.

### 🔍 4. Compilación
- [x] Correr `npm run build` localmente para verificar que no hay fallos de tipos TypeScript.
