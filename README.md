# 🍽️ PuestoYa — Demo (No Funcional)

> **Aviso:** Esta es una versión **demo ilustrativa**. No es ejecutable sin despliegue propio, credenciales Firebase privadas y configuración de backend. El código fuente se publica con fines de evaluación y portafolio.

[![Demo](https://img.shields.io/badge/ver-demo_online-00C851?style=for-the-badge)](https://michel-macias.github.io/Zonas-Roles_-am_Morea_PWA/)
[![License](https://img.shields.io/badge/licencia-comercial_no_permitida-red.svg)](LICENSE)

PuestoYa es una PWA multi-tenant de **gestión de zonas y turnos para hostelería**.

> ✅ **Demo pública:** [https://michel-macias.github.io/Zonas-Roles_-am_Morea_PWA/](https://michel-macias.github.io/Zonas-Roles_-am_Morea_PWA/)

---

## 🏗️ Arquitectura

- **Frontend:** TypeScript + Vite
- **Backend:** Firebase Realtime DB, Auth y Storage
- **Arquitectura:** Multi-tenant bajo `/restaurants/{restaurantId}/`
- **Metodología:** OpenSpec SDD (especificaciones inmutables archivadas en `openspec/`)

---

## 🚀 Características

| Módulo | Estado |
|--------|--------|
| CRUD de Zonas | Implementado |
| Editor Visual de Plano | Implementado |
| Persistencia "Mi Zona" | Implementado |
| CRUD de Turnos y Asignaciones | Especificado |
| Checklists por Zona | Roadmap |

---

## 📦 Estructura del Proyecto

```
├── openspec/              # Especificaciones OpenSpec SDD
├── src/
│   ├── services/         # Lógica de negocio
│   ├── admin/            # Paneles administrativos
│   ├── ui.ts             # Componentes UI
│   └── data/             # Datos estáticos
├── css/style.css
├── index.html
├── manifest.json
└── sw.js                 # Service Worker (PWA)
```

---

## 🔒 Licencia

- **Código disponible para evaluación.** Úsalo para aprender y adaptar.
- **Uso comercial prohibido sin licencia expresa.**
- Ver [`LICENSE`](LICENSE) y [`COMMERCIAL-LICENSE.md`](COMMERCIAL-LICENSE.md).

---

## 📬 Contacto

- GitHub: [@Michel-Macias](https://github.com/Michel-Macias)

---

*Desarrollado con OpenSpec SDD en Antigravity IDE.*
