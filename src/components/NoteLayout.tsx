import React, { FC, useState, useEffect } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";

// Import to get the animation
import "./NoteLayout.scss";

// import { Note, ToneSequence } from "../sound/SoundSetup";
import { playNote, playSequence } from "../sound/synth";
import { useDispatch } from "react-redux";
import { SongId } from "../state/types";
import { addNote, updateNote, deleteNote } from "../state/actions";

interface Props {
  edit: boolean;
  notes: string[];
  songId: SongId;
}

export const NoteLayout: FC<Props> = ({ edit, notes, songId }) => {
  const [noteDuration, setNoteDuration] = useState();
  const [playingNote, setPlayingNote] = useState();
  // const [isEditingNote, setIsEditingNote] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // Remove the animation class so it doesn't play double when clicked
    if (playingNote === notes[notes.length - 1]) {
      setTimeout(() => {
        setPlayingNote("");
      }, noteDuration + 500);
    }
  }, [playingNote, noteDuration, notes]);

  const handleClick = () => {
    if (edit) {
      const note =
        prompt("Write note with an octave you want to add", "A4") || "A4";
      dispatch(addNote(note, songId));
      return;
    }

    playSequence(notes, (note, duration) => {
      console.log(duration);
      setNoteDuration(duration);
      setPlayingNote(note);
    });
  };

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
      <View className="notesPosition">
        <View className="noteWrapper">
          {notes.map((note, i) => (
            <ActionButton
              key={`${note}-${i}`}
              style={{
                animationDuration: `${noteDuration}s`,
              }}
              className={playingNote === note ? "invertAnim" : ""}
              size="lg"
              onClick={() => handleNoteClick(note, i)}
            >
              {note}
            </ActionButton>
          ))}
        </View>
      </View>
      <View className="actionWrapper">
        <ActionButton
          icon={edit ? "plus" : "play"}
          inverted
          size="lg"
          onClick={handleClick}
        />
      </View>
    </View>
  );
};
