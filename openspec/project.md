# 📜 Constitución del Proyecto — PuestoYa PWA

## Contexto del Proyecto
**PuestoYa** es una aplicación web progresiva (PWA) de gestión y asignación de puestos/zonas de trabajo para restaurantes en tiempo real. 
Originalmente comenzó como un MVP de una sola zona para un único restaurante (con 7 zonas y un plano SVG estático hardcoded) y se está transformando en una **plataforma SaaS multi-restaurante**.

---

## 🛠️ Stack Tecnológico
* **Frontend:** HTML5, CSS vanilla (design tokens, variables locales), TypeScript (Vanilla TS con ES modules)
* **Bundler / Build Tool:** Vite
* **Base de Datos & Backend:** Firebase Realtime Database
* **Autenticación:** Firebase Authentication (emails reales)
* **Hosting/Infraestructura:** Firebase Hosting (pendiente confirmación)
* **Service Worker:** Estrategia Stale-While-Revalidate configurada en `sw.js`

---

## 📐 Reglas y Convenciones de Código
1. **TypeScript Estricto:** Evitar el uso de `any` no justificado. Usar tipos explícitos para todas las estructuras de datos complejas.
2. **Modularidad:** El código debe estar separado por responsabilidades claras:
   * `src/firebase.ts` - Configuración e inicialización de Firebase
   * `src/auth.ts` - Lógica de sesión, registro y restauración de contraseñas
   * `src/zones.ts` - Conexión con base de datos en tiempo real y asignaciones
   * `src/ui.ts` - Manejo del DOM, renderizado e interacción del usuario
   * `src/utils.ts` - Funciones auxiliares sin efectos secundarios
3. **No dependencias pesadas:** Mantener el bundle lo más ligero posible. Evitar añadir frameworks pesados como React/Angular/Vue a menos que se apruebe en un cambio explícito.
4. **CSS Vanilla:** Utilizar variables CSS para control de colores y temas. Respetar el sistema de diseño limpio y funcional diseñado para pantallas táctiles de hostelería.

---

## ⚙️ Reglas de Desarrollo Guiado por Especificaciones (SDD / OpenSpec)
Este proyecto sigue estrictamente el ciclo de desarrollo de **OpenSpec**:
1. **explore:** Brainstorming e investigación del cambio.
2. **propose:** Definición de la propuesta (`proposal.md` + delta specs en Gherkin + `design.md` + `tasks.md`).
3. **apply:** Implementación del código por parte del agente siguiendo paso a paso la checklist de tareas.
4. **verify:** Verificación del comportamiento final contra los escenarios Gherkin descritos.
5. **archive:** Sincronización de delta specs a la carpeta principal `openspec/specs/` y archivado en `openspec/changes/archive/`.

**Restricciones de Spec-Driven Development:**
* Las especificaciones vivas residen en `openspec/specs/` y son la única fuente de verdad funcional.
* Todo desarrollo debe comenzar en `openspec/changes/` mediante un cambio activo. No se permiten refactorizaciones o features de gran escala de forma ad-hoc sin proposal y spec previas.
* Las tareas de `tasks.md` deben ser de un tamaño máximo de 1-2 horas. Si el cambio excede 12-15 tareas, debe dividirse en propuestas independientes.
* Los requisitos funcionales deben expresarse con verbos normativos (`SHALL`, `MUST`, `SHOULD`) y estar acompañados de al menos un escenario Gherkin (`GIVEN`, `WHEN`, `THEN`).
