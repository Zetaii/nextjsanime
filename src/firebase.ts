import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Importing firebase from the compat namespace
import firebase from "firebase/compat/app"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if Firebase app has been initialized before initializing
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize authentication
const auth = getAuth(app)

export { auth, app } // Exporting both auth and firebaseApp
export default firebase
