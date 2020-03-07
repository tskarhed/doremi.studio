import React, { FC } from "react";
import { Link } from "react-router-dom";
import { View } from "../native";
import styles from "./List.module.scss";

interface ListItemProps {
  to: string;
  type: "song" | "setlist";
  actionComponent?: React.ReactElement;
}

export const ListItem: FC<React.PropsWithChildren<ListItemProps>> = ({
  to,
  children,
  type,
  actionComponent
}) => {
  return (
    <Link to={to} className={styles.wrapper}>
      <View className={styles.type}>{type}</View>
      <View className={styles.children}>{children}</View>

      <View className={styles.actionComponent}>{actionComponent}</View>
    </Link>
  );
};