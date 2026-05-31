// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { initializeApp } from "firebase/app";

import {
    getFirestore,
} from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpnOo7iNsAU6nM09fzf_7g9Hh_6YoGdMc",
    authDomain: "expense-tracker-a8a06.firebaseapp.com",
    projectId: "expense-tracker-a8a06",
    storageBucket: "expense-tracker-a8a06.firebasestorage.app",
    messagingSenderId: "512112318369",
    appId: "1:512112318369:web:888230bbf10f222e871de0",
    measurementId: "G-EQYV1K5EZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);