// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh9LcUh-4eJeOVBg5SSs3KQSQBfH7Nz2k",
  authDomain: "imallec-bd.firebaseapp.com",
  projectId: "imallec-bd",
  storageBucket: "imallec-bd.firebasestorage.app",
  messagingSenderId: "836595012334",
  appId: "1:836595012334:web:b055446e6e7e020fe0d9ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
 

 