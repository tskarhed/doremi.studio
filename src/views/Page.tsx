import { View, Input } from "../native";
import React, { FC } from "react";
import styles from "./styles/Page.module.scss";

interface PageProps {
  title?: string;
  headerElement?: React.ReactElement;
  editable?: boolean;
  onHeaderClick?: (e: any) => void;
}

export const Page: FC<React.PropsWithChildren<PageProps>> = ({
  title,
  headerElement,
  children,
  editable = true,
  onHeaderClick
}) => {
  return (
    <View className={styles.body}>
      <header onClick={onHeaderClick}>
        {editable ? (
          <Input value={title || ""} />
        ) : (
          <h1 style={{ margin: "auto", marginLeft: "10px" }}>{title}</h1>
        )}
        {headerElement}
      </header>

      {children}
    </View>
  );
};
