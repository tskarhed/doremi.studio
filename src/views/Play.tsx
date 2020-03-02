import React from "react";
import { Page } from "./Page";
import { NoteLayout } from "../components/NoteLayout";
import { useParams } from "react-router-dom";
import { songs } from "../mockData";

export const Play = () => {
  const { songNumber } = useParams();
  const song = songs[0];
  return (
    <Page editable={false} title={decodeURIComponent(songNumber || "")}>
      <NoteLayout notes={song.notes} edit={false} />
    </Page>
  );
};
