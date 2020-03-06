export type SongState = string[];

export type SetlistState = SongState[];

// Song interfaces and types
export interface AddNote {
  id: "ADD_NOTE";
  note: string;
}

export interface UpdateNote {
  id: "UPDATE_NOTE";
  index: number;
  note: string;
}

export interface DeleteNote {
  id: "REMOVE_NOTE";
  index: number;
}

export interface UpdateTitle {
  id: "UPDATE_TITLE";
  text: string;
}

export type SongAction = AddNote | UpdateNote | DeleteNote | UpdateTitle;

// Setlist interfaces and types

export interface AddSong {
  id: "ADD_SONG";
  song: SongState;
}

export interface RemoveSong {
  id: "REMOVE_SONG";
  index: number;
}

export type SetlistAction = AddSong | RemoveSong | UpdateTitle;
