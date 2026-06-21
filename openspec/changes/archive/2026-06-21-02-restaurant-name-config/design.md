# Design: restaurant-name-config

## Enfoque
Cambio mínimo y localizado en la cabecera del panel de administración.

## Estructura
- Añadir un botón/icono al lado de `#restaurant-name-badge` en la cabecera.
- El botón abre un `<dialog>` nativo con un `<form>` de un campo: "Nombre del Restaurante".
- Al enviar:
  1. Validar campo no vacío.
  2. Escribir en Firebase RTDB: `/restaurants/{restaurantId}/config/name` = nuevoNombre.
  3. Actualizar el DOM del badge con el nuevo valor.
  4. Capturar errores y mostrar toast/message inline.

## Detalles técnicos
- Reutilizar helpers de Firebase en `src/firebase.ts`.
- La ruta se escribe como `update('/restaurants/' + restaurantId + '/config/name', newName)`.
- El endpoint debe coincidir exactamente con la especificación: `/restaurants/{restaurantId}/config/name`.
- No se modifica el modelo de datos existente; solo se añade la rama `config/name` por restaurante.
- Si el compilador TypeScript lanzara error, se resuelve ajustando tipos locales dentro de este cambio.

## Estilo
Botón estilizado acorde al sistema actual (CSS vanilla). Modal con bordes redondeados y foco accesible. Se mantiene la estética limpia y táctil del proyecto.
