# Proposal: 02-ci-cd-github-actions

## Why
El proyecto PuestoYa ha sido migrado a un stack moderno compilado con Vite y TypeScript. Debido a esto, los navegadores ya no pueden ejecutar el código fuente directamente desde el repositorio (como ocurría en el MVP de HTML/JS plano). Ahora es obligatorio compilar el proyecto (`npm run build`) y publicar el directorio `dist/` generado.

Además, al introducir el desarrollo en paralelo con múltiples agentes trabajando en diferentes ramas, es crítico contar con un sistema automatizado de integración continua (CI) que verifique que ningún commit o Pull Request rompa la compilación de TypeScript o el empaquetado.

## What Changes
1. **Pipeline de Integración Continua (CI):** Configurar una GitHub Action que se ejecute en cada commit a la rama `main` y en todas las Pull Requests, instalando dependencias, corriendo el typecheck de TypeScript (`npx tsc --noEmit`) y verificando que compila correctamente (`npm run build`).
2. **Despliegue Automatizado (CD):** Configurar el despliegue automático a **GitHub Pages** en cada merge exitoso a la rama `main`. El pipeline compilará el proyecto y publicará la carpeta `dist/` en la rama de despliegue `gh-pages` (o directamente usando las GitHub Actions oficiales de Pages).
3. **Ajuste de rutas base de Vite:** Asegurar que `vite.config.ts` esté configurado con el `base` path correcto del repositorio de GitHub del usuario (`/Zonas-Roles_-am_Morea_PWA/`) para que los assets carguen correctamente en GitHub Pages.

### Alcance
* ✅ **Incluido:**
  * Archivo `.github/workflows/ci-cd.yml` con la definición del pipeline de GitHub Actions (Build, Typecheck, y Deploy).
  * Modificación de `vite.config.ts` para soportar la ruta base del repositorio de producción en GitHub Pages sin romper el entorno de desarrollo local.
* ❌ **Excluido:**
  * Tests automáticos unitarios (Vitest) o E2E (Playwright) ya que aún no existen en el proyecto (se dejan para la Fase 5).

### Criterios de Éxito
* [ ] En cada Pull Request o push a `main`, el pipeline de GitHub Actions se ejecuta, realiza el typecheck y el build sin errores.
* [ ] Al hacer push/merge a `main`, el pipeline realiza el despliegue y publica la web actualizada en GitHub Pages.
* [ ] La aplicación se compila y carga correctamente en local con `npm run preview` usando la configuración base adaptada.
