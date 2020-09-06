import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui';


const firebaseAuthConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_AUTH_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "setlist-4d7a0",
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    appID: process.env.REACT_APP_ID
};


export const firebaseApp = firebase.initializeApp(firebaseAuthConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (_authResult: any, _redirectUrl: any) => false,
    }
  };


export { auth, db, uiConfig};