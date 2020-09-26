import { SongId, StoreState, Song } from '../../state/types';
import { db } from '../firebase';
import { useUser } from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong as updateReduxSong } from '../../state/actions';

export const useSong = (songId: SongId) => {
  const dispatch = useDispatch();

  const [user] = useUser();
  const currentSong = useSelector((state: StoreState) =>
    state.songs.find((thesong) => thesong.id === songId)
  );

  const updateSong = function (song: Song) {
    const songsRef = db.collection(`users/${user.uid}/songs`);
    dispatch(updateReduxSong(song));
    return songsRef.doc(songId).set(song);
  };

  return [currentSong, updateSong];
};
