// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCPa0GJJNr9-FWt-elJp0mMD4VCqY5kpis",
  authDomain: "gps-tracker-b45c6.firebaseapp.com",
  databaseURL: "https://gps-tracker-b45c6-default-rtdb.firebaseio.com",
  projectId: "gps-tracker-b45c6",
  storageBucket: "gps-tracker-b45c6.appspot.com",
  messagingSenderId: "431670772842",
  appId: "1:431670772842:web:dd81d200793a736f9ab613",
  measurementId: "G-DBP2X53H1H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
