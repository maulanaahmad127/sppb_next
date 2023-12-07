// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoZGGBdCgurVBmP9p8HpediWu7jg8yAB4",
  authDomain: "sppb-rtdb.firebaseapp.com",
  databaseURL: "https://sppb-rtdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sppb-rtdb",
  storageBucket: "sppb-rtdb.appspot.com",
  messagingSenderId: "838012911527",
  appId: "1:838012911527:web:8cdb2bf04232a136a60082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);