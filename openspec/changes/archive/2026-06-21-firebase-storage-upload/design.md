# Design: 04-firebase-storage-upload

## 1. Configuración de Firebase Storage

Modificaremos [src/firebase.ts](file:///home/m1txel/Escritorio/Zonas-Roles-Review/src/firebase.ts) para importar e inicializar el servicio de almacenamiento:

```typescript
import { getStorage } from 'firebase/storage';
// ...
export const storage = getStorage(app);
```

---

## 2. Estructura de Datos en Firebase RTDB

Mapeamos la URL del plano subido dentro de la configuración del restaurante:

```json
{
  "restaurants": {
    "REST_ID_123": {
      "config": {
        "name": "Mi Restaurante",
        "floorplanUrl": "https://firebasestorage.googleapis.com/v0/b/nam-zonas.firebasestorage.app/o/restaurants%2FREST_ID_123%2Ffloorplan.png?alt=media&token=..."
      }
    }
  }
}
```

---

## 3. Lógica de Subida y Progreso

Utilizaremos la API modular de `firebase/storage` para gestionar la transferencia de forma asíncrona y reactiva:

```typescript
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set } from 'firebase/database';
import { storage, db } from './firebase';

const fileRef = storageRef(storage, `restaurants/${restaurantId}/floorplan.png`);
const uploadTask = uploadBytesResumable(fileRef, file);

uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        updateProgressBar(progress);
    }, 
    (error) => {
        showErrorAlert("Fallo en la subida: " + error.message);
    }, 
    async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Persistir en RTDB
        await set(dbRef(db, `restaurants/${restaurantId}/config/floorplanUrl`), downloadURL);
        showSuccessAlert("¡Plano subido con éxito!");
        renderFloorplanPreview(downloadURL);
    }
);
```

---

## 4. UI y Estilos (Vanilla CSS / HTML)

*   **Modal/Contenedor de Subida:** Añadiremos una zona drag-and-drop (#floorplan-dropzone) interactiva con bordes discontinuos en el panel de administración.
*   **Barra de Progreso:** Un contenedor visual (#floorplan-progress-container) con animación suave de transición en CSS al incrementar el ancho de la barra.
*   **Preview:** Si `floorplanUrl` existe en Firebase RTDB al inicializar, la UI cargará y mostrará una miniatura del plano en el panel del administrador y una opción para reemplazarlo.
