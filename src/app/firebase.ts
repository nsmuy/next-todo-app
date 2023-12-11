// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeZPQoFjgwX3jBrSb_UnIMB3_DBqOxFmE",
  authDomain: "next-todo-app-33551.firebaseapp.com",
  projectId: "next-todo-app-33551",
  storageBucket: "next-todo-app-33551.appspot.com",
  messagingSenderId: "56843187015",
  appId: "1:56843187015:web:7db78ec1b8ac8226ca1262"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);