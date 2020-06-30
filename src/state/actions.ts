import {
  SongId,
  AddNote,
  UpdateNote,
  DeleteNote,
  UpdateSongTitle,
  CreateSong,
  SetlistId,
  DeleteSong,
  UpdateSetlistTitle,
  CreateSetlist,
  DeleteSetlist,
  AddSongToSetlist,
  SearchState,
  SetSearchState,
  RemoveSong,
} from './types';
import {
  playSequence as playPianoSequnece,
  playNote as playPianoNote,
} from '../sound/synth';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

// Notes

export const addNote = (note: string, songId: SongId): AddNote => ({
  type: 'ADD_NOTE',
  note,
  songId,
});
export const updateNote = (
  note: string,
  index: number,
  songId: SongId
): UpdateNote => ({ type: 'UPDATE_NOTE', index, note, songId });
export const deleteNote = (index: number, songId: SongId): DeleteNote => ({
  type: 'DELETE_NOTE',
  index,
  songId,
});

//Song
export const updateSongTitle = (
  title: string,
  songId: SongId
): UpdateSongTitle => ({ type: 'UPDATE_SONG_TITLE', title, songId });
export const createSong = (title: string, setlist?: SetlistId): CreateSong => ({
  type: 'CREATE_SONG',
  id: encodeURI(title),
  setlist: setlist ? encodeURI(setlist) : undefined,
  title,
});

//Songs
export const deleteSong = (id: SongId): DeleteSong => ({
  type: 'DELETE_SONG',
  id,
});

//Setlist
export const updateSetlistTitle = (title: string): UpdateSetlistTitle => ({
  type: 'UPDATE_SETLIST_TITLE',
  title,
});
export const addSongToSetlist = (
  song: SongId,
  setlist: SetlistId
): AddSongToSetlist => ({ type: 'ADD_SONG_TO_SETLIST', setlist, song });
export const removeSongFromSetlist = (
  setlist: SetlistId,
  index: number
): RemoveSong => ({ type: 'REMOVE_SONG', setlist, index });

//Setlists
export const createSetlist = (title: string): CreateSetlist => ({
  type: 'CREATE_SETLIST',
  title,
  id: encodeURIComponent(title),
});
export const deleteSetlist = (id: SetlistId): DeleteSetlist => ({
  type: 'DELETE_SETLIST',
  id,
});

//Search
export const setSearch = (state: SearchState): SetSearchState => {
  switch (state) {
    case 'all':
      return { type: 'SEARCH_ALL' };
    case 'setlist':
      return { type: 'SEARCH_SETLISTS' };
    case 'song':
      return { type: 'SEARCH_SONGS' };
    case false:
    default:
      return { type: 'SEARCH_NONE' };
  }
};

// Play note

export const playSequence = (
  notes: string[]
): ThunkAction<any, {}, {}, AnyAction> => {
  return (dispatch) => {
    let i = 0;
    playPianoSequnece(notes, function (note, duration) {
      dispatch(playNote(note, duration));
      if (i === 0) {
        setTimeout(() => {
          dispatch(stopPlaying());
        }, duration * notes.length * 1000);
      }
      i++;
    });
  };
};

export const playSingleNote = (
  note: string
): ThunkAction<any, {}, {}, AnyAction> => {
  return (dispatch) => {
    dispatch(playNote(note, 0.5));
    playPianoNote(note);
    setTimeout(() => {
      return dispatch(stopPlaying());
    }, 500);
  };
};

const playNote = (note: string, duration: number) => {
  return { type: 'PLAY_NOTE', note, duration };
};
export const stopPlaying = () => ({ type: 'STOP_NOTE' });
