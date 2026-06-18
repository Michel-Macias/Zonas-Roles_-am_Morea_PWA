import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Credenciales de Firebase de producción (Proyecto Original: nam-zonas)
const firebaseConfig = {
  apiKey: "AIzaSyArHwZMlyz71o24VIj5yZlPxgswGpKJkVA",
  authDomain: "nam-zonas.firebaseapp.com",
  databaseURL: "https://nam-zonas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nam-zonas",
  storageBucket: "nam-zonas.firebasestorage.app",
  messagingSenderId: "491108708871",
  appId: "1:491108708871:web:1e275d78ac0d25de8330a2"
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
