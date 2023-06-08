// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";   
import { getDatabase } from "firebase/database";


    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7VVEbqILRFAPDlAiW-F7UscPM3HusiIE",
  authDomain: "sanotimer.firebaseapp.com",
  databaseURL: "https://sanotimer-default-rtdb.firebaseio.com",
  projectId: "sanotimer",
  storageBucket: "sanotimer.appspot.com",
  messagingSenderId: "192272498392",
  appId: "1:192272498392:web:26a00b50bf928f4d06a1ad",
  measurementId: "G-RXRX3G22MM"
};
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db=getDatabase(app);

  export {db};
