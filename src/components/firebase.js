import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3lmnlisSALc7kTVCpJ8bPPfPXmm3vNqg",
  authDomain: "die-backpfeife.firebaseapp.com",
  projectId: "die-backpfeife",
  storageBucket: "die-backpfeife.appspot.com",
  messagingSenderId: "414956630451",
  appId: "1:414956630451:web:c24d2b4b59d101e022dbc6",
};

const app = firebase.initializeApp(firebaseConfig);

export const fullFireBase = app;
export const firestore = firebase.firestore(app);
export const imageDb = getStorage(app);
