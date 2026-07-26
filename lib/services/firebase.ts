import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4d_2yyq55JJC_1t2qmzrH-sVCCv7xnlI",
    authDomain: "sentinel-ai-350a9.firebaseapp.com",
    projectId: "sentinel-ai-350a9",
    storageBucket: "sentinel-ai-350a9.firebasestorage.app",
    messagingSenderId: "1035401223845",
    appId: "1:1035401223845:web:b288aacf77ed883e2c774c",
};

export const app =
    getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);