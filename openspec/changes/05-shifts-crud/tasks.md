# Tasks: 05-shifts-crud

## Pre-requisitos
- [ ] Validar `05-shifts-crud` con `npx -y @fission-ai/openspec validate 05-shifts-crud --strict`

## Implementación
- [ ] Crear `src/services/shifts.ts` con tipos `Shift` y helpers CRUD + helpers de asignaciones
- [ ] Añadir `src/admin/shifts.ts`: listado de turnos, botones editar/eliminar, selector Turno Activo
- [ ] Añadir `src/admin/shift-form.ts`: formulario unificado create/edit con validación HH:MM
- [ ] Implementar escritura/ruta exacta: `/restaurants/{restaurantId}/shifts/{shiftId}` y `/restaurants/{restaurantId}/shifts/{shiftId}/assignments/{zoneId}`
- [ ] Integrar selector Turno Activo en `src/ui.ts` para admin y camareros
- [ ] Filtrar UI de camareros por turno activo y exponer selector de cambio de turno
- [ ] Asegurar feedback visual de error y reactividad sin recarga

## Verificación
- [ ] Probar CRUD de turnos y cambio de Turno Activo
- [ ] Probar persistencia de asignaciones por zona
- [ ] Comprobar reactividad en admin y camareros
- [ ] `npm run build` sin errores TypeScript

## Documentación
- [ ] Nota de commit: "Fase 3.1: CRUD de turnos y asignaciones"
