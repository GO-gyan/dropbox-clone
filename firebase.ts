import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyBI_LPoNIqhKaimYatJKVJIm1STrCpVI5A",
    authDomain: "dropbox-demo.firebaseapp.com",
    projectId: "dropbox-demo",
    storageBucket: "dropbox-demo.appspot.com",
    messagingSenderId: "343220239668",
    appId: "1:343220239668:web:f0eb4040001a419acdb961",
    measurementId: "G-JYPMLMC6K6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
//   const auth = getAuth(app);
//   const functions = getFunctions(app);
export { db, storage };