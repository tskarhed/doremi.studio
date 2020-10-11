import { Song, Setlist } from '../state/types';
import { UserInfo } from 'firebase';

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
type SongOrSetlist = Song | Setlist;
export const songOrSetlistConverter = {
  toFirestore(clientObject: SongOrSetlist) {
    return clientObject;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const item = snapshot.data() as SongOrSetlist;
    item.uid = snapshot.id;
    return item;
  },
};

export const setlistsConverter = createConverter<Setlist[]>();
export const songsConverter = createConverter<Song[]>();
export const userConverter = createConverter<UserInfo>();
