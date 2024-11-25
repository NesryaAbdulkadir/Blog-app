// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyARCMcprQUZ8WdwEuxiedADkB1AMT_3Xzk",
  authDomain: "blogapp-e191e.firebaseapp.com",
  projectId: "blogapp-e191e",
  storageBucket: "blogapp-e191e.firebasestorage.app",
  messagingSenderId: "184658045795",
  appId: "1:184658045795:web:051136b792693105678156",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
