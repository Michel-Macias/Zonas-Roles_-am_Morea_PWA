# Design: 04-zones-crud

## Contexto
- Repo: `Zonas-Roles_-am_Morea_PWA`
- Rama: `desarrollo-con-Hermes`
- Cambio activo: `openspec/changes/04-zones-crud`
- Dependencia válida: carga reactiva de zonas desde Firebase ya funcionando

## Objetivo de Diseño
Añadir un editor CRUD de zonas en el panel de administración que persista contra Firebase Realtime DB y mantenga coherencia reactiva con la UI de camareros.

## Componentes a Tocar

| Módulo | Responsabilidad | Cambio Previsto |
|---|---|---|
| `src/admin/zones.ts` | Vista lista de zonas con acciones editar/borrar | Nuevo módulo |
| `src/admin/zone-form.ts` | Formulario unificado crear/editar zona | Nuevo módulo |
| `src/services/zones.ts` | Abstracción de lectura/escitura contra Firebase | Nuevo servicio |
| `src/ui.ts` | Integrar panel admin CRUD en layout | Extensión |
| Plantillas HTML | Vistas admin | Extender |

## Reglas
- Ruta Firebase: `/restaurants/{restaurantId}/zones/{zoneId}`
- Unidades de cambio: crear/editar/eliminar
- Reactividad: listeners existentes de zonas deben reflejar cambios
- Validaciones: campos requeridos + feedback inmediato
- Tipado: tipos explícitos en `src/services/zones.ts`

## Estrategia
1. Scaffold UI admin y formulario con estados Create/Edit.
2. Conectar al servicio de zonas con Lectura/Escritura/Eliminar.
3. Reutilizar listeners reactivos ya definidos en `src/zones.ts`.
4. Pruebas funcionales locales y build.
