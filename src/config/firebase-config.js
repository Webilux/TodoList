// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaPppaRbYBaW4DLRMZbFbQA_MVikWaCY4",
  authDomain: "todo-r18.firebaseapp.com",
  projectId: "todo-r18",
  storageBucket: "todo-r18.appspot.com",
  messagingSenderId: "389508245512",
  appId: "1:389508245512:web:04cbe7e77bc4b233a4c9bd",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
