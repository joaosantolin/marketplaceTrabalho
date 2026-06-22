// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXLYZxGQIw-DmIozOuTWBMSYoh7sX0MXA",
  authDomain: "appmarketplace-e89bb.firebaseapp.com",
  projectId: "appmarketplace-e89bb",
  storageBucket: "appmarketplace-e89bb.firebasestorage.app",
  messagingSenderId: "904941326832",
  appId: "1:904941326832:web:921146f285e127aa690d35",
  measurementId: "G-L74SRQ6ZDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);