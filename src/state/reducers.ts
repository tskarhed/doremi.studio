import {
  SetlistAction,
  Setlist,
  Song,
  SongAction,
  SongsAction,
  SetlistsAction,
  SearchState,
  SetSearchState,
  PlayActionState,
  UserAction,
} from './types';
import { combineReducers } from 'redux';

export const song = (prevState: Song, action: SongAction) => {
  if (action.type === 'UPDATE_SONG') {
    return action.song;
  }
  return prevState;
};

export const setlist = (prevState: Setlist, action: SetlistAction) => {
  if (action.type === 'UPDATE_SETLIST') {
    return action.payload;
  }

  return prevState;
};

export const songs = (prevState: Song[] = [], action: SongsAction) => {
  if (action.type === 'SET_INIT_STATE') {
    return action.payload.songs;
  }
  if (action.type === 'RESET_LISTS') {
    return [];
  }

  if (action.type === 'DELETE_SONG') {
    return prevState.filter((listItem) => listItem.shortUID !== action.id);
  }
  if (action.type === 'ADD_SONG') {
    return [...prevState, action.payload];
  }
  console.log(prevState);
  return prevState.map((listItem) => {
    return action.songId === listItem.shortUID
      ? song(listItem, action)
      : listItem;
  });
};

export const setlists = (prevState: Setlist[] = [], action: SetlistsAction) => {
  if (action.type === 'SET_INIT_STATE') {
    return action.payload.setlists;
  }
  if (action.type === 'RESET_LISTS') {
    return [];
  }

  if (action.type === 'DELETE_SETLIST') {
    return prevState.filter((list) => list.shortUID !== action.id);
  }

  if (action.type === 'ADD_SETLIST') {
    return [...prevState, action.payload];
  }

  return prevState.map((list) => {
    return action.setlist === list.shortUID ? setlist(list, action) : list;
  });
};

export const isSearching = (
  prevState: SearchState = false,
  action: SetSearchState
) => {
  if (action.type === 'SEARCH_ALL') {
    return 'all';
  }
  if (action.type === 'SEARCH_SETLISTS') {
    return 'setlist';
  }
  if (action.type === 'SEARCH_SONGS') {
    return 'song';
  }

  if (action.type === 'SEARCH_NONE') {
    return false;
  }
  return prevState;
};

export const playingNote = (prevState = {}, action: PlayActionState) => {
  if (action.type === 'PLAY_NOTE') {
    return { note: action.note, duration: action.duration };
  }

  if (action.type === 'STOP_NOTE') {
    return {};
  }

  return prevState;
};

const user = (prevState = null, action: UserAction) => {
  if (action.type === 'UPDATE_USER') {
    return action.payload;
  }
  return prevState;
};

export default combineReducers({
  user,
  setlists,
  songs,
  isSearching,
  playingNote,
});
