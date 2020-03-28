import React, { FC } from "react";
import { Page } from "./Page";
import { NoteLayout } from "../components/NoteLayout";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState, Song, SongId, SetlistId, Setlist } from "../state/types";
import { View } from "../native";
import { Back } from "../components/Back";


interface PlayFooterProps{
  prev?: Song;
  next?: Song;
  setlistId: SetlistId;
}

const navStyles ={
  fontSize: "1.3rem",
  margin: "5px",
  fontWeight: "bold",
  cursor: "pointer"
};

const PlayFooter: FC<PlayFooterProps> = ({prev, next, setlistId}) => {
  const history = useHistory();

  const navigate = (songId: SongId) => {
    history.push(`/setlist/${setlistId}/play/${songId}`)
  }

  return <View style={{display: 'flex', position: "fixed", bottom: 0, justifyContent:"space-between", width: "100%"}}>
    <View style={navStyles} onClick={() => prev && navigate(prev.id)}>{prev && `Prev: ${prev.title}`}</View>
<View style={navStyles} onClick={() => next && navigate(next.id)}>{next && `Next: ${next.title}`}</View>
  </View>
}


interface Props {
  songs: Song[];
  setlists: Setlist[];
}

export const UnconnectedPlay: FC<Props> = ({songs, setlists}) => {
  const history = useHistory();
  const { songNumber, setlistName } = useParams();
  
  const setlist = setlists.find(setlist => setlist.id === encodeURI(setlistName || ''));
  
  if(!setlistName || !setlist){
    history.push(`/`);
    return <></>
  }

  const setlistSongs = setlist.songs.reduce<Song[]>((songArray, songId) => {
    const song = songs.find(song => song.id === songId);
    if(song){
      return [...songArray, song];
    }
    return songArray;
  }, []);

  const song = songs.find(song => song.id === encodeURI(songNumber || ''));
  if(!song){
    history.push(`/setlist/${setlistName}`);
    return <></>
  }
  const songIndex = setlist.songs.indexOf(song.id);
  return (
    <Page editable={false} title={song.title} prefixElement={<Back to={`/setlist/${setlistName}`}/>}>
      <NoteLayout notes={song.notes} edit={false} songId={song.id} />
      <PlayFooter setlistId={setlistName} prev={setlistSongs[songIndex-1]} next={setlistSongs[songIndex + 1]}/>
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({songs: state.songs, setlists: state.setlists});

export const Play = connect(mapStateToProps)(UnconnectedPlay);