# 🍔 Ñam Zonas PWA - Gestión de Roles y Turnos

![Version](https://img.shields.io/badge/version-1.0.0-E65100.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-FFB300.svg)

**🚀 Acceso a la App:** [**Abre la PWA aquí (Enlace Oficial)**](https://Michel-Macias.github.io/Zonas-Roles_-am_Morea_PWA/)

Plataforma Web Progresiva (PWA) diseñada con estrategia **Mobile First** para la gestión y asignación de zonas de trabajo en el restaurante **Ñam Morea**. 

## 🎯 Objetivo del Proyecto

En el trepidante entorno de la hostelería, la coordinación es clave. Esta aplicación digitaliza el plano del local y asigna de manera visual y estructurada las responsabilidades de cada camarero según la zona de la barra o comedor en la que se encuentre.

Permite consultar en tiempo real:
- **El flujo de dependencias:** Qué material pedir a qué compañero.
- **Las zonas de apoyo:** A qué áreas se debe brindar soporte en momentos de *rush*.
- **Misión y Equipamiento:** Responsabilidad principal y herramientas disponibles en cada cuadrante.

## ✨ Características Principales

*   **⚡ Arquitectura Vanilla JS:** Sin dependencias externas, construida en HTML/CSS/JS nativo para garantizar rendimiento instantáneo en dispositivos móviles de cualquier gama.
*   **📱 PWA y Modo Offline:** Integración de Service Workers y `manifest.json`. La aplicación es instalable y funciona sin conexión a internet.
*   **🎨 Diseño Corporativo "Dark UI":** Estética moderna en tonos oscuros para reducir la fatiga visual, acentuada con la paleta de colores corporativa de Ñam Restaurantes (Naranja `#E65100` y Ámbar `#FFB300`).
*   **👥 Panel Dual (Admin / Camareros):**
    *   **Vista Admin:** Permite asignar los nombres del personal a sus respectivas zonas del día.
    *   **Vista Camarero:** Cuadrícula de fácil lectura donde el trabajador selecciona su zona asignada y despliega su manual de operaciones.
*   **📋 Normas Comunes Globales:** Acceso a 1-clic a las normativas de limpieza (Regla del Paño Verde), priorización al cliente y gestión de la vajilla.

## 🚀 Despliegue Rápido (GitHub Pages)

Para que el personal pueda usar la app en su móvil, solo hay que habilitar GitHub Pages:
1. Ve a la pestaña **Settings** del repositorio.
2. En la barra lateral izquierda haz clic en **Pages**.
3. En la sección *Build and deployment*, bajo "Source", selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y guarda.
5. ¡Listo! En un par de minutos tendrás el enlace público. Desde ese enlace, cualquier camarero puede usar la opción "Añadir a la pantalla de inicio" de su móvil para instalar la App.

## 🛠️ Estructura Técnica

```text
📁 Zonas-Roles_Nam_Morea_PWA
├── 📄 index.html      # Estructura principal y Modales de UI
├── 📄 manifest.json   # Configuración de instalación PWA
├── 📄 sw.js           # Service Worker para caché offline
├── 📁 css
│   └── 📄 style.css   # Sistema de diseño basado en Variables CSS
└── 📁 js
    └── 📄 app.js      # Lógica de renderizado JSON y LocalStorage
```

---
*Diseñado e implementado con arquitectura agentica por **Nex-OS (Shadow Agent)** bajo la dirección de **Michel**.*
