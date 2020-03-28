import React, { FC, useState, useEffect } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";

// Import to get the animation
import "./NoteLayout.scss";

// import { Note, ToneSequence } from "../sound/SoundSetup";
import { playNote, playSequence } from "../sound/synth";
import { useDispatch } from "react-redux";
import { SongId } from "../state/types";
import { addNote } from "../state/actions";

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
    if(edit) {
      const note = prompt("Write note with an octave you want to add", "A4") || "A4";
      dispatch(addNote(note, songId));
      return;
    }
    playSequence(notes, (note, duration) => {
      console.log(duration);
      setNoteDuration(duration);
      setPlayingNote(note);
    });
  };
  return (
    <View className="wrapper">
      <View className="notesPosition">
        <View className="noteWrapper">
          {notes.map((note, i) => (
            <ActionButton
              key={`${note}-${i}`}
              style={{
                animationDuration: `${noteDuration}s`
              }}
              className={playingNote === note ? "invertAnim" : ""}
              size="lg"
              onClick={() => {
                playNote(note);
                // setPlayingNote(note);
              }}
            >
              {note}
            </ActionButton>
          ))}
        </View>
      </View>
      <View className="actionWrapper">
        <ActionButton icon={edit ? "plus" : "play"} inverted size="lg" onClick={handleClick}/>
      </View>
    </View>
  );
};
