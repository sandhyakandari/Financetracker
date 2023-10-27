// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy9509OgUoASjM6fLC_MSwubbNBRf7T-U",
  authDomain: "personalfinacetracker-15843.firebaseapp.com",
  projectId: "personalfinacetracker-15843",
  storageBucket: "personalfinacetracker-15843.appspot.com",
  messagingSenderId: "550763894818",
  appId: "1:550763894818:web:7ca6b5207f41526eee127b",
  measurementId: "G-BE4TNRRDWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth();
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};