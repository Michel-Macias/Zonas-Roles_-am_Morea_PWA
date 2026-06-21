# Tasks: restaurant-name-config

## Pre-requisitos
- [x] Confirmar que `npm run build` pasa actualmente en `desarrollo-con-Hermes`
- [x] Verificar que existe un acceso a admin con badge `#restaurant-name-badge`

## Implementación
- [x] Añadir botón de configuración junto a `#restaurant-name-badge`
- [x] Crear modal `<dialog>` con formulario de 1 campo
- [x] Implementar submit: validar, escribir `/restaurants/{restaurantId}/config/name`, capturar errores
- [x] Actualizar badge automáticamente tras escritura exitosa
- [x] Añadir feedback visual de error si Firebase falla

## Verificación
- [x] Probar flujo completo en local: abrir modal, guardar, ver cambio reflejado sin recarga
- [x] Verificar ruta exacta escrita en Firebase: `/restaurants/{restaurantId}/config/name`
- [x] `npm run build` pasa sin errores TypeScript

## Documentación
- [x] Incluir nota breve en el commit: "Fase 2.1: configuración de nombre del restaurante"
