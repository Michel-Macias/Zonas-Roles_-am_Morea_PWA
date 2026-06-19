# auth Specification

## Purpose
TBD - created by archiving change 01-foundation-multi-tenant. Update Purpose after archive.
## Requirements
### Requirement: Registro de Cuenta con Restaurante Automático
El sistema SHALL crear automáticamente un ID de restaurante único y asignarlo al usuario administrador durante su proceso de registro.
Priority: High
Rationale: Permitir que cada administrador tenga su propio entorno SaaS de forma aislada.

#### Scenario: Registro exitoso de administrador crea restaurante
- **GIVEN** un usuario en el formulario de registro con datos válidos
- **WHEN** el usuario hace clic en "Registrarse"
- **THEN** el sistema SHALL crear el usuario en Firebase Auth
- **AND** el sistema SHALL crear una entrada en `/restaurants/{restaurantId}` con el usuario registrado como miembro `admin`
- **AND** el sistema SHALL enviar un correo de verificación y desloguear al usuario indicándole que verifique su bandeja de entrada.

### Requirement: Verificación Obligatoria de Email para Login
El sistema MUST requerir que el correo electrónico del usuario esté verificado para otorgar acceso a la aplicación.
Priority: High
Rationale: Prevenir el spam de cuentas y asegurar la propiedad del correo.

#### Scenario: Intento de inicio de sesión con email no verificado
- **GIVEN** un usuario registrado cuyo correo no ha sido verificado
- **WHEN** intenta iniciar sesión con credenciales correctas
- **THEN** el sistema SHALL denegar el acceso
- **AND** el sistema SHALL mostrar un mensaje de aviso: "Debes verificar tu correo antes de iniciar sesión. Revisa tu correo de confirmación."

#### Scenario: Inicio de sesión con email verificado
- **GIVEN** un usuario registrado con correo ya verificado
- **WHEN** inicia sesión con credenciales correctas
- **THEN** el sistema SHALL permitir el acceso a la aplicación
- **AND** el sistema SHALL cargar los datos de asignaciones asociados al restaurante de ese usuario.

### Requirement: Aislamiento Multi-tenant en Realtime Database
El sistema SHALL leer y escribir todos los datos de asignaciones en la ruta `/restaurants/{restaurantId}/assignments` asociada al restaurante del usuario activo en lugar de la ruta raíz `/asignaciones`.
Priority: High
Rationale: Cumplir con la privacidad de los datos entre diferentes locales.

#### Scenario: Carga de asignaciones de un restaurante específico
- **GIVEN** un usuario de restaurante con ID "rest-123" autenticado
- **WHEN** se inicializa el panel de asignaciones
- **THEN** el sistema SHALL escuchar los cambios en tiempo real en la ruta Firebase `/restaurants/rest-123/assignments`
- **AND** el sistema SHALL actualizar la interfaz reflejando únicamente esas asignaciones.

#### Scenario: Cambio de asignación de zona en entorno aislado
- **GIVEN** un administrador de restaurante con ID "rest-123" autenticado
- **WHEN** asigna un camarero a la zona "Z1"
- **THEN** el sistema SHALL escribir el cambio en `/restaurants/rest-123/assignments/Z1`
- **AND** el cambio no SHALL afectar ni ser visible para usuarios de otros restaurantes.

