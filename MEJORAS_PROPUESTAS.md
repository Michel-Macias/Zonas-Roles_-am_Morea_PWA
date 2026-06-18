# 🚀 Plan de Evolución — PuestoYa PWA → SaaS Multi-Restaurante

**Fecha:** 2026-06-18  
**Repositorio:** `/home/m1txel/Escritorio/Zonas-Roles-Review`  
**Rama activa:** `fix/local-firebase-credentials`  
**Stack actual:** HTML/CSS/JS vanilla + Firebase Realtime DB + Firebase Auth + Service Worker (PWA)  
**Último commit:** `5839612` — chore: ignore local firebase backup file  
**Autor del plan:** Antigravity (tras auditoría completa del código fuente)

---

## 🎯 Visión del Producto

Transformar PuestoYa de un MVP single-tenant (7 zonas hardcoded para un restaurante concreto) en una **plataforma SaaS** donde cualquier dueño/encargado de restaurante pueda:

1. **📸 Crear su plano digital** subiendo una foto del local (borrador a papel) y que la app genere el plano interactivo.
2. **🗺️ Definir y editar zonas** libremente (nombre, ubicación, maquinaria, equipamiento, flujos).
3. **👥 Configurar roles y funciones** personalizadas por zona (misión, tareas secundarias, soporte).
4. **✅ Crear checklists** por zona y turno que los camareros deben completar.
5. **📋 Gestionar turnos y asignaciones** en tiempo real como ya hace el MVP actual.

---

## 📊 Estado Real del Código (Auditoría 2026-06-18)

Antes de planificar, esto es lo que hay hoy y lo que funciona:

| Componente | Estado | Notas |
|------------|--------|-------|
| **Firebase Auth** | ✅ Funcional | Usa `signInWithEmailAndPassword` real (no hash casero). Dominio ficticio `@nam-zonas.local`. |
| **Realtime DB** | ✅ Funcional | Sync bidireccional admin↔camarero. Proyecto Firebase: `nam-zonas`. |
| **Service Worker** | ✅ Funcional | Estrategia Stale-While-Revalidate (ya optimizada). Excluye endpoints Firebase dinámicos. |
| **Reglas Firebase** | ⚠️ Parcial | Lectura pública en `asignaciones` (solo nombres de pila). Escritura protegida con `auth != null`. |
| **Zonas** | ❌ Hardcoded | 7 zonas fijas en `app.js:23-31` (~80 líneas). Cambiar = modificar código. |
| **Plano SVG** | ❌ Hardcoded | SVG inline en `index.html:35-92` (~57 líneas). Layout fijo para un local concreto. |
| **Roles/funciones** | ❌ Hardcoded | Integrados en `zonasData[]`. No editables por el usuario. |
| **Turnos** | ❌ No existe | Una única asignación global sin concepto de turno mañana/tarde/noche. |
| **Checklists** | ❌ No existe | No hay modelo de datos ni UI para tareas por zona/turno. |
| **Accesibilidad** | ⚠️ Problema | `user-scalable=no` bloquea zoom (incumple RD 1112/2018). Sin ARIA labels. |
| **Multi-tenant** | ❌ No existe | Estructura plana en Firebase (`/asignaciones/Z1`). Sin concepto de restaurante. |

---

## 🏗️ Arquitectura Objetivo (SaaS)

### Modelo de Datos Firebase (multi-tenant)

```
/restaurants/{restaurantId}/
  ├── config/           → nombre, logo, plan (Free/Pro)
  ├── floorplan/        → SVG generado, imagen original
  ├── zones/            → zonas editables por el dueño
  │   └── {zoneId}/
  │       ├── name, location, equipment[], tasks[], flows{}
  │       └── checklist_template[]   → tareas por defecto de la zona
  ├── shifts/           → turnos definidos (mañana, tarde, noche, custom)
  │   └── {shiftId}/
  │       ├── name, startTime, endTime
  │       └── assignments/          → asignaciones camarero↔zona
  │           └── {zoneId}: "nombre"
  ├── checklists/       → instancias de checklists completados
  │   └── {date}/{shiftId}/{zoneId}/
  │       └── {taskId}: { done: bool, doneBy: "", doneAt: timestamp }
  └── members/          → usuarios con acceso a este restaurante
      └── {uid}: { role: "admin"|"waiter", displayName: "" }
```

### Stack Técnico Propuesto

| Capa | Actual | Objetivo | Por qué |
|------|--------|----------|---------|
| **Lenguaje** | JS vanilla | TypeScript | Multi-tenant + zonas dinámicas + checklists = tipos complejos. TS previene bugs en compile-time. |
| **Bundler** | Ninguno (ES modules via CDN) | Vite | Hot reload, tree-shaking, optimización de assets. Necesario para code-splitting admin/waiter. |
| **Framework** | Ninguno | Vanilla TS + Web Components (o Lit) | La app es suficientemente simple para no necesitar React/Vue. Lit (~5KB) da reactividad sin peso. |
| **Estado** | Variable global `currentAsignaciones` | Store reactivo simple (propio o Lit signals) | Con zonas dinámicas + turnos + checklists, un objeto global ya no escala. |
| **CSS** | Vanilla CSS (239 líneas) | Vanilla CSS + design tokens | Mantener. El CSS actual es limpio y suficiente. Solo añadir tokens para temas. |
| **Backend** | Firebase Realtime DB | Firebase Realtime DB + Cloud Functions (Blaze) | Functions necesarias para: procesar foto→plano (llamada a API visión), validaciones server-side, invitaciones por email. |
| **Auth** | Firebase Auth (email ficticio) | Firebase Auth (email real + Google Sign-In) | Multi-tenant necesita cuentas reales con verificación. |
| **Storage** | No existe | Firebase Storage | Para las fotos de planos que suban los usuarios. |
| **Tests** | No existen | Vitest (unit) + Playwright (E2E críticos) | Con multi-tenant, un bug puede afectar a todos los restaurantes. Tests del happy path son obligatorios. |
| **CI/CD** | Push to main = prod | GitHub Actions | Lint → Typecheck → Test → Build → Deploy preview → Deploy prod. |

---

## 📋 Fases de Implementación

### Fase 0 — Correcciones Inmediatas (30 min)
> Cosas que se arreglan hoy antes de empezar la migración.

| # | Tarea | Esfuerzo | Impacto |
|---|-------|----------|---------|
| 0.1 | Quitar `maximum-scale=1.0, user-scalable=no` de `index.html:5` | 2 min | Accesibilidad legal (permite zoom) |
| 0.2 | Firebase App Check (reCAPTCHA v3) | 20 min | Protege cuota Firebase de bots |
| 0.3 | Indicador de conexión 🟢/🔴 con `firebase.database().ref('.info/connected')` | 15 min | Transparencia para el camarero |

---

### Fase 1 — Fundación Técnica (1-2 semanas)
> Migrar la base de código para soportar la nueva arquitectura sin romper nada.

| # | Tarea | Esfuerzo | Detalle |
|---|-------|----------|---------|
| 1.1 | Inicializar Vite + TypeScript | 2h | `npm create vite@latest ./ -- --template vanilla-ts`. Migrar `app.js` → `app.ts`. |
| 1.2 | Externalizar `zonasData` a `data/zones.json` | 1h | Primer paso para zonas editables. La app carga el JSON en vez de tenerlo hardcoded. |
| 1.3 | Separar código por responsabilidad | 3h | `src/auth.ts`, `src/zones.ts`, `src/ui.ts`, `src/firebase.ts`. No es "capas enterprise", es simplemente no tener 296 líneas en un archivo. |
| 1.4 | Migrar Firebase Auth a cuentas reales | 2h | Email real + `sendEmailVerification()` + `sendPasswordResetEmail()`. Eliminar el dominio ficticio. |
| 1.5 | Diseñar y aplicar modelo multi-tenant en Firebase | 3h | Estructura `/restaurants/{id}/...`. Migrar datos actuales como primer restaurante de demo. |
| 1.6 | CI/CD básico con GitHub Actions | 2h | Lint → Typecheck → Build → Deploy a GitHub Pages (preview en PR, prod en merge a main). |

---

### Fase 2 — Zonas y Plano Dinámico (2-3 semanas)
> El usuario puede crear su propio restaurante y definir zonas.

| # | Tarea | Esfuerzo | Detalle |
|---|-------|----------|---------|
| 2.1 | **Onboarding: crear restaurante** | 4h | Formulario: nombre del local, número de zonas aproximado. Crea entrada en Firebase + asigna al usuario como admin. |
| 2.2 | **Editor de zonas (CRUD)** | 6h | UI para crear/editar/eliminar zonas: nombre, ubicación, equipamiento (tags), misión, tareas secundarias, flujos (pide_a, da_soporte_a). |
| 2.3 | **📸 Upload de foto → plano digital** | 8-12h | El usuario sube foto del borrador a papel. Se guarda en Firebase Storage. Una Cloud Function llama a una API de visión (Gemini Vision / OpenAI Vision) para detectar las zonas dibujadas y generar un SVG aproximado. El usuario puede luego ajustar posiciones en el editor. |
| 2.4 | **Editor visual de plano (drag & drop)** | 8h | Canvas/SVG interactivo donde el usuario arrastra y redimensiona las zonas generadas. Snap-to-grid. Guardar layout en Firebase. |
| 2.5 | **Vista camarero dinámica** | 3h | Refactorizar `renderCamareros()` y `showZonaModal()` para trabajar con zonas dinámicas cargadas de Firebase en lugar del array hardcoded. |

---

### Fase 3 — Turnos y Asignaciones (1-2 semanas)
> El encargado puede gestionar turnos y asignar por turno.

| # | Tarea | Esfuerzo | Detalle |
|---|-------|----------|---------|
| 3.1 | **CRUD de turnos** | 3h | Crear turnos personalizados: nombre ("Mañana", "Tarde", "Noche", "Evento Viernes"), hora inicio/fin. Persistir en Firebase. |
| 3.2 | **Selector de turno activo** | 2h | Dropdown/tabs en la vista admin para elegir turno. Las asignaciones se guardan bajo `/shifts/{shiftId}/assignments/`. |
| 3.3 | **Vista camarero por turno** | 2h | El camarero ve automáticamente el turno activo según la hora actual, o puede seleccionar manualmente. |
| 3.4 | **Plantillas de turno** | 3h | Guardar una configuración de asignaciones como plantilla ("Turno tipo viernes") y aplicarla en 1 click. |
| 3.5 | **Persistir "mi zona" en localStorage** | 30 min | El camarero abre la app → ve directamente su zona destacada sin buscar. |

---

### Fase 4 — Checklists (1-2 semanas)
> Tareas que cada camarero debe completar por zona y turno.

| # | Tarea | Esfuerzo | Detalle |
|---|-------|----------|---------|
| 4.1 | **Editor de plantillas de checklist** | 4h | El admin define tareas por zona: "Reponer pulmón", "Limpiar plancha", "Revisar cámara fría". Cada tarea tiene: texto, categoría (apertura/cierre/limpieza), zona(s) aplicable(s). |
| 4.2 | **Vista checklist del camarero** | 4h | Al abrir su zona, el camarero ve la lista de tareas pendientes del turno actual. Puede marcar ✅ cada una. Se persiste en Firebase con `doneBy` + `doneAt` (server timestamp). |
| 4.3 | **Dashboard de completación (admin)** | 3h | El encargado ve en tiempo real qué zonas tienen checklists incompletos. Badge visual: 🟢 todo hecho, 🟡 parcial, 🔴 sin empezar. |
| 4.4 | **Historial de checklists (30 días)** | 3h | Tabla con filtros por fecha/zona/turno. Exportable a CSV para control de calidad / auditoría interna. |

---

### Fase 5 — Pulido y Escalabilidad (2-3 semanas)
> Preparar el producto para producción real multi-cliente.

| # | Tarea | Esfuerzo | Detalle |
|---|-------|----------|---------|
| 5.1 | **Invitaciones por email** | 3h | El admin del restaurante invita camareros por email. Cloud Function envía link. El camarero crea cuenta y queda vinculado al restaurante. |
| 5.2 | **Roles granulares** | 2h | Admin (todo), Encargado (asignar + checklists), Camarero (solo lectura + completar checklists). |
| 5.3 | **Tema oscuro** | 2h | `prefers-color-scheme: dark` + toggle manual. Variables CSS ya están preparadas para esto. |
| 5.4 | **Offline queue de escrituras** | 4h | IndexedDB para guardar cambios del encargado sin cobertura (bodega/terraza). Replay automático al recuperar conexión. |
| 5.5 | **Error tracking (Sentry)** | 1h | DSN gratuito + source maps. Visibilidad real de fallos en móviles de camareros. |
| 5.6 | **Tests E2E críticos (Playwright)** | 4h | 3-5 tests del happy path: crear restaurante → añadir zonas → crear turno → asignar → camarero ve cambio → completar checklist. |
| 5.7 | **RGPD / LOPD** | 2h | Aviso de privacidad, consentimiento explícito, opción de borrado de datos personales. Nombres de camareros = PII. |

---

## ⏱️ Resumen de Tiempos

| Fase | Duración estimada | Entregable |
|------|-------------------|------------|
| **Fase 0** | 30 min | App actual con accesibilidad y App Check |
| **Fase 1** | 1-2 semanas | Código migrado a TS+Vite, multi-tenant, CI/CD, auth real |
| **Fase 2** | 2-3 semanas | Zonas editables, plano desde foto, editor visual |
| **Fase 3** | 1-2 semanas | Turnos, asignaciones por turno, plantillas |
| **Fase 4** | 1-2 semanas | Checklists editables, vista camarero, dashboard admin |
| **Fase 5** | 2-3 semanas | Invitaciones, roles, offline, tests, RGPD, pulido |
| **Total** | **7-12 semanas** | SaaS multi-restaurante funcional |

---

## ⚠️ Decisiones Pendientes (Requieren input de Michel)

1. **¿API de visión para foto→plano?** Opciones: Gemini Vision (gratis con API key), OpenAI Vision (de pago, más preciso para planos), o procesamiento manual (el usuario coloca zonas a mano sin IA). ¿Cuál prefieres?
2. **¿Plan de precios?** Free (1 restaurante, 5 zonas, 1 turno) / Pro (ilimitado, checklists, historial, plantillas). ¿O empezamos sin limitaciones?
3. **¿Firebase Blaze (pago)?** Cloud Functions y Storage requieren plan Blaze (pay-as-you-go). Para volúmenes bajos el coste es ~0€, pero requiere tarjeta vinculada. ¿OK?
4. **¿Dominio propio?** ¿Mantener GitHub Pages o migrar a Vercel/Firebase Hosting con dominio `puestoya.app` o similar?
5. **¿Lit / Web Components vs vanilla TS?** Lit añade ~5KB pero da reactividad declarativa. Vanilla TS es más ligero pero requiere más código manual para actualizaciones del DOM. ¿Preferencia?

---

**Este documento se actualizará conforme avancemos en cada fase.**  
*Plan generado por Antigravity tras auditoría completa del código y requisitos de producto.*