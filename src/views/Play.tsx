import React, { FC } from "react";
import { Page } from "./Page";
import { NoteLayout } from "../components/NoteLayout";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState, Song } from "../state/types";

interface Props {
  songs: Song[];
}

export const UnconnectedPlay: FC<Props> = ({songs}) => {
  const { songNumber, setlistName } = useParams();
  const history = useHistory();
  const song = songs.find(song => song.id === songNumber);
  if(!song){
    history.push(`/setlist/${setlistName}`);
    return <></>
  }
  return (
    <Page editable={false} title={decodeURIComponent(song.id || "")}>
      <NoteLayout notes={song.notes} edit={false} />
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({songs: state.songs});

export const Play = connect(mapStateToProps)(UnconnectedPlay);