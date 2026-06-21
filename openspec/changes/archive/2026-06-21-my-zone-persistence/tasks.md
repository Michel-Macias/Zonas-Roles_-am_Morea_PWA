## 1. UI and Interactivity (Modals and Card highlights)

- [x] 1.1 Add CSS classes `.zona-card.is-mi-zona` and `.canvas-zone-block.is-mi-zona` to `css/style.css`
- [x] 1.2 Modify `showZonaModal` in `src/ui.ts` to render the "Marcar/Quitar mi zona" toggle button based on localStorage state and bind click events
- [x] 1.3 Update `renderCamareros` in `src/ui.ts` to check localStorage and add the `.is-mi-zona` class to the active card

## 2. Floorplan Highlights

- [x] 2.1 Update `renderFloorplan` in `src/admin/floorplan-editor.ts` to check the stored active zone ID and add `.is-mi-zona` class to the corresponding canvas block element

## 3. Verification and Compilation

- [x] 3.1 Verify that the toggle correctly updates localStorage and adds/removes the highlight class
- [x] 3.2 Verify that the active zone highlights on both the grid card and the floorplan canvas
- [x] 3.3 Verify that `npm run build` runs successfully without any TypeScript or bundler errors
