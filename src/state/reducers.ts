import { SongAction, SongState } from "./types";

export const song = (prevState: SongState, action: SongAction) => {
  switch (action.id) {
    case "ADD_NOTE":
      return [...prevState, action.note];
    case "UPDATE_NOTE":
      return prevState.map((note, i) => {
        if (i === action.index) {
          return action.note;
        }

        return note;
      });
    case "REMOVE_NOTE":
      return prevState.filter((_note, index) => index !== action.index);
    default:
      return prevState;
  }
};
