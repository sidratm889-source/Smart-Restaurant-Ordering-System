import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ-2QUIyfKToTlwaXrLiIwoJgNAGkF7a0",
  authDomain: "restuarant-management-bc78b.firebaseapp.com",
  projectId: "restuarant-management-bc78b",
  storageBucket: "restuarant-management-bc78b.firebasestorage.app",
  messagingSenderId: "815926034550",
  appId: "1:815926034550:web:0912231585821b38181f57",
  measurementId: "G-R8QJ6B31ZK"
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = initializeFirestore(app, {
  // Some environments block Firestore's default transport, causing backend timeout warnings.
  experimentalAutoDetectLongPolling: true,
});
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, analytics, db };