import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCF4cWMmuiaF7Y0m-noymVzs6U5yb4bJtg",
    authDomain: "velaro-watches.firebaseapp.com",
    projectId: "velaro-watches",
    storageBucket: "velaro-watches.firebasestorage.app",
    messagingSenderId: "881515673274",
    appId: "1:881515673274:web:531c5e0d0d4fb46040f483",
    measurementId: "G-CQJT3V9RZE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);