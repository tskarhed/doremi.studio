import React from "react";
import { Page } from "./Page";
import { useParams } from "react-router-dom";
import { NoteLayout } from "../components/NoteLayout";
import { songs } from "../mockData";

export const Song = () => {
  const { songName } = useParams();
  console.log(songName);

  console.log(songs);
  const song = songs.find(song => song.title === songName);
  return (
    <Page title={song ? song.title : ""}>
      <NoteLayout notes={song ? song.notes : []} edit />
    </Page>
  );
};
