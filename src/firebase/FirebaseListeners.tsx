import React, { useEffect } from 'react';
import { db, firebaseApp } from './firebase';
import { useUser } from './hooks/useUser';
import { useDispatch } from 'react-redux';
import { songOrSetlistConverter } from './converters';

/**
 *  Responsible for registering and unregistering Firestore event listeners
 */
export const FirebaseListeners = () => {
  const [, setUser] = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubUser = () => {};
    let unsubSongs = () => {};
    let unsubSetlists = () => {};
    // Handle auth changes
    const unsubAuth = firebaseApp.auth().onAuthStateChanged((changedUser) => {
      console.log('AUTH STATE CHANGED');

      // Handle if logged in
      if (changedUser && changedUser.uid) {
        // Handling user updates
        unsubUser = db
          .collection('users')
          .doc(changedUser.uid)
          .onSnapshot({}, (userDoc) => {
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

        // Fetch entire list when on first auth, then attach listeners for changes
        // db.collection(`users/${changedUser.uid}/setlists`)
        //   .withConverter(songOrSetlistConverter)
        //   .get()
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) =>
        //       dispatch({ type: 'ADD_SETLIST', payload: doc.data() })
        //     );
        //   });
        // db.collection(`users/${changedUser.uid}/songs`)
        //   .withConverter(songOrSetlistConverter)
        //   .get()
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) =>
        //       dispatch({ type: 'ADD_SONG', payload: doc.data() })
        //     );
        //   });

        // Setlists listener
        unsubSetlists = db
          .collection(`users/${changedUser.uid}/setlists`)
          .withConverter(songOrSetlistConverter)
          .onSnapshot((setlistDoc) => {
            setlistDoc.forEach((doc) =>
              dispatch({
                type: 'UPDATE_SETLIST',
                // ShortUID is used for application state. general uid is used for Firebase
                setlist: doc.data().shortUID,
                payload: doc.data(),
              })
            );
          });

        unsubSetlists = db
          .collection(`users/${changedUser.uid}/songs`)
          .withConverter(songOrSetlistConverter)
          .onSnapshot((setlistDoc) => {
            setlistDoc.forEach((doc) => {
              console.log(doc.data());
              if (doc.data()) {
                dispatch({
                  type: 'UPDATE_SONG',
                  songId: doc.data().shortUID,
                  song: doc.data(),
                });
              }
            });
          });
      } else {
        setUser(null);
        // dispatch({ type: 'RESET_LISTS' });
      }
    });

    // Unregister
    return () => {
      unsubAuth();
      unsubUser();
      unsubSetlists();
      unsubSongs();
    };

    // https://stackoverflow.com/questions/61459287/calling-dispatch-in-useeffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
