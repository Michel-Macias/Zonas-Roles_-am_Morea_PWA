import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, db } from './firebase';
import { showAdminPanel, hideAdminPanel } from './ui';
import { setRestaurantId } from './zones';

function generateRestaurantId(): string {
    return 'rest-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

export function initAuth() {
    // Escucha en tiempo real el estado de autenticación de Firebase
    onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
            // Verificar si el email está verificado
            if (!firebaseUser.emailVerified) {
                // Si entra aquí tras recargar pero no está verificado, forzar logout
                hideAdminPanel();
                return;
            }
            
            try {
                // Recuperar el restaurantId del usuario
                const userSnapshot = await get(ref(db, `users/${firebaseUser.uid}/restaurantId`));
                const restaurantId = userSnapshot.val();
                
                if (restaurantId) {
                    setRestaurantId(restaurantId);
                    
                    // Recuperar el nombre del restaurante para la UI
                    const configSnapshot = await get(ref(db, `restaurants/${restaurantId}/config/name`));
                    const restName = configSnapshot.val() || "Mi Restaurante";
                    
                    showAdminPanel(`${firebaseUser.email} (${restName})`);
                } else {
                    console.error("Usuario sin restaurante asignado.");
                    await signOut(auth);
                    hideAdminPanel();
                }
            } catch (err) {
                console.error("Error al obtener restaurante del usuario", err);
                await signOut(auth);
                hideAdminPanel();
            }
        } else {
            hideAdminPanel();
        }
    });

    const btnLogin = document.getElementById('btn-login') as HTMLButtonElement;
    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const emailInput = document.getElementById('login-email') as HTMLInputElement;
            const passInput = document.getElementById('login-pass') as HTMLInputElement;
            const errorDiv = document.getElementById('login-error') as HTMLDivElement;
            
            const email = emailInput.value.trim();
            const pass = passInput.value.trim();
            
            if (!email || !email.includes('@')) {
                errorDiv.style.color = 'var(--danger)';
                errorDiv.textContent = "Introduce un correo electrónico válido.";
                errorDiv.style.display = 'block';
                return;
            }
            if (!pass) {
                errorDiv.style.color = 'var(--danger)';
                errorDiv.textContent = "Introduce una contraseña.";
                errorDiv.style.display = 'block';
                return;
            }
            if (pass.length < 6) {
                errorDiv.style.color = 'var(--danger)';
                errorDiv.textContent = "La contraseña debe tener al menos 6 caracteres.";
                errorDiv.style.display = 'block';
                return;
            }
            
            btnLogin.textContent = "Comprobando...";
            btnLogin.disabled = true;
            errorDiv.style.display = 'none';
            errorDiv.style.color = 'var(--danger)';

            try {
                // Intentar iniciar sesión
                const userCredential = await signInWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;
                
                // Comprobar si el email está verificado
                if (!user.emailVerified) {
                    await signOut(auth);
                    errorDiv.style.color = 'var(--danger)';
                    errorDiv.textContent = "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.";
                    errorDiv.style.display = 'block';
                }
            } catch (error: any) {
                // Manejar registro automático seguro en el primer inicio de sesión
                if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                    try {
                        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                        const user = userCredential.user;
                        
                        // Generar ID único para el restaurante
                        const restaurantId = generateRestaurantId();
                        
                        // Crear registro de restaurante en la base de datos
                        await set(ref(db, `restaurants/${restaurantId}/config`), {
                            name: "Mi Restaurante",
                            createdAt: Date.now()
                        });
                        
                        await set(ref(db, `restaurants/${restaurantId}/members/${user.uid}`), {
                            role: "admin",
                            email: email
                        });
                        
                        await set(ref(db, `users/${user.uid}`), {
                            restaurantId: restaurantId
                        });
                        
                        // Enviar email de verificación
                        await sendEmailVerification(user);
                        
                        // Desloguear de inmediato para evitar que acceda sin verificar
                        await signOut(auth);
                        
                        errorDiv.style.color = '#166534'; // Verde éxito
                        errorDiv.textContent = `¡Cuenta creada! Te hemos enviado un correo de verificación a ${email}. Por favor, verifícalo antes de iniciar sesión.`;
                        errorDiv.style.display = 'block';
                    } catch (createError: any) {
                        console.error("Error al registrar encargado", createError);
                        if (createError.code === 'auth/email-already-in-use') {
                            errorDiv.style.color = 'var(--danger)';
                            errorDiv.textContent = "Contraseña incorrecta.";
                        } else {
                            errorDiv.style.color = 'var(--danger)';
                            errorDiv.textContent = "Error al crear la cuenta. Inténtalo de nuevo.";
                        }
                        errorDiv.style.display = 'block';
                    }
                } else if (error.code === 'auth/wrong-password') {
                    errorDiv.style.color = 'var(--danger)';
                    errorDiv.textContent = "Contraseña incorrecta.";
                    errorDiv.style.display = 'block';
                } else {
                    console.error("Error de conexión con Firebase Auth", error);
                    errorDiv.style.color = 'var(--danger)';
                    errorDiv.textContent = "Error de conexión.";
                    errorDiv.style.display = 'block';
                }
            } finally {
                btnLogin.textContent = "Entrar al Panel";
                btnLogin.disabled = false;
            }
        });
    }

    const btnForgot = document.getElementById('btn-forgot-password');
    if (btnForgot) {
        btnForgot.addEventListener('click', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email') as HTMLInputElement;
            const errorDiv = document.getElementById('login-error') as HTMLDivElement;
            const email = emailInput.value.trim();
            
            if (!email || !email.includes('@')) {
                errorDiv.style.color = 'var(--danger)';
                errorDiv.textContent = "Introduce tu correo electrónico arriba para poder restablecer la contraseña.";
                errorDiv.style.display = 'block';
                return;
            }
            
            try {
                await sendPasswordResetEmail(auth, email);
                errorDiv.style.color = '#166534'; // Verde éxito
                errorDiv.textContent = "Te hemos enviado un correo para restablecer la contraseña.";
                errorDiv.style.display = 'block';
                setTimeout(() => { errorDiv.style.color = 'var(--danger)'; }, 5000); // Volver al rojo
            } catch (error: any) {
                errorDiv.style.color = 'var(--danger)';
                errorDiv.textContent = "No pudimos enviar el correo de recuperación.";
                errorDiv.style.display = 'block';
                console.error("Reset pwd error", error);
            }
        });
    }

    document.getElementById('btn-logout')?.addEventListener('click', async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    });
}
