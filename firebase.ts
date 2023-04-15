import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cofixgpt.firebaseapp.com",
  projectId: "cofixgpt",
  storageBucket: "cofixgpt.appspot.com",
  messagingSenderId: "115850295824",
  appId: "1:115850295824:web:802b13d96af55a8116e895",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
