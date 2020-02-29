import { View, Input } from "../native";
import React, { FC } from "react";
import styles from "./styles/Page.module.scss";

interface PageProps {
  title: string;
  headerElement?: React.ReactElement;
}

export const Page: FC<React.PropsWithChildren<PageProps>> = ({
  title,
  headerElement,
  children
}) => {
  return (
    <View className={styles.body}>
      <header>
        <Input value={title} />
        {headerElement}
      </header>

      {children}
    </View>
  );
};
