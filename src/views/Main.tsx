import React from "react";
import { Page } from "./Page";
import { Text } from "../native";
import SetlistList from "../components/SetlistList";

export const Main = () => {

  return (
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
    >
  <SetlistList/>
    </Page>
  );
};
