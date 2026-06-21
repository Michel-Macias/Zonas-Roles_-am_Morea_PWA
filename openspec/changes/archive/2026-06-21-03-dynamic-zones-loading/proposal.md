# Proposal: 03-dynamic-zones-loading

## Why
Actualmente, las zonas (ID, nombre, misión, tareas, equipamiento y flujos de trabajo) están hardcodeadas en el archivo local estático [src/data/zones.json](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/data/zones.json). La aplicación las lee localmente y solo sincroniza el nombre del camarero asignado desde Firebase.

Para poder implementar el Editor CRUD de zonas (Fase 2.2) y que los administradores editen libremente el plano de su restaurante, las zonas deben residir en la base de datos de Firebase Realtime. Tanto la vista de camarero como la de administrador deben cargarlas dinámicamente de forma remota, rompiendo la dependencia del archivo estático JSON.

## What Changes
1. **Migración Inicial de Zonas (Registro):** Modificar el flujo de registro en [src/auth.ts](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/auth.ts) para que, al crearse un restaurante, se inyecte la configuración de zonas por defecto (las 7 zonas iniciales del JSON) en la base de datos bajo `/restaurants/{restaurantId}/zones`.
2. **Carga Reactiva de Zonas:** Modificar [src/zones.ts](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/zones.ts) para suscribirse a la ruta `/restaurants/{restaurantId}/zones` en tiempo real y actualizar la interfaz cuando haya cambios en las propiedades de las zonas.
3. **UI Dinámica:** Adaptar [src/ui.ts](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/ui.ts) para que renderice tanto la cuadrícula de camareros como el panel de asignaciones del admin basándose en los datos remotos de Firebase en lugar del JSON estático local.

### Alcance
* ✅ **Incluido:**
  * Inyección del JSON por defecto en Firebase al crear un restaurante.
  * Carga asíncrona y reactiva de zonas en la base de datos remota.
  * Refactorización de la UI para esperar a que las zonas se carguen antes de pintar los planos y listas.
* ❌ **Excluido:**
  * Formulario de edición visual (Fase 2.2).
  * Plano SVG dinámico (Fase 2.4 - se mantiene el SVG hardcoded en esta fase intermedia).

### Criterios de Éxito
* [ ] Al registrar un nuevo administrador, se inyectan las 7 zonas en `/restaurants/{restaurantId}/zones`.
* [ ] Al abrir la aplicación (como admin o camarero), la app lee las zonas desde Firebase. Si la ruta está vacía, realiza un fallback seguro al JSON estático local.
* [ ] Si cambias el nombre de una zona directamente en la consola de Firebase, la interfaz (títulos, nombres) se actualiza de inmediato en la app sin necesidad de refrescar la página.
* [ ] El proyecto compila con `npm run build` sin errores TypeScript.
