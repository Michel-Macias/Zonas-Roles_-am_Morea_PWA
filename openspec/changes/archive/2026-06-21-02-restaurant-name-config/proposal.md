# Proposal: restaurant-name-config

## Why
Actualmente, cuando un administrador se registra, el sistema crea un restaurante con el nombre por defecto "Mi Restaurante". No existe forma de personalizarlo desde el panel de administración. Esto genera una experiencia genérica sin posibilidad de branding propio.

## What Changes
- Añadir botón de configuración junto al badge del restaurante en la cabecera.
- Modal con formulario de edición del nombre.
- Persistencia en `/restaurants/{restaurantId}/config/name` en Firebase RTDB.
- Actualización reactiva del badge sin recargar la página.
- Validación de campo vacío y feedback de error en caso de fallo de escritura.

---

## Criterios de Éxito
- [ ] El administrador puede editar el nombre y verlo reflejado sin recargar la página
- [ ] El cambio se guarda en Firebase RTDB en la ruta indicada
- [ ] `npm run build` pasa sin errores de TypeScript
- [ ] La UI respeta el diseño limpio y táctil del proyecto
