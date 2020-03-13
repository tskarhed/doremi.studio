export type Notes = string[];
export type SongId = string;
export type SetlistId = string;

export interface StoreState{
  songs: Song[];
  setlists: Setlist[];
  isSearching: SearchState;
}

export interface Song {
  id: string;
  title: string;
  notes: Notes;
  inSetlists?: SetlistId[]
}

export interface Setlist {
  id: SetlistId;
  title: string;
  songs: SongId[];
}

// Song interfaces and types
export interface AddNote {
  type: "ADD_NOTE";
  note: string;
}

export interface UpdateNote {
  type: "UPDATE_NOTE";
  index: number;
  note: string;
}

export interface DeleteNote {
  type: "DELETE_NOTE";
  index: number;
}

export interface UpdateSongTitle {
  type: "UPDATE_SONG_TITLE";
  title: string;
}


// Setlist interfaces and types

export interface AddSongToSetlist {
  type: "ADD_SONG_TO_SETLIST";

  song: SongId;
  setlist: SetlistId;
}

export interface RemoveSong {
  type: "REMOVE_SONG";
  index: number;
}

export interface DeleteSong {
  type: "DELETE_SONG";
  id: SongId;
}

export interface CreateSong {
  type: "CREATE_SONG";
  id: SongId;
  /**
   *  If the song was created from a setlist we want to assign it directly
   */
  setlist?: SetlistId;
}


export interface UpdateSetlistTitle {
  type: "UPDATE_SETLIST_TITLE";
  title: string;
}

export interface CreateSetlist {
  type: "CREATE_SETLIST",
  id: SetlistId;
}

export interface DeleteSetlist {
  type: "DELETE_SETLIST",
  id: SetlistId;
}



export type NotesAction = AddNote | UpdateNote | DeleteNote;
export type SongAction = UpdateSongTitle | NotesAction | CreateSong;
export type SongsAction = DeleteSong | SongAction;

export type SetlistAction = CreateSong | AddSongToSetlist | RemoveSong | UpdateSetlistTitle | CreateSetlist;
export type SetlistsAction = DeleteSetlist | SetlistAction; 

export interface SetSearchState {
  type: "SET_SEARCH_STATE";
  search: SearchState;
}

export type SearchState = "all" | "setlists" | "songs" | false