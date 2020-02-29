import React from "react";
import { Page } from "./Page";
import { NoteLayout } from "../components/NoteLayout";
import { useParams } from "react-router-dom";

export const Play = () => {
  const { songNumber } = useParams();
  return (
    <Page editable={false} title={decodeURIComponent(songNumber || "")}>
      <NoteLayout edit={false} />
    </Page>
  );
};
