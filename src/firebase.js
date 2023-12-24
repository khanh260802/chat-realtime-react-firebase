import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_3C744l7tC8tRPF8fUD4e7eUhjDcBCko",
  authDomain: "khanh-hoc-code.firebaseapp.com",
  projectId: "khanh-hoc-code",
  storageBucket: "khanh-hoc-code.appspot.com",
  messagingSenderId: "413859531885",
  appId: "1:413859531885:web:1e368197c7ad21d0d38364",
  measurementId: "G-FB0SMZ3X2R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const storage = getStorage();
export const db = getFirestore(app); 