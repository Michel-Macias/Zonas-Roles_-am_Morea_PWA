## ADDED Requirements

### Requirement: Almacenamiento Aislado de Planos en la Nube
El sistema SHALL subir y guardar las imágenes del plano de forma aislada en Firebase Storage bajo la ruta `/restaurants/{restaurantId}/floorplan.png` (o extensión correspondiente).
Priority: High
Rationale: Mantener la privacidad y el aislamiento de los recursos visuales de cada restaurante en el entorno multi-tenant.

#### Scenario: Subida exitosa de plano físico
- **GIVEN** un administrador autenticado en el restaurante "rest-123"
- **WHEN** selecciona un archivo de imagen válido "plano.png" de 2MB y confirma la subida
- **THEN** el sistema SHALL enviar el archivo a Firebase Storage en la ruta `/restaurants/rest-123/floorplan.png`
- **AND** el sistema SHALL guardar la URL pública de descarga obtenida en `/restaurants/rest-123/config/floorplanUrl` en Realtime DB
- **AND** el sistema SHALL mostrar un mensaje de éxito al usuario.

### Requirement: Limitación de Tamaño y Formato de Archivo
El sistema MUST validar que el archivo seleccionado por el usuario sea una imagen y que su tamaño no supere los 5 megabytes (5MB) antes de iniciar la transferencia de datos.
Priority: Medium
Rationale: Proteger el ancho de banda y optimizar el almacenamiento de la base de datos de producción.

#### Scenario: Intento de subir un archivo demasiado pesado
- **GIVEN** el modal de subida de plano abierto
- **WHEN** el usuario selecciona un archivo "plano_pesado.png" de 8MB
- **THEN** el sistema SHALL denegar la subida
- **AND** el sistema SHALL mostrar una advertencia: "El archivo supera el tamaño máximo permitido de 5MB."

#### Scenario: Intento de subir un archivo de formato no válido
- **GIVEN** el modal de subida de plano abierto
- **WHEN** el usuario selecciona un archivo "plano.pdf"
- **THEN** el sistema SHALL denegar la subida
- **AND** el sistema SHALL mostrar una advertencia: "Formato de archivo no válido. Solo se permiten imágenes JPG y PNG."

### Requirement: Indicador de Progreso de Subida
El sistema SHALL mostrar un indicador visual dinámico en la UI (ej. barra de progreso en porcentaje) que refleje en tiempo real el porcentaje de transferencia del archivo.
Priority: Medium
Rationale: Mejorar la experiencia del usuario y proveer feedback visual claro durante operaciones asíncronas de red.

#### Scenario: Visualización del progreso durante la subida
- **GIVEN** un archivo válido de imagen en proceso de transferencia a Firebase Storage
- **WHEN** la transferencia progresa al 50%
- **THEN** el sistema SHALL actualizar el elemento visual de barra de progreso en la UI indicando "50% subido".
