import { StoreState } from './types';
import { auth, db } from '../firebase/firebase';

export const loadState = () => {
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
    const songs = db.collection(`users/${user.uid}/songs`).get(sourceOptions);
    const setlists = db
      .collection(`users/${user.uid}/setlists`)
      .get(sourceOptions);
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
