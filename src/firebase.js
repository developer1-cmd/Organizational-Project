import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBV3WLOnaM9bojtNrDzrACP8Bcsks9BZI8",
    authDomain: "cc-hrms.firebaseapp.com",
    projectId: "cc-hrms",
    storageBucket: "cc-hrms.firebasestorage.app",
    messagingSenderId: "986440376118",
    appId: "1:986440376118:web:33d7493baf507385775d97",
    measurementId: "G-EQFQ6P30J1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
