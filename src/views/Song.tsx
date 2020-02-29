import React from "react";
import { Page } from "./Page";
import { useParams } from "react-router-dom";

export const Song = () => {
  const { songName } = useParams();

  return <Page title={decodeURIComponent(songName || "")} />;
};
