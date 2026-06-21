## Context

Waiters use PuestoYa on their personal mobile devices or restaurant tablets. When opening the app, they want to quickly check their current assignment and tasks. By letting them persist a favorite or assigned zone ("mi zona") on the specific device/browser, we highlight it prominently, bypassing the need to search or filter manually.

## Goals / Non-Goals

**Goals:**
- Add a lightweight toggle in the zone detail modal to set/remove "mi zona".
- Persist the selected zone ID in `localStorage` under a restaurant-scoped key: `puestoya_mi_zona_{restaurantId}`.
- Highlight the user's active zone in the main waiter grid card view.
- Highlight the active zone block inside the interactive floorplan canvas (or fallback SVG) when viewed.

**Non-Goals:**
- Server-side persistence: Storing this in Firebase RTDB is out of scope. LocalStorage is sufficient and respects device-specific usage.
- Synchronization across devices: This setting is bound to the local browser context.

## Decisions

- **Key Formatting**: Use `puestoya_mi_zona_${activeRestaurantId}` to handle multi-tenant isolation.
- **Visual Feedback**:
  - Waiter Grid Card: Add `border-color: #3B82F6` (blue-500), `background-color: #EFF6FF` (blue-50), and a relative absolute-positioned star icon `⭐` at the top right.
  - Floorplan Block: Add a blue border, a transparent blue overlay, and a star icon.
- **Modal Toggle**: Put the button at the top part of the modal right under the zone subtitle to make it extremely easy to toggle on mobile.

## Risks / Trade-offs

- **Clear Cache / Incognito Mode**: Cleared browser data will reset the active zone.
  - *Mitigation*: It is extremely simple to re-toggle (1 click), so no complex fallback database storage is required.
