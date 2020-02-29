import React, { FC } from "react";
import { View } from "../native";
import styles from "./ActionButton.module.scss";

interface Props {
  size: "sm" | "md" | "lg";
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
}

export const ActionButton: FC<Props> = ({ children, onClick }) => {
  return (
    <View onClick={(e: Event) => onClick(e)} className={styles.ActionButton}>
      {children}
    </View>
  );
};
