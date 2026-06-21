# shifts Specification

## Purpose
TBD - created by archiving change 05-shifts-crud. Update Purpose after archive.
## Requirements
### Requirement: Definición de Turno
El sistema SHALL almacenar turnos en `/restaurants/{restaurantId}/shifts/{shiftId}` con campos `nombre`, `horaInicio`, `horaFin` y `updatedAt`.
Priority: High
Rationale: Necesidad de estructurar franjas horarias de servicio.

#### Scenario: Crear turno desde admin
- **GIVEN** el administrador abre el panel de turnos y pulsa "Nuevo turno"
- **WHEN** completa `nombre`, `horaInicio` y `horaFin` en HH:MM y confirma "Guardar"
- **THEN** el sistema MUST crear un nodo en `/restaurants/{restaurantId}/shifts/{shiftId}` con `updatedAt` automático y reflejarlo en la UI sin recarga

#### Scenario: Editar turno existente
- **GIVEN** existe un turno con datos previos
- **WHEN** el administrador modifica cualquier campo y confirma "Guardar"
- **THEN** el sistema SHALL sobrescribir únicamente los campos enviados en `/restaurants/{restaurantId}/shifts/{shiftId}` y el selector de turno activo debe actualizarse

#### Scenario: Eliminar turno
- **GIVEN** el administrador selecciona "Eliminar" en un turno
- **WHEN** confirma la acción
- **THEN** el sistema MUST borrar `/restaurants/{restaurantId}/shifts/{shiftId}` y deseleccionar turno activo si estaba seleccionado

### Requirement: Asignaciones por Turno y Zona
El sistema SHALL guardar asignaciones en `/restaurants/{restaurantId}/shifts/{shiftId}/assignments/{zoneId}`.
Priority: High
Rationale: Vincular personal por turno y zona.

#### Scenario: Guardar asignaciones desde admin
- **GIVEN** el administrador tiene un turno activo seleccionado
- **WHEN** edita asignaciones por zona y guarda
- **THEN** el sistema MUST persistir en `/restaurants/{restaurantId}/shifts/{shiftId}/assignments/{zoneId}` con la misma estructura reactiva que la UI

#### Scenario: Camarero ve asignaciones del turno activo
- **GIVEN** el camarero abre la app
- **WHEN** el turno activo está establecido
- **THEN** el sistema SHALL mostrar las asignaciones de ese turno y permitir filtrar a otro turno

#### Scenario: Validación de horarios
- **GIVEN** el formulario de turno está abierto
- **WHEN** el administrador envía `horaInicio` o `horaFin` en formato inválido o sin `nombre`
- **THEN** el sistema SHOULD bloquear el guardado y mostrar feedback de error por campo

