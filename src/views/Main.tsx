import React from "react";
import { Page } from "./Page";
import { Text } from "../native";

export const Main = () => (
  <Page
    editable={false}
    title="Setlist"
    headerElement={
      <Text
        style={{
          margin: "auto"
        }}
      >
        Search
      </Text>
    }
  />
);
