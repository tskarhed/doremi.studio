import React from "react";
import { Page } from "./Page";
import { useParams, Link } from "react-router-dom";
import { View } from "../native";

const placeholderSetlist = [
  { songName: "A whole new world", notes: ["D4", "E4", "A5", "B5"] },
  { songName: "You give love a bad name", notes: ["D4", "E4", "A5", "B5"] },
  { songName: "Nessum dorma", notes: ["D4", "E4", "A5", "B5"] },
  { songName: "Bumbibjörnarna", notes: ["D4", "E4", "A5", "B5"] }
];

export const Setlist = () => {
  const { setlistName } = useParams();
  return (
    <Page title={setlistName}>
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
