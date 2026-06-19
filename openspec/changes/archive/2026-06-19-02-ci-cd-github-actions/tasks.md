# Tasks: 02-ci-cd-github-actions

## Checklist de Tareas

### 🔧 1. Configuración del Base Path de Vite
- [x] Modificar `vite.config.ts` para establecer `base: '/Zonas-Roles_-am_Morea_PWA/'`.
- [x] Ejecutar localmente `npm run build` and verificar que las rutas en `dist/index.html` apunten correctamente al path base.

### 🌐 2. Creación del Workflow de GitHub Actions
- [x] Crear el directorio `.github/workflows/` si no existe.
- [x] Crear el archivo `.github/workflows/ci-cd.yml` con la configuración completa del pipeline de Integración y Entrega Continua (CI/CD).

### 🔍 3. Validación y Pruebas
- [x] Correr typecheck localmente con `npx tsc --noEmit` para asegurar que no hay fallos.
- [x] Compilar la build final localmente con `npm run build` y previsualizar con `npm run preview` para garantizar que la app arranca correctamente con la configuración de base path.
