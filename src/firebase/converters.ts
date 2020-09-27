import { Song, Setlist } from '../state/types';

interface Converter<T> {
  toFirestore(clientObject: T): T;
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): T;
}

const createConverter = <T>() => {
  return {
    toFirestore(clientObject: T) {
      return { ...clientObject };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ) {
      return snapshot.data(options) as T;
    },
  };
};

export const setlistsConverter = createConverter<Setlist[]>();
export const songsConverter = createConverter<Song[]>();
