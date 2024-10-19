import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyWuZTASlALQRmpeZPsj40D5-PE5CXjsQ",
  authDomain: "sturdy-octo-train.firebaseapp.com",
  projectId: "sturdy-octo-train",
  storageBucket: "sturdy-octo-train.appspot.com",
  messagingSenderId: "549201998520",
  appId: "1:549201998520:web:9b4e7b7db29bc321d47a4d",
  measurementId: "G-EH4RR514PH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;