import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB5JeN7uC2HYiGrw6HCpnZJVxMtjp6U0aw",
    authDomain: "psychologist-app-aa93b.firebaseapp.com",
    databaseURL: "https://psychologist-app-aa93b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "psychologist-app-aa93b",
    storageBucket: "psychologist-app-aa93b.firebasestorage.app",
    messagingSenderId: "991792717341",
    appId: "1:991792717341:web:31677887fa00689f2cb0f4",
};

export const app = initializeApp(firebaseConfig);;

export const auth = getAuth(app);
export const db = getDatabase(app);