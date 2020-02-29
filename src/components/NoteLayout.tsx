import React, { FC } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";
import styles from "./NoteLayout.module.scss";
import { placeholderSetlist } from "../views/Setlist";

interface Props {
  edit: boolean;
}

export const NoteLayout: FC<Props> = ({ edit }) => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <View className={styles.wrapper}>
      <View className={styles.notesPosition}>
        <View className={styles.noteWrapper}>
          {placeholderSetlist[0].notes.map(note => (
            <ActionButton
              style={{ margin: "5px 0" }}
              size="lg"
              onClick={() => console.log("clicked")}
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
