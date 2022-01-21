import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,signOut   } from "firebase/auth";
import { getDatabase, ref, set,push,onValue,child,onChildAdded,onChildChanged,onDisconnect, onChildRemoved,remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZbNr31ZCaoGJArfJSJgV4x4OmAc6-oU8",
  authDomain: "final-chatting-44a21.firebaseapp.com",
  databaseURL: "https://final-chatting-44a21-default-rtdb.firebaseio.com",
  projectId: "final-chatting-44a21",
  storageBucket: "final-chatting-44a21.appspot.com",
  messagingSenderId: "63616464639",
  appId: "1:63616464639:web:9e9cedb22818aa273f7eca"
};


const app = initializeApp(firebaseConfig);

export {getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set,signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,signOut,push,onValue,child,onChildAdded,onChildChanged,onDisconnect,onChildRemoved,remove}
