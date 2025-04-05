import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqDmL5BP8g9LrDUjw-Dfo7hfA_rU6MS_4",
    authDomain: "fir-crud-restapi-6a058.firebaseapp.com",
    databaseURL: "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-crud-restapi-6a058",
    storageBucket: "fir-crud-restapi-6a058.firebasestorage.app",
    messagingSenderId: "952715938645",
    appId: "1:952715938645:web:5ee0f1eb2970eaf30b7ddc"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);
