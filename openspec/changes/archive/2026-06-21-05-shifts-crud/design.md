# Design: 05-shifts-crud

## Estructura objetivo
- `src/services/shifts.ts`: helpers CRUD de turnos + lectura de asignaciones por turno.
- `src/admin/shifts.ts`: listado/admin de turnos + selector de Turno Activo.
- `src/admin/shift-form.ts`: formulario crear/editar turno.
- `src/ui.ts`: inyectar selector de turno activo en UI camareros y admin; filtrar asignaciones según turno.

## Datos
- Turno: `{ nombre, horaInicio, horaFin, updatedAt }`
- Asignación: `{ [zoneId]: { ...datosAsignacion } }` bajo `shifts/{shiftId}/assignments/{zoneId}`.

## Reactividad
- Reutilizar listeners sobre `/restaurants/{restaurantId}/shifts`.
- `renderAll()` debe recalcular asignaciones visibles cuando cambie turno activo.

## Validaciones
- Horas en formato HH:MM.
- `nombre` requerido.
