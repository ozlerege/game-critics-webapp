import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyB9UvWj-259JYO6JGgBTTzbuuCnkYpMhco",
  authDomain: "game-critics-webapp.firebaseapp.com",
  projectId: "game-critics-webapp",
  storageBucket: "game-critics-webapp.appspot.com",
  messagingSenderId: "549397443474",
  appId: "1:549397443474:web:4ac7e79227e8aced03874b",
});

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
