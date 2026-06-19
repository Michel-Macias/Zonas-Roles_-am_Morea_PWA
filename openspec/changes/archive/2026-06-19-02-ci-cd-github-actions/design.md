# Design: 02-ci-cd-github-actions

## 1. Pipeline de CI/CD (GitHub Actions)

Crearemos el archivo `.github/workflows/ci-cd.yml` para automatizar la integración y despliegue del proyecto. Utilizaremos las acciones oficiales recomendadas por GitHub para compilar y desplegar a GitHub Pages sin necesidad de una rama intermedia `gh-pages` (mediante artefactos directos).

### Estructura de Permisos de GitHub Actions:
Para poder desplegar a GitHub Pages, el flujo necesita permisos específicos de escritura para `pages` e `id-token`.

### Estructura del Workflow (`ci-cd.yml`):
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# Permisos requeridos para desplegar a GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Permite cancelar ejecuciones en progreso para la misma rama/PR
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-size: 20
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Typecheck (TypeScript)
        run: npx tsc --noEmit

      - name: Compilar para producción
        run: npm run build

      # Guardar artefacto de compilación si es push a main para el deploy
      - name: Subir artefacto para Pages
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Desplegar a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 2. Configuración de Vite (`vite.config.ts`)

Para que los assets (JS, CSS, imágenes, manifest) carguen correctamente en GitHub Pages (cuya URL del repositorio es `https://Michel-Macias.github.io/Zonas-Roles_-am_Morea_PWA/`), debemos establecer la propiedad `base` en la configuración de Vite.

Modificación en `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Zonas-Roles_-am_Morea_PWA/', // Ruta base para el repositorio de GitHub Pages
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});
```

Esta configuración asegura que las rutas generadas en la build apunten a `/Zonas-Roles_-am_Morea_PWA/assets/...` en lugar de la raíz absoluta `/assets/...`.
