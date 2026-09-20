import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDlBrYFMr4kRWVK0wMOY6KAAoICt_puOvU",
  authDomain: "solid-state-chemistry.firebaseapp.com",
  projectId: "solid-state-chemistry",
  storageBucket: "solid-state-chemistry.firebasestorage.app",
  messagingSenderId: "340742230762",
  appId: "1:340742230762:web:f22cc4c9c9b116c5f33d93",
  measurementId: "G-KW09ZHYKVJ",
  databaseURL: "https://solid-state-chemistry-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Read-only: Disabled content mutation to prevent tampering
export const saveContentToDB = async () => {
  // Mutation disabled in production
};
