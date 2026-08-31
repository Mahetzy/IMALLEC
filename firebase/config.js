// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD1uzmUl31O30130LIsaJO2T9tmMi-ZW4o",
    authDomain: "imallec.firebaseapp.com",
    projectId: "imallec",
    storageBucket: "imallec.firebasestorage.app",
    messagingSenderId: "754000345577",
    appId: "1:754000345577:web:73a1b9078a1d92fe907378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 