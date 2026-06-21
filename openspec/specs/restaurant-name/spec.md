# restaurant-name Specification

## Purpose
TBD - created by archiving change 02-restaurant-name-config. Update Purpose after archive.
## Requirements
### Requirement: Edición del Nombre del Restaurante
El sistema SHALL permitir al administrador actualizar el nombre de su restaurante desde la cabecera del panel de control.
Priority: Medium
Rationale: Necesidad de branding propio y personalización básica del perfil.

#### Scenario: Administrador actualiza el nombre correctamente
- **GIVEN** el administrador está autenticado y visualiza la cabecera con el badge `#restaurant-name-badge`
- **WHEN** pulsa el botón de configuración, edita el nombre y confirma "Guardar"
- **THEN** el sistema SHALL escribir el nuevo nombre en `/restaurants/{restaurantId}/config/name` y actualizar el badge inmediatamente

#### Scenario: Campo vacío no se guarda
- **GIVEN** el modal está abierto con el campo de nombre vacío
- **WHEN** el usuario pulsa "Guardar"
- **THEN** el sistema SHOULD mantener el nombre anterior y mostrar feedback de error en el formulario

#### Scenario: Error de escritura en Firebase
- **GIVEN** el usuario envía un nombre válido
- **WHEN** Firebase devuelve un error de permisos o red
- **THEN** el sistema SHOULD mostrar un mensaje de error sin cambiar la UI ni el estado local

