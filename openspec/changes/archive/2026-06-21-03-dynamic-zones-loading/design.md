# Design: 03-dynamic-zones-loading

## 1. Estructura de Datos en Firebase Realtime DB

Las zonas del restaurante se guardarán mapeadas por su identificador (`id`) bajo la ruta `/restaurants/{restaurantId}/zones`:

```json
{
  "restaurants": {
    "REST_ID_123": {
      "zones": {
        "Z1": {
          "id": "Z1",
          "nombre": "Barra Sup Izq",
          "ubicacion": "Zona Superior",
          "mision_principal": "Controlar el flujo de clientes en barra...",
          "tareas_secundarias": ["Servir pinchos", "Llevar comandas"],
          "equipamiento": ["Cafetera", "Caja"],
          "flujos": {
            "pide_a": ["Z7"],
            "da_soporte_a": ["Z2"]
          }
        },
        ...
      }
    }
  }
}
```

---

## 2. Inyección al Registrarse (`src/auth.ts`)

Durante el registro automático del administrador, leemos el array estático por defecto de `zones.json` y lo inyectamos mapeado por ID en la base de datos del nuevo restaurante.

### Implementación en el registro:
```typescript
import zonasData from './data/zones.json';

// Convertir array a objeto indexado por ID
const zonesObject: Record<string, any> = {};
zonasData.forEach(z => {
    zonesObject[z.id] = z;
});

// Guardar en la base de datos
await set(ref(db, `restaurants/${restaurantId}/zones`), zonesObject);
```

---

## 3. Carga Reactiva de Zonas (`src/zones.ts`)

En lugar de leer directamente el array estático importado del archivo JSON local, el módulo `src/zones.ts` gestionará un estado en memoria dinámico `currentZones` sincronizado en vivo con Firebase.

### Cambios de suscripción en `initZones`:
1. Mantendremos dos referencias de des-suscripción en `src/zones.ts`:
   * `unsubscribeAssignments`
   * `unsubscribeZones`
2. Al iniciar la escucha:
   * Nos suscribimos a `/restaurants/{activeRestaurantId}/zones`.
   * Si existen datos, mapeamos el objeto a un array `Zona[]` y lo asignamos a `currentZones`.
   * Si la ruta está vacía (fallback), cargamos el contenido de `zones.json`.
   * Llamamos al callback `onUpdate()`.
3. Re-escribimos `getZonesData()` para que devuelva `currentZones`:
   ```typescript
   export let currentZones: Zona[] = [];
   export const getZonesData = (): Zona[] => {
       return currentZones.length > 0 ? currentZones : (zonasData as Zona[]);
   };
   ```

---

## 4. Estabilidad y Fallback de la UI (`src/ui.ts`)

Debido a que `getZonesData()` pasará a ser una llamada sincrónica que devuelve el estado dinámico (que inicialmente puede estar vacío hasta que Firebase responda), añadiremos validaciones en `src/ui.ts` para que la app no pinte pantallas vacías ni tire errores de DOM en la carga inicial:
* En `renderCamareros()` y `renderAdmin()`, si la lista de zonas devuelta está vacía, nos aseguraremos de renderizar una UI de carga o hacer el fallback inmediato al JSON.
