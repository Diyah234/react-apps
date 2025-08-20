"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCYnvDecejflIPrHzI2NV4-cvVaEvI6H7o",
  authDomain: "chatapp-7049f.firebaseapp.com",
  projectId: "chatapp-7049f",
  storageBucket: "chatapp-7049f.firebasestorage.app",
  messagingSenderId: "195085917095",
  appId: "1:195085917095:web:49e01d6d57803ea8aa7482",
  measurementId: "G-70TV1S5GVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);