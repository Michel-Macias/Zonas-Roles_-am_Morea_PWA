# Tasks: 01-foundation-multi-tenant

## Checklist de Tareas

### 🛠️ 1. Preparación del Estado y Funciones Auxiliares
- [x] Modificar `src/zones.ts` para exportar y gestionar la variable `activeRestaurantId` (en memoria y sincronizada con `localStorage`).
- [x] Crear la función auxiliar para generar IDs únicos cortos de restaurante (ej. `rest-XXXXXX`).

### 🔑 2. Implementación del Flujo de Registro y Verificación
- [x] Modificar el flujo de registro en `src/auth.ts`:
  - Registrar el usuario en Firebase Auth.
  - Generar el `restaurantId`.
  - Crear en Realtime DB `/restaurants/{restaurantId}/config` y `/restaurants/{restaurantId}/members/{uid}` con rol `admin`.
  - Crear en Realtime DB `/users/{uid}/restaurantId`.
  - Enviar email de verificación mediante `sendEmailVerification(user)`.
  - Forzar deslogueo con `signOut(auth)`.
  - Mostrar feedback visual claro al usuario pidiendo que verifique su bandeja de entrada.

### 🔑 3. Implementación del Flujo de Login y Restricción de Acceso
- [x] Modificar el inicio de sesión en `src/auth.ts`:
  - Validar si `user.emailVerified` es `true`.
  - Si no está verificado, impedir el login, cerrar sesión con `signOut(auth)` y mostrar un mensaje de error estilizado.
- [x] Actualizar el callback de `onAuthStateChanged`:
  - Si el usuario existe y está verificado, leer de la base de datos la ruta `/users/{uid}/restaurantId`.
  - Cargar el `restaurantId` in `activeRestaurantId` y llamar a la inicialización de zonas para el panel de administración.

### 🗺️ 4. Adaptación del Módulo de Zonas a Multi-tenant
- [x] Modificar `initZones(restaurantId, onUpdate)` en `src/zones.ts` para escuchar en la ruta `/restaurants/{restaurantId}/assignments`.
- [x] Modificar `saveAsignacion(restaurantId, zoneId, name)` y `clearAssignments(restaurantId)` para que realicen las escrituras en la ruta específica del restaurante.

### 🔌 5. Adaptación de la Vista del Camarero (Query Params)
- [x] Modificar `src/main.ts` para extraer el parámetro `r` de la URL al iniciar.
- [x] Si existe el parámetro `r`, establecerlo como `activeRestaurantId` y guardarlo en `localStorage`.
- [x] Si no se encuentra ningún `restaurantId` (ni por parámetro `r` ni por estar logueado como admin), utilizar un restaurante de demostración por defecto (`demo-restaurant`) y mostrar un banner discreto en la parte superior pidiendo un link válido.

### 🎛️ 6. Ajustes de UI y Mensajería
- [x] Estilizar el contenedor de login en `index.html` para mostrar adecuadamente los mensajes de "Email enviado" (color verde de éxito) y "Email no verificado" (color rojo).
- [x] Añadir en la interfaz del camarero la información del restaurante activo (ej. mostrar el nombre del local en un subtítulo superior si está disponible en `/restaurants/{restaurantId}/config/name`).

### 🔍 7. Pruebas y Compilación
- [x] Ejecutar `npm run build` para asegurar la integridad de los tipos TypeScript.
- [x] Validar manualmente registrando un nuevo usuario de pruebas, comprobando la base de datos de Firebase y simulando accesos con `?r=ID_CREADO`.
