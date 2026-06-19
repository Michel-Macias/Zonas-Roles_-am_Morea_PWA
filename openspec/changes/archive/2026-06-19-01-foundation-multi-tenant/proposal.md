# Proposal: 01-foundation-multi-tenant

## Why
El proyecto PuestoYa cuenta con una arquitectura modular en TypeScript y Vite. La autenticación funciona mediante cuentas reales de Firebase Auth y los datos de asignaciones se sincronizan en tiempo real con Firebase Realtime Database. Sin embargo, la estructura actual de base de datos es single-tenant (plana), guardando todo bajo `/asignaciones/{zoneId}`. Los correos de los usuarios registrados no pasan por un proceso de verificación por correo electrónico.

Esto genera dos problemas graves:
1. **Falta de Aislamiento de Datos (Multi-tenancy):** Al utilizar rutas planas en Firebase, si se registran usuarios de diferentes restaurantes, sobrescribirán las asignaciones de los demás y verán información confidencial de otros locales.
2. **Seguridad de Registro (Email Verification):** No hay garantía de que el correo electrónico introducido durante el registro sea propiedad de la persona. Esto facilita el spam de cuentas creadas con correos inventados.

## What Changes
1. **Modelo de datos multi-restaurante:** Rediseñar la estructura de Firebase Realtime Database para encapsular la información por cada restaurante bajo la ruta `/restaurants/{restaurantId}/`.
2. **Verificación de Correo Obligatoria:** Modificar el flujo de autenticación para requerir la verificación del correo electrónico para todas las cuentas nuevas creadas de tipo administrador/usuario.
3. **Persistencia y Lectura Multi-tenant:** Asegurar que las operaciones de lectura y escritura de asignaciones se realicen en la ruta aislada del restaurante correspondiente al usuario logueado.
4. **Acceso Simplificado de Camareros:** Permitir que los camareros accedan al plano de su restaurante sin loguearse mediante un parámetro URL `?r={restaurantId}`.

### Alcance
* ✅ **Incluido:**
  * Estructura `/restaurants/{restaurantId}/assignments` y `/restaurants/{restaurantId}/members` en la base de datos de Firebase.
  * Asociación de un usuario registrado a un `restaurantId` por defecto al registrarse como admin (creación automática de restaurante).
  * Lógica para el envío del correo de verificación (`sendEmailVerification`) al registrarse.
  * Modificación del login para comprobar si el email está verificado.
  * Modificación de `src/zones.ts` y `src/ui.ts` para leer y escribir las asignaciones desde la ruta correspondiente a su restaurante actual.
* ❌ **Excluido:**
  * Crear múltiples restaurantes desde una misma cuenta (multi-propiedad).
  * Formulario de onboarding interactivo para subir planos (Fase 2).
  * Reglas completas de Firebase para producción con reCAPTCHA/App Check (Fase 0.2) de forma activa (se mantendrán desactivadas hasta definir keys definitivas).

### Criterios de Éxito
* [ ] Al registrar un nuevo usuario administrador, se crea automáticamente un restaurante en la ruta `/restaurants/{restaurantId}` con su configuración inicial y se le asocia como miembro `admin`.
* [ ] El sistema envía un correo de verificación y redirige al usuario a una pantalla/mensaje que indica que debe verificar su cuenta para iniciar sesión.
* [ ] Un usuario no verificado no puede loguearse con éxito y acceder al panel de la aplicación.
* [ ] Los camareros y administradores de un restaurante solo pueden leer y escribir datos bajo `/restaurants/{restaurantId}/`.
* [ ] El compilador de TypeScript (`npm run build`) no produce errores en ningún archivo tras las modificaciones.
