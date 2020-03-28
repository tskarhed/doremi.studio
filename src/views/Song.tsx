import React, { FC } from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";
import { NoteLayout } from "../components/NoteLayout";
import { StoreState, Song } from "../state/types";
import { connect } from "react-redux";
import { Back } from "../components/Back";

export const SongPage: FC<{songs: Song[]}> = ({songs}) => {
  const { songName } = useParams();
  const history = useHistory();
  const song = songs.find(song => song.id === encodeURI(songName || ''));
  if(!song){
    history.push('/');
    return <></>;
  }
  
  return (
    <Page title={song ? song.title : ""} prefixElement={<Back/>}>
      <NoteLayout notes={song ? song.notes : []} edit songId={song.id}/>
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({songs: state.songs});

export default connect(mapStateToProps)(SongPage);