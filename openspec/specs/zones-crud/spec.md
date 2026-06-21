# zones-crud Specification

## Purpose
TBD - created by archiving change zones-crud. Update Purpose after archive.
## Requirements
### Requirement: CRUD de Zonas en Panel Admin
El sistema SHALL permitir crear, editar y eliminar zonas desde el panel de administración, con persistencia en Firebase Realtime DB en `/restaurants/{restaurantId}/zones/{zoneId}`.
Priority: High
Rationale: Operativa diaria sin deploy ni edición manual en base de datos.

#### Scenario: Crear zona desde admin
- **GIVEN** el administrador abre el panel de zonas
- **WHEN** rellena nombre, ubicación, misión, tareas, equipamientos y flujos y pulsa "Guardar"
- **THEN** el sistema SHALL crear la zona en `/restaurants/{restaurantId}/zones/{zoneId}` con ID autogenerado y reflejarla en la UI sin recarga

#### Scenario: Editar zona existente
- **GIVEN** existe una zona con datos previos
- **WHEN** el administrador modifica cualquier campo confirma "Guardar"
- **THEN** el sistema SHALL sobrescribir únicamente los campos enviados en `/restaurants/{restaurantId}/zones/{zoneId}` y la UI reactiva debe mostrar los cambios inmediatamente

#### Scenario: Eliminar zona
- **GIVEN** el administrador selecciona "Eliminar" en una zona
- **WHEN** confirma la acción
- **THEN** el sistema SHALL borrar el nodo `/restaurants/{restaurantId}/zones/{zoneId}` y la UI de camareros debe desaparecer la zona sin recarga

#### Scenario: Validación de formulario
- **GIVEN** el formulario está abierto
- **WHEN** el usuario envía campos requeridos vacíos
- **THEN** el sistema SHOULD bloquear el guardado y mostrar feedback de error por campo

