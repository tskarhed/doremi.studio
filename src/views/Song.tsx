import React, { FC, useLayoutEffect } from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";
import { NoteLayout } from "../components/NoteLayout";
import { StoreState, Song } from "../state/types";
import { connect } from "react-redux";

export const SongPage: FC<{songs: Song[]}> = ({songs}) => {
  const { songName } = useParams();
  const history = useHistory();

  const song = songs.find(song => song.id === songName);
  
  useLayoutEffect(() => {
    if(!song){
      history.push('/');
    }
  });
  

  return (
    <Page title={song ? song.title : ""}>
      <NoteLayout notes={song ? song.notes : []} edit />
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({songs: state.songs});

export default connect(mapStateToProps)(SongPage);