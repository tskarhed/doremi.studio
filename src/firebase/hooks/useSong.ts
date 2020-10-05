import { SongId, StoreState, Song } from '../../state/types';
import { db } from '../firebase';
import { useUser } from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong as updateReduxSong } from '../../state/actions';

export const useSong = (songId?: SongId) => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const currentSong = useSelector((state: StoreState) =>
    state.songs.find((thesong) => thesong.shortUID === songId)
  );

  if (!currentSong) {
    return [null, null];
  }

  const updateSong = function (song: Song) {
    console.log(song);
    if (!user) {
      return [null, null];
    }
    const songsRef = db.collection(`users/${user.uid}/songs`);
    dispatch(updateReduxSong(song));
    songsRef.doc(songId).set(song);
  };

  return [currentSong, updateSong] as const;
};
