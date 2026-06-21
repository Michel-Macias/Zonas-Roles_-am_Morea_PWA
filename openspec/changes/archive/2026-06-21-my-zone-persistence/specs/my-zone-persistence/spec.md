## ADDED Requirements

### Requirement: Persistencia de "Mi Zona" en LocalStorage
El sistema SHALL permitir al usuario marcar una zona como "Mi Zona" para guardarla localmente en el dispositivo/navegador y destacarla de forma prioritaria en las interfaces.
Priority: High
Rationale: Agilizar el acceso a la información y tareas de la zona asignada para el camarero.

#### Scenario: Marcar zona como favorita
- **GIVEN** el modal de detalle de la zona "Z1" está abierto
- **WHEN** el usuario hace clic en el botón "Marcar como mi zona"
- **THEN** el sistema MUST guardar "Z1" en `localStorage` bajo `puestoya_mi_zona_{restaurantId}`
- **AND** el botón debe cambiar a "Quitar de mi zona" con estilos activos
- **AND** la tarjeta de la zona "Z1" en la cuadrícula de camareros MUST recibir la clase `is-mi-zona`.

#### Scenario: Quitar zona de favoritos
- **GIVEN** la zona "Z1" está guardada como "Mi Zona" en `localStorage`
- **WHEN** el usuario abre el modal de "Z1" y pulsa "Quitar de mi zona"
- **THEN** el sistema MUST eliminar la clave de `localStorage`
- **AND** el botón debe cambiar a "Marcar como mi zona" con estilos inactivos
- **AND** la tarjeta "Z1" MUST remover la clase `is-mi-zona`.

#### Scenario: Visualización destacada en el Plano
- **GIVEN** la zona "Z1" está guardada como "Mi Zona" en `localStorage`
- **WHEN** se carga el plano general interactivo (lienzo o SVG de fallback)
- **THEN** el elemento visual correspondiente a la zona "Z1" SHALL recibir estilos de destaque visual (clase `is-mi-zona`) y mostrar un icono indicador.
