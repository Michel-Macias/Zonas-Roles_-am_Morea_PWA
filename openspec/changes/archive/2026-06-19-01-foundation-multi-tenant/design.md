# Design: 01-foundation-multi-tenant

## 1. Diseño del Modelo de Datos (Firebase Realtime Database)

Pasamos de un modelo single-tenant plano a la siguiente estructura encapsulada:

```json
{
  "restaurants": {
    "REST_ID_123": {
      "config": {
        "name": "Mi Restaurante",
        "createdAt": 1718816400000
      },
      "members": {
        "USER_UID_ABC": {
          "role": "admin",
          "email": "admin@restaurante.com"
        }
      },
      "assignments": {
        "Z1": "Michel",
        "Z2": "Maria",
        "Z3": "",
        "Z4": "",
        "Z5": "",
        "Z6": "",
        "Z7": ""
      }
    }
  },
  "users": {
    "USER_UID_ABC": {
      "restaurantId": "REST_ID_123"
    }
  }
}
```

---

## 2. Flujo de Autenticación y Verificación de Email

### Flujo de Registro (Primer Inicio de Sesión):
1. El usuario administrador introduce email y contraseña en la pantalla de login.
2. Si el usuario no existe, se ejecuta `createUserWithEmailAndPassword`.
3. Tras la creación exitosa del usuario:
   * Generamos un `restaurantId` único de forma local (ej. mediante una función generadora de UID aleatorios).
   * Escribimos en Realtime DB:
     * `/restaurants/{restaurantId}/config` con `{ name: "Mi Restaurante", createdAt: ServerTimestamp }`.
     * `/restaurants/{restaurantId}/members/{uid}` con `{ role: "admin", email: email }`.
     * `/users/{uid}/restaurantId` con el ID del restaurante creado.
   * Invocamos `sendEmailVerification(user)` sobre el usuario de Firebase Auth actual.
   * Ejecutamos `signOut(auth)` inmediatamente para cerrar la sesión activa del usuario recién creado.
   * Mostramos un mensaje de éxito/aviso en la UI: *"¡Cuenta creada! Te hemos enviado un email de verificación a {email}. Por favor, verifícalo antes de iniciar sesión."*

### Flujo de Login:
1. El usuario introduce credenciales en la pantalla de login.
2. Ejecutamos `signInWithEmailAndPassword`.
3. Si el login es exitoso:
   * Comprobamos si `user.emailVerified` es `true`.
   * Si es `false`:
     * Ejecutamos `signOut(auth)`.
     * Mostramos mensaje: *"Debes verificar tu correo antes de iniciar sesión. Revisa tu correo de confirmación."*
   * Si es `true`:
     * Permitimos la entrada de forma normal y la sesión se mantiene activa.

---

## 3. Acceso de Camareros (Lectura de Plano)

Para evitar que los camareros tengan que registrarse y loguearse durante esta fase inicial:
1. El camarero accederá a la aplicación utilizando un parámetro en la URL: `?r={restaurantId}` (ej. `https://puestoya.app/?r=REST_ID_123`).
2. Al iniciar la aplicación:
   * La app lee el parámetro `r` de la URL.
   * Si el parámetro `r` existe, la app guarda este `restaurantId` en memoria (`localStorage` para persistencia en futuras visitas) y se suscribe a los datos bajo `/restaurants/{restaurantId}/assignments`.
   * Si no se especifica ningún restaurante y el usuario no está logueado como administrador, el sistema puede mostrar un mensaje pidiendo un link válido (o cargar un restaurante demo por defecto para que la app no aparezca vacía).

---

## 4. Modificaciones en el Código Existente

### `src/firebase.ts`
* No requiere cambios estructurales, mantiene la exportación de `auth` y `db`.

### `src/auth.ts`
* Modificar el evento de clic en `btnLogin` para gestionar el flujo de registro (creación del restaurante en DB + envío de email de verificación) y el flujo de login (comprobación de verificación).
* Asegurar que `onAuthStateChanged` compruebe `user.emailVerified` antes de otorgar privilegios de administrador.

### `src/zones.ts`
* Almacenar de forma global el `restaurantId` activo (ya sea recuperado de la sesión del admin o de la query param en la URL de camarero).
* Modificar `initZones(onUpdate)` para suscribirse a `/restaurants/{restaurantId}/assignments` en lugar de `/asignaciones`.
* Modificar `saveAsignacion(id, name)` para actualizar `/restaurants/{restaurantId}/assignments/{id}`.
* Modificar `clearAssignments()` para eliminar `/restaurants/{restaurantId}/assignments`.

### `src/ui.ts`
* Agregar soporte para mostrar mensajes de estado de verificación del correo y avisos visuales en el formulario de login.
