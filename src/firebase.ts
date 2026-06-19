import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Credenciales de Firebase cargadas dinámicamente desde variables de entorno (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// 🛡️ Firebase App Check (protección anti-bot)
// INSTRUCCIONES: Para activar App Check:
// 1. Ve a https://console.firebase.google.com → tu proyecto → App Check
// 2. Registra tu app web con reCAPTCHA v3 (te dará una "Site Key")
// 3. Descomenta las 3 líneas siguientes y pega tu Site Key
//
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('TU_RECAPTCHA_SITE_KEY'),
//   isTokenAutoRefreshEnabled: true
// });
