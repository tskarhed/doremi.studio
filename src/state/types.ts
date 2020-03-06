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

export type SongAction = AddNote | UpdateNote | DeleteNote;

export type SongState = string[];
