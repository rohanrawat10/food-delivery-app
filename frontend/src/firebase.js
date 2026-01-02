// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hungerstrike-2b7da.firebaseapp.com",
  projectId: "hungerstrike-2b7da",
  storageBucket: "hungerstrike-2b7da.appspot.com",
  messagingSenderId: "73778857572",
  appId: "1:73778857572:web:0dcc953c9acafcbc6f4171",
  measurementId: "G-WFTBQSCTNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth};