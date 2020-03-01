import React from "react";
import { Page } from "./Page";
import { useParams, Link, useHistory } from "react-router-dom";
import { View } from "../native";
import { ActionButton } from "../components/ActionButton";

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
          onClick={() => history.push(`/setlist/${setlistName}/play/0`)}
        >
          Play
        </ActionButton>
      }
    >
      {placeholderSetlist.map(song => (
        <View>
          <Link to={`/song/${encodeURIComponent(song.songName)}`}>
            {song.songName}
          </Link>
        </View>
      ))}
    </Page>
  );
};
