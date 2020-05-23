import React, { FC, useState, useEffect } from "react";
import { View } from "../native";
import styles from "./ActionButton.module.scss";
import "../theme.module.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';


interface Props {
  size: "sm" | "md" | "lg" | "xl";
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
  className?: string;
  style?: Object;
  inverted?: boolean;
  disabled?: boolean;
  icon?: "play" | "plus" | "prev" | "next";
}

export const ActionButton: FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  size,
  className,
  style,
  inverted,
  disabled=false,
  icon
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
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
        if (!disabled){
          setIsAnimating(true);
          onClick(e);
        }
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
        (disabled && styles.disabled) +
        " " +
        (isAnimating && (inverted ? "animToInverted" : "animFromInverted"))
      }
    >
      {icon === "play" && <Icon style={{paddingLeft: "5%", paddingTop: "2%"}} icon={faPlay}/>}
      {icon === "plus" && <Icon style={{paddingTop: "2%"}} icon={faPlus}/>}
      {icon === "prev" && <Icon style={{paddingTop: "2%"}} icon={faStepBackward}/>}
      {icon === "next" && <Icon style={{paddingTop: "2%"}} icon={faStepForward}/>}
      {!icon && children}
    </View>
  );
};
