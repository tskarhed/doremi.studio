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
  /** Deprecated */
  id: string;
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
  id: SetlistId;
  title: string;
  songs: SongId[];
}

// Song interfaces and types
interface NoteActions {
  songId: SongId;
}

interface SetlistActions {
  setlist?: SetlistId;
}

export interface AddNote extends NoteActions {
  type: 'ADD_NOTE';
  note: string;
}

export interface UpdateNote extends NoteActions {
  type: 'UPDATE_NOTE';
  index: number;
  note: string;
}

export interface DeleteNote extends NoteActions {
  type: 'DELETE_NOTE';
  index: number;
}

export interface UpdateSongTitle extends NoteActions {
  type: 'UPDATE_SONG_TITLE';
  title: string;
}

export interface UpdateSongLyrics extends NoteActions {
  type: 'UPDATE_SONG_LYRICS';
  lyrics: string;
}

export interface UpdateSong {
  type: 'UPDATE_SONG';
  songId: SongId;
  song: Song;
}

// Setlist interfaces and types

export interface UpdateSetlist {
  type: 'UPDATE_SETLIST';
  id: SetlistId;
  setlist: Setlist;
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

export interface CreateSong extends SetlistActions {
  type: 'CREATE_SONG';
  id: SongId;
  title: string;
  /**
   *  If the song was created from a setlist we want to assign it directly
   */
  setlist?: SetlistId;
}

export interface UpdateSetlistTitle extends SetlistActions {
  type: 'UPDATE_SETLIST_TITLE';
  title: string;
}

export interface CreateSetlist {
  type: 'CREATE_SETLIST';
  id: SetlistId;
  title: string;
}

export interface DeleteSetlist {
  type: 'DELETE_SETLIST';
  id: SetlistId;
}

export type NotesAction = AddNote | UpdateNote | DeleteNote;
interface ResetLists {
  type: 'RESET_LISTS';
}

export type SongAction =
  | UpdateSongTitle
  | NotesAction
  | CreateSong
  | UpdateSongLyrics
  | UpdateSong;
export type SongsAction = DeleteSong | SongAction | ResetLists;

export type SetlistAction =
  | CreateSong
  | AddSongToSetlist
  | RemoveSong
  | UpdateSetlistTitle
  | CreateSetlist
  | UpdateSetlist;
export type SetlistsAction = DeleteSetlist | SetlistAction | ResetLists;

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
