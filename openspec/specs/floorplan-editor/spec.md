# floorplan-editor Specification

## Purpose
TBD - created by archiving change visual-floorplan-editor. Update Purpose after archive.
## Requirements
### Requirement: Posicionamiento Relativo y Responsivo de Zonas
El sistema SHALL guardar las coordenadas de las zonas como porcentajes flotantes (`x`, `y`, `width`, `height`) relativos al contenedor del plano, para garantizar que la visualización del plano sea responsiva en dispositivos móviles y tabletas de cualquier resolución.
Priority: High
Rationale: Garantizar que la visualización de la posición del plano de mesa sea consistente independientemente de la resolución de pantalla.

#### Scenario: Guardado exitoso de posiciones relativas
- **GIVEN** el panel del editor de planos abierto para un restaurante
- **WHEN** el administrador arrastra una zona Z1 al centro del lienzo
- **AND** hace clic en guardar
- **THEN** el sistema SHALL persistir las coordenadas de la zona en porcentaje bajo `/restaurants/{restaurantId}/zones/Z1/position`
- **AND** las coordenadas SHALL reflejar valores de porcentaje flotantes (`x`, `y`, `width`, `height`).

### Requirement: Interactividad de Plano Dinámico para Camareros
Si el restaurante cuenta con una URL de plano configurada (`floorplanUrl`), el sistema SHALL renderizar dicho plano de fondo en la pestaña "Plano" del camarero y superponer las zonas en sus posiciones guardadas, permitiendo que al hacer clic en cualquiera de ellas se abra el modal con sus detalles y camarero asignado.
Priority: High
Rationale: Permitir que los camareros usen el plano real del local como referencia espacial rápida para consultar tareas o asignaciones.

#### Scenario: Visualización interactiva del plano dinámico
- **GIVEN** un camarero en la pestaña "Plano" de un restaurante con plano configurado
- **WHEN** pulsa sobre el recuadro de la zona "Terraza A" superpuesta en el plano
- **THEN** el sistema SHALL abrir el modal con el detalle y camarero asignado a la zona "Terraza A".

### Requirement: Fallback de Plano Estático por Defecto
Si el restaurante no tiene un plano físico configurada en la base de datos, el sistema SHALL mostrar el plano SVG estático demo por defecto en la pestaña "Plano", manteniendo la interactividad original.
Priority: Medium
Rationale: Asegurar que el sistema siga funcionando normalmente para restaurantes de prueba u onboarding inicial.

#### Scenario: Carga de plano demo sin configuración de imagen
- **GIVEN** un usuario en la pestaña "Plano" de un restaurante sin imagen subida
- **WHEN** se carga la pestaña
- **THEN** el sistema SHALL renderizar el SVG estático demo `#plano-svg` original.

