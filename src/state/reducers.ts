import { SongAction, SongState, SetlistAction, SetlistState } from "./types";

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

export const setlist = (prevState: SetlistState, action: SetlistAction) => {
  if (action.id === "ADD_SONG") {
    return prevState;
  }
};
