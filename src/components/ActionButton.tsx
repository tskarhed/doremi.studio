import React, { FC, useState, useEffect } from "react";
import { View } from "../native";
import styles from "./ActionButton.module.scss";
import "../theme.module.scss";

interface Props {
  size: "sm" | "md" | "lg";
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
  className?: string;
  style?: Object;
  inverted?: boolean;
}

export const ActionButton: FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  size,
  className,
  style,
  inverted
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log(isAnimating);
      if (isAnimating) {
        setIsAnimating(false);
      }
    }, 500);
  }, [isAnimating]);

  return (
    <View
      style={style}
      onClick={(e: Event) => {
        e.preventDefault();
        setIsAnimating(true);
        onClick(e);
      }}
      className={
        styles.ActionButton +
        " " +
        styles[size] +
        " " +
        className +
        " " +
        (inverted && styles.inverted) +
        " " +
        (isAnimating && (inverted ? "animToInverted" : "animFromInverted"))
      }
    >
      {children}
    </View>
  );
};
