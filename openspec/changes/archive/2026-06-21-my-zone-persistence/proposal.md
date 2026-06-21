## Why

Waiters currently have to search for their assigned zone in the main list or plano every time they open the application. Allowing them to select and persist "mi zona" in localStorage enables immediate highlight and quick focus, improving service efficiency and reducing cognitive load.

## What Changes

- **Add toggle button in Zone Modal**: Waiters can mark/unmark a zone as "mi zona" directly from the zone detail modal.
- **LocalStorage Persistence**: Store the active zone ID scoped by restaurant ID (`puestoya_mi_zona_${activeRestaurantId}`).
- **Waiter Grid Highlight**: Highlight "mi zona" with a distinct premium border, subtle background tint, and a star icon on the waiters' grid.
- **Floorplan Canvas Highlight**: Highlight the same zone on the interactive floorplan canvas with a clear visual marker and star icon.

## Capabilities

### New Capabilities
- `my-zone-persistence`: Allows waiters to persist a favorite/assigned zone and visually highlights it in both the grid and the floorplan canvas views.

### Modified Capabilities

## Impact

- `src/ui.ts`: Refactor `showZonaModal` to render the toggle button and handle click persistence, and `renderCamareros` to append the highlight class.
- `src/admin/floorplan-editor.ts`: Read localStorage and add the highlight class to the corresponding canvas block element.
- `css/style.css`: Add CSS classes `.zona-card.is-mi-zona` and `.canvas-zone-block.is-mi-zona` for visual presentation.
