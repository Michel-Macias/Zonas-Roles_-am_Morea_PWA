# Proposal: 04-zones-crud

## Contexto
La PWA gestiona zonas de restaurante cargadas de forma reactiva desde Firebase Realtime DB, pero la administración carece de un editor CRUD que permita modificar la estructura guardada en `src/zones.ts`. Adicionalmente, el pipeline CI/CD ya valida builds automáticamente en la rama `desarrollo-con-Hermes`.

## Problema
Al no existir editor administrativo, cualquier ajuste de zonas requiere editar la base de datos directamente o realizar un nuevo ciclo de desarrollo, introduciendo retrasos y riesgo de inconsistencias. La UI reactiva actual no actualiza la definición estructural sin intervención manual.

## Objetivo
Implementar un editor CRUD de zonas en el panel de administración que permita crear, editar y eliminar zonas directamente contra Firebase Realtime DB y mantenga la UI reactiva sin recargas ni intervención externa.

## Alcance
- ✅ Interfaz de administración con acciones CRUD sobre zonas.
- ✅ Formulario con campos: `zoneId`, `nombre`, `ubicación`, `misión principal`, `tareas secundarias`, `equipamientos` y `flujos`.
- ✅ Persistencia en `/restaurants/{restaurantId}/zones/{zoneId}`.
- ✅ Reactividad automática sobre la UI de camareros y admin.
- ✅ Cumplimiento de compilación TypeScript en `npm run build`.
- ❌ No incluye módulos de moderación/aprobación de cambios ni auditoría histórica.
- ❌ No incluye migraciones masivas por lotes.
- ❌ No abarca control avanzado de permisos.

## Criterios de Éxito
- [ ] El panel admin ofrece CRUD completo de zonas.
- [ ] La ruta de persistencia coincide con la reactiva (`/restaurants/{restaurantId}/zones/{zoneId}`).
- [ ] Las operaciones se reflejan sin recarga.
- [ ] `npm run build` pasa sin errores de TypeScript.
