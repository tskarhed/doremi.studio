import { useSetlist } from './useSetlist';
import { SetlistId, SongId } from '../../state/types';

export const useAddSongToSetlist = (setlistId: SetlistId) => {
  const [setlist, updateSetlist] = useSetlist(setlistId);

  if (!setlist || !updateSetlist) {
    console.log('Setlist hook returned null values');
    return () => {};
  }
  const addSong = (songId: SongId) => {
    let updatedSetlist = setlist;

    updatedSetlist.songs.push(songId);

    updateSetlist(updatedSetlist);
  };

  return addSong;
};
