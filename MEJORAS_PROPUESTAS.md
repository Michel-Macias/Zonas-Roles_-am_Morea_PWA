# 📋 Propuesta de Mejoras — Ñam Zonas PWA (Zonas-Roles_-am_Morea_PWA)

**Fecha:** 2026-06-14  
**Repositorio:** `/home/m1txel/Escritorio/Zonas-Roles-Review`  
**URL producción:** https://michel-macias.github.io/Zonas-Roles_-am_Morea_PWA/  
**Stack actual:** HTML/CSS/JS vanilla + Firebase Realtime Database + Firebase Auth + Service Worker (PWA)  
**Último commit relevante:** `6c17737` — fix(seguridad): restaurar funciones `showAdminPanel` y `hideAdminPanel`

---

## 🎯 Resumen ejecutivo

La app cumple su propósito core: **sincronizar asignaciones de zonas en tiempo real entre admin y camareros** con PWA offline-capable. La arquitectura vanilla + Firebase es correcta para el alcance actual. Sin embargo, hay **deuda técnica acumulada** (auth casera, sin tests, sin CI/CD, reglas Firebase permisivas, XSS mitigation manual) y **oportunidades de alto impacto** para el sector restauración (turnos, historiales, métricas).

---

## 1. Experiencia de Usuario / Interfaz

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 1.1 | **Persistir vista activa por rol** (camarero ve solo su zona al abrir) | 🔴 **Alta** | Elimina fricción: camarero abre app → ve su zona directo, sin buscar tarjeta. Ahorra 10-15 seg/turno × N camareros × 365 días. |
| 1.2 | **Indicador visual de "turno activo" + hora** en header camarero | 🔴 **Alta** | Contexto inmediato: "Turno mañana 12:00-16:00" evita confusiones entre turnos. |
| 1.3 | **Modo "solo mi zona" (vista simplificada)** — oculta plano general y otras zonas | 🟡 **Media** | Reduce carga cognitiva en rush. Pantalla limpia = menos errores. |
| 1.4 | **Feedback háptico/vibración** al cambiar de zona (admin) | 🟡 **Media** | Confirmación táctil en móviles sin mirar pantalla. Accesibilidad. |
| 1.5 | **Tema oscuro automático** (prefers-color-scheme) + toggle manual | 🟢 **Baja** | Confort visual en comedor con luz tenue. Opcional, pero esperado en 2026. |
| 1.6 | **Accesibilidad WCAG AA**: focus visible, ARIA labels, contraste, screen readers | 🔴 **Alta** | Cumplimiento legal (RD 1112/2018 España) + inclusión real. Hoy falla en focus outlines y labels. |
| 1.7 | **Estados vacíos ilustrados** (sin asignaciones, sin conexión, error auth) | 🟡 **Media** | UX profesional: guía al usuario en lugar de mostrar grid vacío. |

---

## 2. Rendimiento y Carga

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 2.1 | **Code-splitting + lazy-load**: separar `admin.js` / `camarero.js` / `map.js` | 🔴 **Alta** | Camareros no cargan lógica admin (auth, inputs, debounce). Reduce ~40% JS inicial. |
| 2.2 | **Preload crítico**: `link rel="preload" as="script"` para `app.js` + `font-display: swap` en Google Fonts | 🟡 **Media** | Elimina flash of unstyled text (FOUT) y bloqueo de render. Mejora LCP ~200-300ms. |
| 2.3 | **Optimizar SVG plano**: mover a archivo `.svg` externo + `<use href="#Z1">` en modal | 🟡 **Media** | SVG inline de 3KB se duplica en cada modal. Cachéable, parseable una vez. |
| 2.4 | **Service Worker stale-while-revalidate + cache-first para assets estáticos** | 🟡 **Media** | Hoy: network-first con fallback. Invertir: cache-first para CSS/JS/fonts = instant load offline. |
| 2.5 | **Web Vitals monitoring** (LCP, INP, CLS) vía `web-vitals` lib → Firebase Analytics / Sentry | 🟢 **Baja** | Visibilidad real de rendimiento en dispositivos de camareros (móviles antiguos). |

---

## 3. Seguridad (Cliente + Firebase)

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 3.1 | **Reglas Firebase Realtime Database — endurecer** | 🔴 **Crítica** | Hoy: `.read: true` en `asignaciones` = **cualquiera lee todo el cuadrante** (nombres, estructura). Cambiar a: `.read: "auth != null"` + reglas por rol (camarero solo lee, admin escribe). |
| 3.2 | **Firebase App Check** (reCAPTCHA v3 / DeviceCheck) | 🔴 **Alta** | Evita abuso de cuota Firebase (lecturas/escrituras ilimitadas desde bots). Gratis en plan Spark. |
| 3.3 | **Eliminar auth "casera" (email @nam-zonas.local)** → usar **Firebase Auth con Email/Password real** + verificación email | 🔴 **Alta** | Hoy: contraseña = única barrera. Sin reset, sin rotación, sin MFA. Riesgo: credenciales compartidas, shoulder surfing. |
| 3.4 | **Content Security Policy (CSP) estricta** via `<meta http-equiv>` + headers en GitHub Pages (via `_headers` en Netlify/Cloudflare) | 🟡 **Media** | Mitiga XSS residual. Hoy: inline scripts, Google Fonts, Firebase CDN — CSP rompe si no se ajusta. |
| 3.5 | **Sanitización DOMPurify** en lugar de `escapeHTML` casera | 🟡 **Media** | `escapeHTML` cubre básico pero no atributos `onclick`, `href="javascript:"`, SVG injection. DOMPurify (2KB gzip) = estándar. |
| 3.6 | **Rate limiting escrituras** en cliente (debounce ya existe) + **Firebase Security Rules** `write` con `now < data.child('updatedAt').val() + 1000` | 🟢 **Baja** | Previene spam accidental (dedo en teclado) o malicioso. |
| 3.7 | **Auditoría de dependencias**: `npm audit` / `pnpm audit` en CI (aunque no hay package.json hoy) | 🟢 **Baja** | Firebase SDK desde CDN — sin lockfile. Migrar a `importmap` + `esm.sh` o bundler para control de versiones. |

---

## 4. Arquitectura y Mantenibilidad

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 4.1 | **Migrar a TypeScript + Vite + Vitest + Playwright** | 🔴 **Alta** | Elimina clase entera de bugs (undefined, tipos mismatches). CI con typecheck + tests = confianza al deploy. |
| 4.2 | **Arquitectura por capas**: `data/` (Firebase), `domain/` (lógica zonas), `ui/` (render), `state/` (señales/observables) | 🟡 **Media** | Hoy: todo en `app.js` (295 lin). Separación = testable, reemplazable, escalable. |
| 4.3 | **State management explícito** (Signals / Observable / Zustand) en lugar de `currentAsignaciones` global | 🟡 **Media** | Reactividad predecible, sin `updateModalIfOpen` hacks. Suscripción granular por componente. |
| 4.4 | **Config centralizada** (`config.json` / `env`) para: zonas, roles, equipamiento, flujos, textos | 🔴 **Alta** | Hoy: hardcoded en `app.js` (líneas 23-31). Cambiar zona = deploy. Config externa = hot-reload vía Firebase Remote Config o JSON estático. |
| 4.5 | **ESLint (airbnb-base) + Prettier + Husky pre-commit** | 🟡 **Media** | Consistencia, evita merges rotos. CI obliga. |
| 4.6 | **CI/CD GitHub Actions**: lint → typecheck → test → build → deploy preview (GitHub Pages) → deploy prod | 🔴 **Alta** | Deploy actual: push a main = prod directo. Sin validación. Preview PR = revisión visual antes de merge. |
| 4.7 | **Documentación arquitectura** (ADR en `/docs/adr/`: auth, offline, sync, data model) | 🟢 **Baja** | Onboarding futuro, decisiones trazables. |

---

## 5. Funcionalidades Nuevas (Valor Negocio Restauración)

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 5.1 | **Gestión de turnos** (mañana / tarde / noche) + asignaciones por turno | 🔴 **Alta** | Hoy: una asignación global. Realidad: camarero mañana ≠ camarero turno noche. Core para restauración. |
| 5.2 | **Historial de asignaciones** (último 30 días) + export CSV/PDF para nóminas/control | 🟡 **Media** | Trazabilidad: quién estuvo en qué zona, cuándo. Resuelve disputas, auditoría, planning. |
| 5.3 | **Plantillas de cuadrantes** ("Turno tipo viernes", "Evento privado") — aplicar en 1 click | 🟡 **Media** | Ahorra 2-3 min/turno al encargado. Reduce errores de asignación manual repetitiva. |
| 5.4 | **Checklists por zona** (apertura / cierre / limpieza) con tick persistente por camarero | 🟡 **Media** | Operacional: "¿Repusiste pulmón Z3?" ✓. Trazabilidad + formación juniors. |
| 5.5 | **Comunicación interna**: notas de turno (ej: "Mesa 12 alérgeno gluten") visibles por zona | 🟢 **Baja** | Sustituye post-its / WhatsApp. Contexto crítico en servicio. |
| 5.6 | **Métricas simples**: cargas por zona (cubiertos/hora), alerts si zona sin asignar > 10 min | 🟢 **Baja** | Visibilidad gerencial. Requiere backend/Functions para agregación. |
| 5.7 | **Modo "Evento / Catering"** — plano alternativo, zonas temporales | 🟢 **Baja** | Flexibilidad para servicios fuera de carta. |

---

## 6. Offline / Sync / Conflictos

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 6.1 | **Queue de escrituras offline** (IndexedDB) → replay al recuperar conexión | 🔴 **Alta** | Hoy: offline = solo lectura (SW cache). Encargado sin cobertura (bodega, terrace) no puede asignar. Crítico en restaurantes con zonas muertas. |
| 6.2 | **Resolución de conflictos last-write-wins + timestamp servidor** (Firebase `serverTimestamp`) | 🟡 **Media** | Dos admins editan misma zona simultáneo. Hoy: gana último `set()`. Añadir `updatedAt` + `updatedBy` para auditoría. |
| 6.3 | **Indicador visual estado sync** (🟢 online / 🟡 syncing / 🔴 offline) en header ambas vistas | 🔴 **Alta** | Transparencia: camarero sabe si ve datos frescos. Encargado sabe si su cambio subió. |
| 6.4 | **Background Sync API** (si disponible) para flush queue automático | 🟢 **Baja** | Mejora UX offline sin intervención usuario. Soporte parcial en Safari. |
| 6.5 | **Versionado de esquema datos** (`schemaVersion` en DB) + migraciones automáticas | 🟢 **Baja** | Previene roturas al añadir campos (turno, checklist, notas). |

---

## 7. Observabilidad y Fiabilidad

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 7.1 | **Error tracking** (Sentry DSN) — captura JS errors + Firebase errors + source maps | 🔴 **Alta** | Hoy: `console.error` sóino. Sin visibilidad de fallos en producción (móviles camareros). |
| 7.2 | **Health check endpoint** (Firebase `/.well-known/health` o Function) + uptime monitor (Uptime Kuma / Better Stack) | 🟡 **Media** | Alerta si Firebase caído / reglas rotas / deploy roto. 5 min downtime = servicio sin cuadrante. |
| 7.3 | **Logging estructurado** (pino / custom) → Firebase Functions / Logtail / Loki | 🟡 **Media** | Auditoría: quién asignó, cuándo, desde qué IP/dispositivo. Requerido para trazabilidad laboral. |
| 7.4 | **Tests E2E críticos** (Playwright): login admin → asignar → verificar camarero ve cambio → offline → online sync | 🔴 **Alta** | Happy path automatizado. Previene regresiones en sync core. |
| 7.5 | **Feature flags** (Firebase Remote Config) para rollout gradual (turnos, checklists, notas) | 🟢 **Baja** | Despliegue seguro: activa para 10% → 50% → 100%. Rollback instantáneo. |

---

## 8. Adaptación al Sector Restauración

| # | Mejora | Prioridad | Impacto |
|---|--------|-----------|---------|
| 8.1 | **Multi-idioma** (ES/EN/CA/EU) — i18n simple JSON + `navigator.language` | 🟡 **Media** | Plantillas internacionales, personal extranjero. Bajo coste con arquitectura config-driven. |
| 8.2 | **Integración TPV / comanderos** (webhook pedidos → zona responsable) | 🟢 **Baja** | Futuro:push pedido a zona automático. Requiere API TPV (Glovo, CoverManager, etc). |
| 8.3 | **Cumplimiento RGPD / LOPD** — consentimiento cookies, derecho olvido, DPA Firebase | 🟡 **Media** | Nombres camareros = datos personales. Hoy: sin aviso, sin consentimiento, sin borrado. |
| 8.4 | **Pantalla "Espejo" para cocina/office** (TV modo solo lectura, auto-refresh) | 🟡 **Media** | Visibilidad flujos: cocina ve qué zona pide qué. Elimina gritos / walkie-talkies. |
| 8.5 | **Modo "Alergias / Dietas"** por mesa/zona — badge visual en zona | 🟢 **Baja** | Seguridad alimentaria. Diferenciador competitivo. |

---

## 🏆 TOP 3 — Qué hacer YA (Esta semana)

| # | Mejora | Por qué | Esfuerzo estimado |
|---|--------|---------|-------------------|
| **1** | **🔒 Endurecer reglas Firebase + App Check + Auth real** (3.1, 3.2, 3.3) | **Riesgo real**: base de datos pública, auth casera sin reset/MFA, abuso cuota. Cumple seguridad básica. | 2-3h (reglas + App Check + migrar auth a Email/Password + verificación email) |
| **2** | **📦 Queue offline escrituras + indicador sync** (6.1, 6.3) | **Bloqueo operativo**: encargado en bodega/terraza sin cobertura no puede asignar. Camarero no sabe si datos frescos. | 3-4h (IndexedDB queue + `serverTimestamp` + header sync badge + Background Sync opcional) |
| **3** | **🏗️ CI/CD + TypeScript + Tests mínimos** (4.1, 4.6, 7.4) | **Fundación**: sin esto, cada cambio siguiente es ruleta. TypeScript atrapa bugs en compile-time. CI evita deploy roto. Playwright valida happy path real. | 4-6h (Vite + TS + Vitest + Playwright + GH Actions workflow + 3 tests E2E) |

---

## 📦 Próximos pasos sugeridos (Roadmap 4-8 semanas)

| Semana | Foco | Entregables |
|--------|------|-------------|
| 1-2 | **Seguridad + Offline + CI** (Top 3) | Reglas Firebase seguras, App Check, Auth real, Offline queue, CI pipeline, TS baseline |
| 3-4 | **Arquitectura + Config + Turnos** (4.1, 4.4, 5.1) | Config externa (zonas/flujos/equipamiento en JSON/Firebase), Turnos mañana/tarde/noche, Refactor capas |
| 5-6 | **UX Camarero + Observabilidad** (1.1, 1.2, 1.6, 7.1, 7.4) | Vista "mi zona", header turno, Accesibilidad AA, Sentry, 5 tests E2E críticos |
| 7-8 | **Historial + Plantillas + Checklists** (5.2, 5.3, 5.4) | Historial 30d + export, Plantillas cuadrante, Checklists apertura/cierre por zona |

---

## ⚠️ Riesgos y Decisiones Pendientes (Requieren input)

1. **¿Multi-restaurante?** Hoy: single-tenant (Ñam Morea). Si escalar → multi-tenant en Firebase (subcollections `/restaurants/{id}/asignaciones`) + auth por tenant.
2. **¿Datos personales?** Nombres camareros = PII. ¿Consentimiento explícito? ¿Derecho olvido automático? → Definir política retención (ej: 90 días post-contrato).
3. **¿Dispositivos compartidos?** iPad cocina/camareros. Hoy: logout manual. ¿Auto-logout por inactividad (5 min)? ¿PIN rápido en lugar de password?
4. **¿Coste Firebase?** Plan Spark (gratis): 100 conexiones simultáneas, 1GB egress/mes. ¿Suficiente? Monitorizar en Sentry/Analytics.
5. **¿Backup / Disaster Recovery?** Firebase tiene backup automático (Blaze plan). En Spark: export manual periódico. ¿Script de backup semanal a GitHub/GDrive?

---

## 📎 Archivos de referencia en repo

| Archivo | Qué revisar |
|---------|-------------|
| `database.rules.json` | **Crítico**: `.read: true` → cambiar a `auth != null` mínimo |
| `js/app.js:66-141` | Auth casera → migrar a `signInWithEmailAndPassword` real + `sendPasswordResetEmail` |
| `js/app.js:40-47` | Suscripción Firebase → añadir `serverTimestamp` en escrituras |
| `sw.js:39-65` | Fetch handler → invertir a cache-first para assets estáticos |
| `manifest.json:6-7` | `background_color: #121212` vs CSS `--bg-dark: #F3F4F6` → inconsistencia tema |
| `index.html:5` | `maximum-scale=1.0, user-scalable=no` → **accesibilidad**: bloquea zoom. Quitar. |

---

**Fin del informe.**  
*Generado tras revisión completa de código, Git history, y app en producción.*