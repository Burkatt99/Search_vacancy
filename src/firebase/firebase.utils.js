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
  
export const addCollectionAndDocuments = async (
  collectionKey, 
  objectsToAdd
  ) =>{
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });
  return await batch.commit()
};

export const getUserCartRef = async userId => {
  const cartsRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

 export const convertCollectionsSnapshotToMap = (collection) =>{
   const transformCollection = collection.docs.map( doc => {
     const { title, items } = doc.data();
    
     return {
       routeName: encodeURI(title.toLowerCase()),
       id: doc.id,
       title,
       items
     };
   });

 return transformCollection.reduce((accumulator, collection) =>{
   accumulator[collection.title.toLowerCase()] = collection;
   return accumulator; 
 }, {});
 };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
      const unsubscribe = auth.onAuthStateChanged(userAuth =>{
        unsubscribe();
        resolve(userAuth);
      }, reject)
    });
  }
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  
  export default firebase;
  