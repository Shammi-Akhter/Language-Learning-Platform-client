
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu_7M7yO1dlNqdyA-ciyOM3n_ouvvJMVI",
  authDomain: "language-exchange-app-dde7b.firebaseapp.com",
  projectId: "language-exchange-app-dde7b",
  storageBucket: "language-exchange-app-dde7b.firebasestorage.app",
  messagingSenderId: "854985752819",
  appId: "1:854985752819:web:05e0e6b7a02a8202a1b786"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
