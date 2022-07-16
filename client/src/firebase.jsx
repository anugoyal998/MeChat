// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCot71SC64V07cSnoXtTvUx1c61L4L54lU",
  authDomain: "mechat-50110.firebaseapp.com",
  projectId: "mechat-50110",
  storageBucket: "mechat-50110.appspot.com",
  messagingSenderId: "155776139179",
  appId: "1:155776139179:web:7f1ec7d26f30acec9f9cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app