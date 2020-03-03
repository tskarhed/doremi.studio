import React from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";

import { ActionButton } from "../components/ActionButton";
import { songs } from "../mockData";
import { ListItem } from "../components/List";

export const placeholderSetlist = [
  {
    songName: "A whole new world",
    notes: ["C#4", "E#4", "G#4", "C#5", "E#5", "G#5", "C#6"]
  },
  { songName: "You give love a bad name", notes: ["D4", "E4", "A5", "B5"] },
  { songName: "Nessum dorma", notes: ["D4", "E4", "A5", "B5"] },
  { songName: "Bumbibjörnarna", notes: ["D4", "E4", "A5", "B5"] }
];

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
            history.push(`/setlist/${setlistName}/play/${songs[0].id}`)
          }
        >
          Play
        </ActionButton>
      }
    >
      {songs.map(song => (
        <ListItem type="song" to={`/song/${song.id}`} key={song.id}>
          {song.title}
        </ListItem>
      ))}
    </Page>
  );
};
