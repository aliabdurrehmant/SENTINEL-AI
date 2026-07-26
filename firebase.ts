import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4d_2yyq55JJC_1t2qmzrH-sVCCv7xnlI",
    authDomain: "sentinel-ai-350a9.firebaseapp.com",
    projectId: "sentinel-ai-350a9",
    storageBucket: "sentinel-ai-350a9.firebasestorage.app",
    messagingSenderId: "1035401223845",
    appId: "1:1035401223845:web:b288aacf77ed883e2c774c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);