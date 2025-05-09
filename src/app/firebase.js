// src/app/firebase.js

import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID + ".firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID + ".appspot.com", // corrigido .app
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// ✅ Forma correta para Expo (sem getReactNativePersistence)
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth, createUserWithEmailAndPassword, db, sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
};
