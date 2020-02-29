import React from "react";
import { Page } from "./Page";
import { useParams } from "react-router-dom";
import { NoteLayout } from "../components/NoteLayout";

export const Song = () => {
  const { songName } = useParams();

  return (
    <Page title={decodeURIComponent(songName || "")}>
      <NoteLayout edit />
    </Page>
  );
};
