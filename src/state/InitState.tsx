import React from 'react';

import { useEffect } from 'react';
import { useUser } from '../firebase/hooks/useUser';
import { useDispatch } from 'react-redux';
import { songsConverter, setlistsConverter } from '../firebase/converters';
import { db } from '../firebase/firebase';

export const InitState = () => {
  const dispatch = useDispatch();
  const [user] = useUser();
  useEffect(() => {
    async function fetchInitState() {
      if (user) {
        const sourceOptions = {
          source: 'cache',
        } as any;
        const songsQuery = await db
          .collection(`users/${user.uid}/songs`)
          .withConverter(songsConverter)
          .get(sourceOptions);
        const setlistsQuery = await db
          .collection(`users/${user.uid}/setlists`)
          .withConverter(setlistsConverter)
          .get(sourceOptions);

        const songs = songsQuery.docs.map((doc) => doc.data());
        const setlists = setlistsQuery.docs.map((doc) => doc.data());

        console.log(songs);
        console.log(setlists);

        dispatch({ type: 'SET_INIT_STATE', payload: { songs, setlists } });
      }
    }
    fetchInitState();
  });
  return <></>;
};
