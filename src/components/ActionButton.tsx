import React, { FC, useState, useEffect } from "react";
import { View } from "../native";
import styles from "./ActionButton.module.scss";
import "../theme.module.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  size: "sm" | "md" | "lg";
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
  className?: string;
  style?: Object;
  inverted?: boolean;
  icon?: "play" | "plus";
}

export const ActionButton: FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  size,
  className,
  style,
  inverted,
  icon
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log(isAnimating);
      if (isAnimating) {
        setIsAnimating(false);
      }
    }, 200);
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
      {icon === "play" && <Icon style={{paddingLeft: "5%", paddingTop: "2%"}} icon={faPlay}/>}
      {icon === "plus" && <Icon style={{paddingTop: "2%"}} icon={faPlus}/>}
      {!icon && children}
    </View>
  );
};
