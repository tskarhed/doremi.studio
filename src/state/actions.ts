import {
  SongId,
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
  Song,
  UpdateSong,
  UpdateSetlist,
  Setlist,
  AddSong,
} from './types';
import {
  playSequence as playPianoSequnece,
  playNote as playPianoNote,
} from '../sound/synth';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

//Song
export const createSong = (song: Song): CreateSong => ({
  type: 'CREATE_SONG',
  payload: song,
});

export const updateSong = (song: Song): UpdateSong => ({
  type: 'UPDATE_SONG',
  songId: song.shortUID,
  song,
});

//Songs
export const deleteSong = (id: SongId): DeleteSong => ({
  type: 'DELETE_SONG',
  id,
});

export const addSong = (song: Song): AddSong => ({
  type: 'ADD_SONG',
  payload: song,
});

//Setlist
export const updateSetlistTitle = (
  title: string,
  setlist: SetlistId
): UpdateSetlistTitle => ({
  type: 'UPDATE_SETLIST_TITLE',
  title,
  setlist,
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

export const updateSetlist = (setlist: Setlist): UpdateSetlist => ({
  type: 'UPDATE_SETLIST',
  id: setlist.id,
  setlist,
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
