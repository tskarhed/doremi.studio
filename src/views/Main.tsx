import React from "react";
import { Page } from "./Page";
import SetlistList from "../components/SetlistList";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Main = () => {

  return (
    <Page
      editable={false}
      title="Setlist"
      headerElement={
        <Icon icon={faSearch} size="2x" style={{
          margin: "auto 0",
          padding: "15px",
          maxHeight: "100%"
        }}/>
      }
    >
  <SetlistList/>
    </Page>
  );
};
