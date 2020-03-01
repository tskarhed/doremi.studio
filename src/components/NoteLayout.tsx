import React, { FC, useState } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";
import styles from "./NoteLayout.module.scss";
import { placeholderSetlist } from "../views/Setlist";
import { Note, ToneSequence } from "../sound/SoundSetup";

interface Props {
  edit: boolean;
}

export const NoteLayout: FC<Props> = ({ edit }) => {
  const player = new ToneSequence(placeholderSetlist[0].notes, note => {
    setActiveNote(note);
  });

  const [activeNote, setActiveNote] = useState();
  const handleClick = () => {
    console.log("playing ToneSequence");
    player.play();
  };
  return (
    <View className={styles.wrapper}>
      <View className={styles.notesPosition}>
        <View className={styles.noteWrapper}>
          {placeholderSetlist[0].notes.map((note, i) => (
            <ActionButton
              inverted={activeNote === note}
              key={note}
              style={{ margin: "5px 0" }}
              size="lg"
              onClick={() => new Note(note).play()}
            >
              {note}
            </ActionButton>
          ))}
        </View>
      </View>
      <View className={styles.actionWrapper}>
        <ActionButton inverted size="lg" onClick={handleClick}>
          {edit ? "+" : "Play"}
        </ActionButton>
      </View>
    </View>
  );
};
