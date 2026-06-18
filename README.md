# 🍽️ PuestoYa PWA - Gestión de Roles y Turnos

![Version](https://img.shields.io/badge/version-1.0.0-E65100.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-FFB300.svg)

**🚀 Acceso a la App:** [**Abre la PWA aquí (Enlace Oficial)**](https://Michel-Macias.github.io/PuestoYa_PWA/)

Plataforma Web Progresiva (PWA) diseñada con estrategia **Mobile First** para la gestión y asignación de zonas de trabajo en restauración. 

## 🎯 Objetivo del Proyecto

En el trepidante entorno de la hostelería, la coordinación es clave. Esta aplicación digitaliza el plano del local y asigna de manera visual y estructurada las responsabilidades de cada camarero según la zona de la barra o comedor en la que se encuentre.

Permite consultar en tiempo real:
- **El flujo de dependencias:** Qué material pedir a qué compañero.
- **Las zonas de apoyo:** A qué áreas se debe brindar soporte en momentos de *rush*.
- **Misión y Equipamiento:** Responsabilidad principal y herramientas disponibles en cada cuadrante.

## ✨ Características Principales

*   **⚡ Arquitectura Vanilla JS + Firebase:** Construida en HTML/CSS/JS nativo. Ahora utiliza **Firebase Realtime Database** para sincronizar automáticamente el panel del administrador con todos los dispositivos móviles al instante.
*   **📱 PWA y Modo Offline:** Integración de Service Workers y `manifest.json`. La aplicación es instalable como una App nativa.
*   **🎨 Diseño "SaaS Light":** Interfaz re-diseñada bajo una filosofía de "SaaS Productivity". Interfaz luminosa y profesional para mejorar la visibilidad, legibilidad y facilidad de uso durante turnos ajetreados.
*   **👥 Panel Dual Sincronizado:**
    *   **Vista Admin (Segura):** Protegido por sistema de contraseña First-Time con cifrado (SHA-256 Web Crypto API). Los responsables (`enc_1`, `enc_2`, `gerente`) pueden asignar al personal en vivo.
    *   **Vista Camarero (Lectura):** Cuadrícula donde los camareros comprueban en tiempo real qué zona les toca, sin necesitar refrescar la página en ningún momento.
*   **📖 Manuales Contextuales:** Botones integrados que muestran manuales rápidos (Modales) para ayudar a cualquier empleado, nuevo o veterano, a entender la lógica de la App de un vistazo.

## 🚀 Despliegue Rápido (GitHub Pages)

Para que el personal pueda usar la app en su móvil, solo hay que habilitar GitHub Pages:
1. Ve a la pestaña **Settings** del repositorio.
2. En la barra lateral izquierda haz clic en **Pages**.
3. En la sección *Build and deployment*, bajo "Source", selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y guarda.
5. ¡Listo! En un par de minutos tendrás el enlace público. Desde ese enlace, cualquier camarero puede usar la opción "Añadir a la pantalla de inicio" de su móvil para instalar la App.

## 🛠️ Estructura Técnica

```text
📁 PuestoYa_PWA
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
