import React, { FC } from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";

import { ActionButton } from "../components/ActionButton";
import { SongList } from "../components/SongList";
import { StoreState, Song, Setlist as SetlistType } from "../state/types";
import StateManager from "react-select";
import { connect } from "react-redux";

interface Props {
  songs: Song[];
  setlists: SetlistType[];
}

export const UnconnectedSetlist: FC<Props> = ({songs, setlists}) => {
  const { setlistName } = useParams();
  const history = useHistory();
  const setlist = setlists.find(setlist => setlist.id === setlistName);
  if(!setlist){
    history.push(`/`)
    return <></>
  }

  const setlistSongs = setlist.songs.map(songId => songs.find(song => song.id === songId) as Song)

  return (
    <Page
      title={setlistName}
      headerElement={
        <ActionButton
        displayPlay  
        inverted
          style={{ margin: "5px" }}
          size="lg"
          onClick={() =>
            history.push(`/setlist/${setlistName}/play/`)
          }
        />
      }
    >
      <SongList songs={setlistSongs}/>
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({
  setlists: state.setlists,
  songs: state.songs
});

export const Setlist = connect(mapStateToProps)(UnconnectedSetlist);