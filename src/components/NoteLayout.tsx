import React, { FC, useState } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";
// import styles from "./NoteLayout.module.scss";

// Import to get the animation
import "./NoteLayout.scss";

import { placeholderSetlist } from "../views/Setlist";
import { Note, ToneSequence } from "../sound/SoundSetup";

interface Props {
  edit: boolean;
}

export const NoteLayout: FC<Props> = ({ edit }) => {
  const player = new ToneSequence(
    placeholderSetlist[0].notes,
    (note, duration) => {
      console.log(duration);
      setNoteDuration(duration);
      setPlayingNote(note);
    }
  );
  const [noteDuration, setNoteDuration] = useState();
  const [playingNote, setPlayingNote] = useState();
  const handleClick = () => {
    player.play();
  };
  return (
    <View className="wrapper">
      <View className="notesPosition">
        <View className="noteWrapper">
          {placeholderSetlist[0].notes.map((note, i) => (
            <ActionButton
              key={note}
              style={{
                animationDuration: `${noteDuration}s`
              }}
              className={playingNote === note ? "invertAnim" : ""}
              size="lg"
              onClick={() => {
                new Note(note).play();
                setPlayingNote(note);
              }}
            >
              {note}
            </ActionButton>
          ))}
        </View>
      </View>
      <View className="actionWrapper">
        <ActionButton inverted size="lg" onClick={handleClick}>
          {edit ? "+" : "Play"}
        </ActionButton>
      </View>
    </View>
  );
};
