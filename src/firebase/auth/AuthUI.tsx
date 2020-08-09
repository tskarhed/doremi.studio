import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const firebaseAuthConfig = {
  apiKey: 'TOTAL_SECRET',
  authDomain: 'EVEN_MORE_SECRET',
};

firebase.initializeApp(firebaseAuthConfig);
