import { UserInfo } from 'firebase';

export type Notes = string[];
export type SongId = string;
export type SetlistId = string;

export interface StoreState {
  user: UserInfo | null;
  songs: Song[];
  setlists: Setlist[];
  isSearching: SearchState;
  playingNote: {
    note: string;
    duration: number;
  };
}

export interface Song {
  /**
   *  Only used by Firebase. DO NOT USE IN APP
   */
  uid: string;
  /**
   *  Used directly in app
   */
  shortUID: string;
  title: string;
  notes: Notes;
  lyrics?: string;
}

export interface Setlist {
  /**
   *  Only used by Firebase
   */
  uid: string;
  /**
   *  uid used by the app
   */
  shortUID: string;
  title: string;
  songs: SongId[];
}

// Song interfaces and types
export interface SetInitialStateAction {
  type: 'SET_INIT_STATE';
  payload: {
    songs: Song[];
    setlists: Setlist[];
  };
}
interface SetlistActions {
  setlist?: SetlistId;
}

export interface UpdateSong {
  type: 'UPDATE_SONG';
  songId: SongId;
  song: Song;
}

export interface AddSong {
  type: 'ADD_SONG';
  payload: Song;
}

// Setlist interfaces and types

export interface UpdateSetlist {
  type: 'UPDATE_SETLIST';
  setlist: SetlistId;
  payload: Setlist;
}
export interface AddSongToSetlist {
  type: 'ADD_SONG_TO_SETLIST';

  song: SongId;
  setlist: SetlistId;
}

export interface RemoveSong extends SetlistActions {
  type: 'REMOVE_SONG';
  index: number;
}

export interface DeleteSong {
  type: 'DELETE_SONG';
  id: SongId;
}

export interface DeleteSetlist {
  type: 'DELETE_SETLIST';
  id: SetlistId;
}

export interface AddSetlist {
  type: 'ADD_SETLIST';
  payload: Setlist;
}

interface ResetLists {
  type: 'RESET_LISTS';
}

export type SongAction = UpdateSong;
export type SongsAction =
  | DeleteSong
  | SongAction
  | ResetLists
  | AddSong
  | SetInitialStateAction;

export type SetlistAction = AddSongToSetlist | RemoveSong | UpdateSetlist;
export type SetlistsAction =
  | DeleteSetlist
  | SetlistAction
  | ResetLists
  | AddSetlist
  | SetInitialStateAction;

export type SearchStateType =
  | 'SEARCH_ALL'
  | 'SEARCH_SETLISTS'
  | 'SEARCH_SONGS'
  | 'SEARCH_NONE';

export interface SetSearchState {
  type: SearchStateType;
}

export type SearchState = 'all' | 'setlist' | 'song' | false;

// Playing notes

export interface PlayNote {
  type: 'PLAY_NOTE';
  note: string;
  duration: number;
}

export interface PlaySequence {
  notes: string[];
}

export interface StopNote {
  type: 'STOP_NOTE';
}

export type PlayActionType = 'STOP_NOTE' | 'PLAY_NOTE';
export type PlayActionState = PlayNote | StopNote;

export interface UserAction {
  type: 'UPDATE_USER';
  payload: UserInfo;
}
