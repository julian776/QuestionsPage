import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";


firebase.initializeApp({
    apiKey: "AIzaSyB0-FADN10loCUlp2xV7Xw2QGne5XsWpfc",
    authDomain: "questions-fcd8c.firebaseapp.com",
    projectId: "questions-fcd8c",
    storageBucket: "questions-fcd8c.appspot.com",
    messagingSenderId: "249502199556",
    appId: "1:249502199556:web:919c403f5d3bb012b9aa51"
});

export const auth = firebase.auth();

export const createUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
}

export const signInUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
}