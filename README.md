# 🍽️ PuestoYa PWA - Gestión SaaS de Roles y Turnos

![Version](https://img.shields.io/badge/version-2.0.0-E65100.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-FFB300.svg)
![SDD](https://img.shields.io/badge/Methodology-OpenSpec%20%2F%20SDD-8B5CF6.svg)

Plataforma Web Progresiva (PWA) de gestión y asignación de puestos de trabajo para hostelería en tiempo real, migrada a arquitectura **SaaS multi-restaurante**.

---

## 🚀 Características del Proyecto

*   **⚡ Arquitectura Moderna:** Construida en Vanilla TypeScript modularizada y compilada con **Vite**.
*   **🏢 Multi-tenant (SaaS):** Datos de asignaciones y miembros aislados en Firebase Realtime Database bajo la ruta `/restaurants/{restaurantId}/`.
*   **🔑 Registro Seguro:** Autenticación gestionada con **Firebase Auth** real, incorporando un flujo obligatorio de verificación de email.
*   **📱 Acceso Simple para Camareros:** Los camareros acceden a su panel de forma inmediata mediante un enlace con parámetro query: `?r={restaurantId}` (sin necesidad de loguearse).
*   **🟢/🔴 Sincronización en Directo:** Conexión en tiempo real con indicador de estado (Online/Offline) e IndexedDB en Service Worker para soporte offline.

---

## 🛠️ Stack Tecnológico

*   **Lenguaje:** TypeScript (Vanilla TS)
*   **Bundler:** Vite
*   **Backend & DB:** Firebase Realtime Database & Firebase Auth
*   **Estilos:** Vanilla CSS (variables de entorno CSS, design tokens)
*   **Gestión de Cambios:** OpenSpec (Spec-Driven Development)

---

## 💻 Desarrollo Local

### 1. Requisitos
Tener instalado Node.js (v18 o superior) y npm.

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (ignorado en git) y añade tus credenciales de Firebase:
```env
VITE_FIREBASE_API_KEY="TU_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
VITE_FIREBASE_DATABASE_URL="TU_DATABASE_URL"
VITE_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="TU_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="TU_APP_ID"
```

### 3. Instalar y Levantar
```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo local (Vite)
npm run dev

# Compilar para producción
npm run build
```

---

## 📐 Ciclo de Desarrollo (OpenSpec / SDD)

Este proyecto utiliza el framework **OpenSpec** para asegurar que cada desarrollo esté guiado por especificaciones estrictas e inalterables antes de tocar código:

1. **Constitución:** Definida en [openspec/project.md](file:///home/m1txel/Escritorio/Zonas-Roles-Review/openspec/project.md) (restricciones de stack y estilo).
2. **Propuesta:** Crear un cambio en `openspec/changes/{nombre-cambio}/` que contenga:
    *   `proposal.md` (El qué y el porqué)
    *   `specs/spec.md` (Comportamiento con escenarios Gherkin)
    *   `design.md` (Estrategia técnica)
    *   `tasks.md` (Lista de tareas atómicas de 1-2h)
3. **Ejecución:** La IA o el desarrollador implementan siguiendo estrictamente `tasks.md`.
4. **Archivo:** Al finalizar, el comando `openspec archive` fusiona las delta specs con la documentación viva de [openspec/specs/](file:///home/m1txel/Escritorio/Zonas-Roles-Review/openspec/specs/) y mueve el cambio a histórico.

---
*Mantenido y desarrollado mediante el framework SDD en Antigravity IDE.*
