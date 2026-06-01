import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz8JtI71CJju2mMJKI3fkCh7xZ3lZZ-0c",
  authDomain: "veluerstore0.firebaseapp.com",
  projectId: "veluerstore0",
  storageBucket: "veluerstore0.firebasestorage.app",
  messagingSenderId: "876027146820",
  appId: "1:876027146820:web:bd47e1e2bd3e9b615cc211",
  measurementId: "G-NK4GEFKSBP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy };
