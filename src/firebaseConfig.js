// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Si_LZIrRvX-NIdOpuqGlCo-wLyQ_9jg",
  authDomain: "apppizza3p2026.firebaseapp.com",
  projectId: "apppizza3p2026",
  storageBucket: "apppizza3p2026.firebasestorage.app",
  messagingSenderId: "807050394263",
  appId: "1:807050394263:web:99666cd12957253fd487d2",
  measurementId: "G-B1XBRSSN4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);