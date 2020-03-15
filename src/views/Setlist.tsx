import React from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";

import { ActionButton } from "../components/ActionButton";
import SetlistSongList from "../components/SetlistSongList";

export const Setlist = () => {
  const { setlistName } = useParams();
  const history = useHistory();

  return (
    <Page
      title={setlistName}
      headerElement={
        <ActionButton
          inverted
          style={{ margin: "5px" }}
          size="lg"
          onClick={() =>
            history.push(`/setlist/${setlistName}/play/`)
          }
        >
          Play
        </ActionButton>
      }
    >
      <SetlistSongList id={setlistName || ""}/>
    </Page>
  );
};
