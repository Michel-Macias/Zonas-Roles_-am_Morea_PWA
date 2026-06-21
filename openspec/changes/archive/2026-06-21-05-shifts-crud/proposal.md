# Proposal: 05-shifts-crud

## Contexto
El sistema ya soporta CRUD de zonas y carga reactiva, pero la gestión de turnos sigue dispersa o ligada a la lógica de camareros sin estructura propia en Firebase. Hace falta un modelo de turno con asignaciones por zona.

## Problema
Sin turnos normalizados en RTDB, no se puede asignar personal por franja horaria ni ofrecer un "Turno Activo" consistente entre admin y camareros.

## Objetivo
Implementar CRUD de turnos con asignaciones por zona y selector de turno activo, sincronizado contra `/restaurants/{restaurantId}/shifts/{shiftId}`.

## Alcance
- ✅ CRUD de turnos (nombre, horaInicio HH:MM, horaFin HH:MM, updatedAt).
- ✅ Asignaciones: `/restaurants/{restaurantId}/shifts/{shiftId}/assignments/{zoneId}`.
- ✅ Selector de Turno Activo en admin y camareros.
- ✅ Replace por endpoint/shape reactivo, sin recarga.
- ❌ No incluye calendario ni historial de cambios.

## Criterios de Éxito
- [ ] CRUD de turnos funcionando desde admin.
- [ ] Asignaciones guardadas bajo estructura indicada.
- [ ] Selector de turno activo reflejado en camareros/admin.
- [ ] `npm run build` pasa sin errores.
