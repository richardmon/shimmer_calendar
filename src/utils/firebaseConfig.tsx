// Import the functions you need from the SDKs you need

import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCzyvc2RbJDJ9nxRNOGnC6PjHfnSMy1jyw",

  authDomain: "shimmer-calendar.firebaseapp.com",

  projectId: "shimmer-calendar",

  storageBucket: "shimmer-calendar.appspot.com",

  messagingSenderId: "480839663062",

  appId: "1:480839663062:web:1151f2ef38220ac99eb877",

  measurementId: "G-9Y8FHMYPWH",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
