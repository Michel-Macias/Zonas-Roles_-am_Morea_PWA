import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { showAdminPanel, hideAdminPanel } from './ui';

function getUserEmail(username: string): string {
    return `${username}@nam-zonas.local`;
}

export function initAuth() {
    // Escucha en tiempo real el estado de autenticación de Firebase
    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
            const username = firebaseUser.email.split('@')[0];
            showAdminPanel(username);
        } else {
            hideAdminPanel();
        }
    });

    const btnLogin = document.getElementById('btn-login') as HTMLButtonElement;
    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const userInput = document.getElementById('login-user') as HTMLSelectElement;
            const passInput = document.getElementById('login-pass') as HTMLInputElement;
            const errorDiv = document.getElementById('login-error') as HTMLDivElement;
            
            const user = userInput.value;
            const pass = passInput.value.trim();
            
            if (!pass) {
                errorDiv.textContent = "Introduce una contraseña.";
                errorDiv.style.display = 'block';
                return;
            }
            if (pass.length < 6) {
                errorDiv.textContent = "La contraseña debe tener al menos 6 caracteres.";
                errorDiv.style.display = 'block';
                return;
            }
            
            const email = getUserEmail(user);
            btnLogin.textContent = "Comprobando...";
            btnLogin.disabled = true;
            errorDiv.style.display = 'none';

            try {
                // Intentar iniciar sesión
                await signInWithEmailAndPassword(auth, email, pass);
            } catch (error: any) {
                // Manejar registro automático seguro en el primer inicio de sesión
                if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                    try {
                        await createUserWithEmailAndPassword(auth, email, pass);
                    } catch (createError: any) {
                        console.error("Error al registrar encargado", createError);
                        if (createError.code === 'auth/email-already-in-use') {
                            errorDiv.textContent = "Contraseña incorrecta.";
                        } else {
                            errorDiv.textContent = "Error de autenticación.";
                        }
                        errorDiv.style.display = 'block';
                    }
                } else if (error.code === 'auth/wrong-password') {
                    errorDiv.textContent = "Contraseña incorrecta.";
                    errorDiv.style.display = 'block';
                } else {
                    console.error("Error de conexión con Firebase Auth", error);
                    errorDiv.textContent = "Error de conexión.";
                    errorDiv.style.display = 'block';
                }
            } finally {
                btnLogin.textContent = "Entrar al Panel";
                btnLogin.disabled = false;
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
