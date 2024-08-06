// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTE7tfdhag_mVy7h9L17yGfGygpN_il8w",
  authDomain: "imageglobe-78b49.firebaseapp.com",
  projectId: "imageglobe-78b49",
  storageBucket: "imageglobe-78b49.appspot.com",
  messagingSenderId: "1005504725500",
  appId: "1:1005504725500:web:5068f66266a48cf4cc7279",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
