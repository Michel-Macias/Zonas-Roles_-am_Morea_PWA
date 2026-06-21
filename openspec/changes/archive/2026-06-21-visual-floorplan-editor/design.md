# Design: 05-visual-floorplan-editor

## 1. Mapeo del Modelo de Datos
La posición se almacena como un objeto `position` opcional dentro de cada zona:
```json
{
  "restaurants": {
    "demo-restaurant": {
      "zones": {
        "Z1": {
          "id": "Z1",
          "nombre": "Terraza A",
          "ubicacion": "Exterior",
          "mision_principal": "Atender mesas de fuera",
          "position": {
            "x": 10.5,
            "y": 20.0,
            "width": 30.0,
            "height": 15.0
          }
        }
      }
    }
  }
}
```

## 2. Pestaña de Navegación "Plano"
Añadiremos un nuevo botón en la barra de pestañas superior:
```html
<button class="tab-btn" data-target="view-plano" id="btn-tab-plano">🗺️ Plano</button>
```
Y su vista correspondiente:
```html
<div id="view-plano" class="view hidden">
    <!-- Renderizado dinámico del plano -->
</div>
```

## 3. Lógica del Canvas y Drag & Drop
*   El canvas del plano es un contenedor `div` posicionado de manera `relative` con un tamaño adaptado a la imagen de fondo:
    ```css
    .floorplan-canvas {
        position: relative;
        width: 100%;
        max-width: 800px;
        aspect-ratio: 16/10; /* O adaptado a la relación de aspecto de la imagen */
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
    }
    ```
*   Cada zona es un bloque posicionado con `position: absolute`:
    ```css
    .canvas-zone-block {
        position: absolute;
        border: 2px solid var(--primary);
        background: rgba(249, 115, 22, 0.2);
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 0.9rem;
        user-select: none;
    }
    .canvas-zone-block.waiter-mode {
        cursor: pointer;
    }
    ```
*   **Editor Visual:**
    *   Un modo de edición (solo administradores) que añade tiradores de redimensión en la esquina inferior derecha de cada bloque de zona.
    *   Usando eventos de puntero (`pointerdown`, `pointermove`, `pointerup`), calculamos las posiciones en coordenadas relativas `%` con respecto al tamaño del canvas y actualizamos las variables temporales.
    *   Un botón "Guardar Distribución" guarda los valores en Firebase de forma masiva para todas las zonas modificadas.
