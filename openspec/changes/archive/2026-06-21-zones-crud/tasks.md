# Tasks: 04-zones-crud

## Pre-requisitos
- [ ] Validar estricta `04-zones-crud` (`openspec validate 04-zones-crud --strict`)

## Implementación
- [ ] Crear `src/services/zones.ts` con helpers CRUD contra Firebase
- [ ] Interfaz tipada `Zone` con campos: id, nombre, ubicacion, mision, tareasSecundarias, equipamientos, flujos, updatedAt
- [ ] Añadir `src/admin/zones.ts` con listado y botones Editar/Eliminar
- [ ] Añadir `src/admin/zone-form.ts` unificado (create/edit)
- [ ] Conectar submit a servicio CRUD y ruta `/restaurants/{restaurantId}/zones/{zoneId}`
- [ ] Implementar validaciones y feedback de error en formulario
- [ ] Asegurar reactividad: UI camareros refleja cambios sin recarga
- [ ] Integrar panel admin en layout existente desde `src/ui.ts`

## Verificación
- [ ] Probar CRUD completo: crear → editar → eliminar → crear
- [ ] Comprobar ruta exacta escrita en Firebase por zona
- [ ] Revisar que panel de camareros se actualice tras cada operación
- [ ] Validar feedback de error con campos requeridos vacíos
- [ ] Correr build: `npm run build` sin errores TypeScript

## Documentación
- [ ] Incluir nota de commit: "Fase 2.2: CRUD de zonas (admin)"
