import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

// Simple helper to save text content to DB
export const saveContentToDB = async (contentKey: string, lang: 'en' | 'bn', text: string) => {
  const contentRef = ref(db, `content/${contentKey}/${lang}`);
  await set(contentRef, text);
};
