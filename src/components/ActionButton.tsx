import React, { FC } from "react";
import { View } from "../native";
import styles from "./ActionButton.module.scss";

interface Props {
  size: "sm" | "md" | "lg";
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
  className?: string;
}

export const ActionButton: FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  size,
  className
}) => {
  return (
    <View
      onClick={(e: Event) => onClick(e)}
      className={styles.ActionButton + " " + styles[size] + " " + className}
    >
      {children}
    </View>
  );
};
