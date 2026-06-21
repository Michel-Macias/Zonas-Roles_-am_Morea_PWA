# Proposal: 05-visual-floorplan-editor

## Contexto
El usuario puede subir imágenes de planos de local y administrar zonas de restaurante, pero las zonas se representan de forma estática en la UI (el SVG original está hardcodeado). Ahora que el plano físico se puede subir y las zonas se pueden editar dinámicamente, necesitamos dar al administrador la posibilidad de colocar visualmente las zonas creadas encima de su plano subido para que los camareros vean un plano adaptado a su restaurante.

## Problema
Al usar un SVG hardcodeado, los restaurantes que tienen un diseño físico diferente no pueden ver sus zonas representadas espacialmente de forma correcta.

## Objetivo
Desarrollar un editor visual de arrastrar y soltar (drag & drop) que permita colocar y redimensionar zonas directamente sobre el plano del restaurante subido a Firebase Storage, y renderizar este plano interactivo dinámico tanto para los administradores como para los camareros.

## Alcance
- ✅ Pestaña dedicada "Plano" en la barra de navegación para visualización e interactividad.
- ✅ Modo Diseño (admin): Canvas interactivo con el plano original del restaurante como fondo, con superposiciones absolutas de zonas.
- ✅ Drag & drop interactivo y ajuste de tamaño manual para posicionar zonas sobre el lienzo.
- ✅ Persistencia de las posiciones (`x, y, width, height` en porcentaje `%` relativo) en la base de datos bajo `/restaurants/{restaurantId}/zones/{zoneId}/position`.
- ✅ Renderizado dinámico en la vista de camareros: si existe plano dinámico configurado, se dibuja este plano sobre el plano físico de fondo, y las zonas se pueden pulsar para abrir el modal de detalles de la zona.
- ✅ Fallback seguro: si el restaurante no tiene plano configurado, se muestra el plano SVG estático por defecto.
- ❌ No incluye detección automática de zonas en la imagen mediante visión por computadora (se deja para una fase futura).
- ❌ No incluye descarga en formato PDF del plano diseñado.

## Criterios de Éxito
- [ ] La pestaña "Plano" es visible e interactiva.
- [ ] Las zonas se pueden arrastrar y cambiar de tamaño sobre la imagen de fondo del local en modo edición.
- [ ] Los porcentajes se guardan correctamente en Firebase RTDB y se actualizan reactivamente sin recargar la página.
- [ ] `npm run build` compila con éxito.
