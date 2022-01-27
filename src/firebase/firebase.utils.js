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
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  