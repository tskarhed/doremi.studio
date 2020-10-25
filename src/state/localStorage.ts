import { StoreState, Setlist, Song } from './types';
import { auth, db } from '../firebase/firebase';
import { setlistsConverter, songsConverter } from '../firebase/converters';

export const loadState = async () => {
  // try {
  //   const serializedState = localStorage.getItem('redux-state');
  //   console.log(serializedState);
  //   if (serializedState === null) {
  //     return undefined;
  //   }
  //   return JSON.parse(serializedState);
  // } catch (err) {
  //   return undefined;
  // }
  const user = auth.currentUser;
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

    return { songs, setlists };
  }
};

export const saveState = (state: Partial<StoreState>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('redux-state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
