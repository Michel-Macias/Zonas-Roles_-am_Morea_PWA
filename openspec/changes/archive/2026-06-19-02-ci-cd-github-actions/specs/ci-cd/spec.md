## ADDED Requirements

### Requirement: Validación de Compilación en Pull Requests (CI)
El sistema MUST ejecutar automáticamente un flujo de trabajo de integración continua en GitHub al abrir o actualizar una Pull Request hacia la rama `main`.
Priority: High
Rationale: Prevenir regresiones y errores de compilación al integrar código de múltiples agentes en paralelo.

#### Scenario: Compilación y typecheck exitosos en PR
- **GIVEN** una Pull Request con cambios en el código TypeScript
- **WHEN** se dispara la GitHub Action
- **THEN** el sistema SHALL instalar las dependencias con `npm ci` o `npm install`
- **AND** el sistema SHALL realizar el typecheck estricto de TypeScript
- **AND** el sistema SHALL ejecutar la build de producción con éxito.

### Requirement: Despliegue Automático a GitHub Pages (CD)
El sistema SHALL compilar y desplegar de forma automatizada la versión de producción a GitHub Pages cuando se realice un push o merge directo a la rama `main`.
Priority: High
Rationale: Automatizar el ciclo de entrega de valor reduciendo la intervención manual.

#### Scenario: Merge a main despliega la app
- **GIVEN** una rama de características integrada con éxito en `main`
- **WHEN** se ejecuta el workflow de GitHub Actions en la rama `main`
- **THEN** el sistema SHALL compilar la aplicación para producción
- **AND** el sistema SHALL publicar los archivos del directorio `dist/` en GitHub Pages.

### Requirement: Configuración de Rutas de Assets en Producción
El sistema SHALL cargar correctamente todos los recursos estáticos (CSS, JS, imágenes, manifest) tanto en el entorno de desarrollo local como en el subdirectorio del repositorio de GitHub Pages.
Priority: High
Rationale: Asegurar que la app no muestre una pantalla en blanco debido a errores 404 de assets en producción.

#### Scenario: Carga de recursos en servidor local
- **GIVEN** el entorno de desarrollo iniciado localmente con Vite
- **WHEN** el navegador solicita la raíz `/`
- **THEN** el sistema SHALL servir los assets desde la raíz local.

#### Scenario: Carga de recursos en GitHub Pages
- **GIVEN** la aplicación desplegada en la URL `https://Michel-Macias.github.io/Zonas-Roles_-am_Morea_PWA/`
- **WHEN** se accede a la aplicación en producción
- **THEN** el sistema SHALL solicitar y cargar todos los assets utilizando el path base `/Zonas-Roles_-am_Morea_PWA/`.
