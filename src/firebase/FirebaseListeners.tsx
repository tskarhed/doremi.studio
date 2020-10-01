import React, { useEffect } from 'react';
import { db, firebaseApp } from './firebase';
import { useUser } from './hooks/useUser';

/**
 *  Responsible for registering and unregistering Firestore event listeners
 */
export const FirebaseListeners = () => {
  const [, setUser] = useUser();

  useEffect(() => {
    let unsubUser = () => {};

    // Handle auth changes
    const unsubAuth = firebaseApp.auth().onAuthStateChanged((changedUser) => {
      console.log('AUTH STATE CHANGED');

      // Handle if logged in
      if (changedUser && changedUser.uid) {
        unsubUser = db
          .collection('users')
          .doc(changedUser.uid)
          .onSnapshot({}, (userDoc) => {
            // userDoc is from Firestore and changedUsed is from Firebase Auth
            // const {} = userDoc.data() as UserInfo;
            // fetch shortUID form here

            const {
              email,
              photoURL,
              displayName,
              phoneNumber,
              providerId,
              uid,
            } = changedUser;

            setUser({
              email,
              uid,
              photoURL,
              displayName,
              phoneNumber,
              providerId,
            });
          });
      } else {
        setUser(null);
        // setUserId('');
      }
    });

    // Unregister
    return () => {
      unsubAuth();
      unsubUser();
    };

    // https://stackoverflow.com/questions/61459287/calling-dispatch-in-useeffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
