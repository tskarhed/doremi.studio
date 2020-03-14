import React, { FC } from "react";
import { Link } from "react-router-dom";
import { View } from "../native";
import styles from "./List.module.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMusic, faListUl } from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  to: string;
  type?: "song" | "setlist";
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
      {type && <View className={styles.type}><Icon icon={type === "song" ? faMusic : faListUl}/></View>}
      <View className={styles.children}>{children}</View>

      {actionComponent && <View className={styles.actionComponent}>{actionComponent}</View>}
    </Link>
  );
};