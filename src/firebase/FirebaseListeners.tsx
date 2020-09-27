import React, { useEffect, useState } from 'react';
import { db, firebaseApp } from './firebase';
import { useUser } from './hooks/useUser';

/**
 *  Responsible for registering and unregistering Firestore event listeners
 */
export const FirebaseListeners = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useUser();

  useEffect(() => {
    const unsubAuth = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
      } else {
        setUser(null);
        setUserId('');
      }
    });

    const unsubUser = db
      .collection('users')
      .doc(userId)
      .onSnapshot({}, (userDoc) => {});
    // Unregister
    return () => {
      unsubAuth();
      unsubUser();
    };
  }, [userId]);
  return <></>;
};
