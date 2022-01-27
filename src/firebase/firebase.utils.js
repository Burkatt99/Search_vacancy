import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBVaDgYLY4W0tM0AeBMNjva-9c8XIYzpns",
    authDomain: "crwn-db-986c0.firebaseapp.com",
    projectId: "crwn-db-986c0",
    storageBucket: "crwn-db-986c0.appspot.com",
    messagingSenderId: "534985033649",
    appId: "1:534985033649:web:b067ff4f8abf530405df90"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
 
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>  auth.signInWithPopup(provider);

export default firebase;