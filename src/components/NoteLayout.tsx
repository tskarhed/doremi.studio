import React, { FC } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";

// Import to get the animation
import "./NoteLayout.scss";

// import { Note, ToneSequence } from "../sound/SoundSetup";
import { playNote } from "../sound/synth";
import { useDispatch, useSelector } from "react-redux";
import { SongId, StoreState } from "../state/types";
import { updateNote, deleteNote } from "../state/actions";

interface Props {
  edit: boolean;
  notes: string[];
  songId: SongId;
}
// Skapa style här
const noteLayoutStyle={
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width:"100%",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "90px 0"
}
export const NoteLayout: FC<Props> = ({ edit, notes, songId }) => {
  const noteDuration = useSelector((state: StoreState) => state.playingNote.duration);
  const playingNote = useSelector((state: StoreState) => state.playingNote.note);

  const dispatch = useDispatch();

  const handleNoteClick = (note: string, index: number) => {
    if (!edit) {
      playNote(note);
      return;
    }
    const newNote = prompt(
      "What do you want to change the note to? Remove text to delete the note.",
      note
    );
    if (newNote === null) {
      return;
    }
    newNote
      ? dispatch(updateNote(newNote, index, songId))
      : dispatch(deleteNote(index, songId));
  };
  return (
    <View className="wrapper">
      {edit && (
        <p
          style={{
            position: "absolute",
            textAlign: "center",
            width: "100%",
            maxWidth: "100%",
            opacity: 0.6,
          }}
        >
          Click on the notes to edit them
        </p>
      )}
        <View style={noteLayoutStyle} >
          {notes.map((note, i) => (
            <ActionButton
              key={`${note}-${i}`}
              style={{
                animationDuration: `${noteDuration}s`,
                margin: "5px 0px"
              }}
              className={playingNote === note ? "invertAnim" : ""}
              size="lg"
              onClick={() => handleNoteClick(note, i)}
            >
              {note}
            </ActionButton>
          ))}
        </View>
      {/* <View className="actionWrapper">
        <ActionButton
          icon={edit ? "plus" : "play"}
          inverted
          size="lg"
          onClick={handleClick}
        />
      </View> */}
    </View>
  );
};
