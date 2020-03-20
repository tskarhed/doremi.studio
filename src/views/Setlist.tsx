import React, { FC } from "react";
import { Page } from "./Page";
import { useParams, useHistory } from "react-router-dom";

import { ActionButton } from "../components/ActionButton";
import { SongList } from "../components/SongList";
import { StoreState, Song, Setlist as SetlistType } from "../state/types";
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

  const setlistSongs = setlist.songs.reduce<Song[]>((songArray, songId) => {
    const song = songs.find(song => song.id === songId);
    if(song){
      return [...songArray, song];
    }
    return songArray;
  }, []);

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
            history.push(`/setlist/${setlistName}/play/${setlistSongs[0].id}`)
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