// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMGqsmk1gOLC-fourI6iUdfLJPcMXpfmQ",
  authDomain: "vite-366415.firebaseapp.com",
  projectId: "vite-366415",
  storageBucket: "vite-366415.appspot.com",
  messagingSenderId: "72358070140",
  appId: "1:72358070140:web:f8abd632dda4f8cec386f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app