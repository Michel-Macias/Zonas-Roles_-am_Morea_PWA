# zones-loading Specification

## Purpose
TBD - created by archiving change 03-dynamic-zones-loading. Update Purpose after archive.
## Requirements
### Requirement: Inicialización de Zonas en Registro
El sistema SHALL inyectar la configuración de zonas por defecto del local en la base de datos de Firebase Realtime durante el registro de un nuevo restaurante.
Priority: High
Rationale: Garantizar que todos los nuevos restaurantes cuenten con el plano base inicial de 7 zonas listo para usar.

#### Scenario: Nuevo restaurante inicializa zonas por defecto
- **GIVEN** un usuario registrándose en el sistema
- **WHEN** se crea con éxito el ID del restaurante `/restaurants/{restaurantId}`
- **THEN** el sistema SHALL cargar los datos de `zones.json`
- **AND** el sistema SHALL guardarlos bajo `/restaurants/{restaurantId}/zones` en la base de datos.

### Requirement: Carga Reactiva de Zonas desde Firebase
El sistema SHALL suscribirse y leer la configuración de zonas desde la base de datos remota del restaurante para pintar la interfaz en vivo.
Priority: High
Rationale: Permitir que los cambios en el plano y los nombres de las zonas se reflejen en tiempo real en todos los dispositivos.

#### Scenario: Carga de zonas desde base de datos remota
- **GIVEN** un restaurante inicializado con zonas en Firebase
- **WHEN** un camarero o administrador accede a la aplicación
- **THEN** el sistema SHALL escuchar los cambios en `/restaurants/{restaurantId}/zones`
- **AND** el sistema SHALL actualizar la lista de tarjetas y el modal de información de cada zona dinámicamente cuando cambien sus propiedades.

### Requirement: Fallback Seguro al JSON Local
El sistema SHALL utilizar el archivo JSON local de zonas como respaldo (fallback) en caso de que la base de datos remota no contenga información de zonas o falle la conexión inicial.
Priority: Medium
Rationale: Prevenir pantallas en blanco y asegurar que la aplicación siempre cargue una interfaz válida en condiciones de fallo de red.

#### Scenario: Base de datos vacía carga zonas locales
- **GIVEN** un restaurante sin datos de zonas en la ruta remota
- **WHEN** la aplicación intenta inicializar las zonas
- **THEN** el sistema SHALL cargar la configuración por defecto de `zones.json` en memoria
- **AND** el sistema SHALL renderizar la UI con la configuración estática local.

