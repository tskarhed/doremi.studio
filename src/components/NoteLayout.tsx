import React, { FC } from "react";
import { View } from "../native";
import { ActionButton } from "./ActionButton";

interface Props {
  edit: boolean;
}

export const NoteLayout: FC<Props> = ({ edit }) => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <View></View>
      <View>
        <ActionButton size="lg" onClick={handleClick}>
          {edit ? "+" : "Play"}
        </ActionButton>
      </View>
    </>
  );
};
