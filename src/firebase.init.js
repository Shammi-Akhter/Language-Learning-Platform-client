
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqtC_OsipjXwv_v6BUsBacy8vrcC579Js",
  authDomain: "secjaf-tutor-booking-platform.firebaseapp.com",
  projectId: "secjaf-tutor-booking-platform",
  storageBucket: "secjaf-tutor-booking-platform.firebasestorage.app",
  messagingSenderId: "909259037099",
  appId: "1:909259037099:web:c409ab4d2598504ac1daee"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);