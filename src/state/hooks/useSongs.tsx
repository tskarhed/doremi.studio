import { useSelector } from 'react-redux';
import { StoreState, SetlistId, Setlist, Song } from '../types';

/**
 *  Returns songs for a specific setlist. When give no setlistId, it returns all songs.
 */
export const useSongs = (setlistId?: SetlistId) => {
  const allSongs = useSelector<StoreState>((state) => state.songs) as Song[];

  const setlist = useSelector<StoreState>((state) =>
    state.setlists.find((setlist) => setlist.shortUID === setlistId)
  ) as Setlist;
  const songs = setlist.songs
    .map((songId) => allSongs.find((song) => song.shortUID === songId))
    .filter((song) => song !== undefined);

  if (!setlistId) {
    return allSongs;
  }

  if (!setlist) {
    return [];
  }

  return songs;
};
