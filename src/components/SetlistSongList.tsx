import React, {FC} from "react";
import { StoreState, SetlistId } from "../state/types";
import { ListItem } from "./List";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

interface Props extends StoreState {
    id: SetlistId;
}

export const SetlistSongList: FC<Props> = ({id, songs, setlists}) => {
    const history = useHistory();    
    const currentSetlist = setlists.find((setlist) => setlist.id === id);
    if(!currentSetlist){
        history.push("/");
        return <></>;
    }
    const songsInList = currentSetlist.songs.map(songId => songs.find(song => song.id === songId));
    return <>{songsInList.map((song) => {
        return song &&(<ListItem type="song" to={`/song/${song.id}`} key={song.id}>
        {song.title}
      </ListItem>)
    })}</>
} 

const mapStateToProps = (state: StoreState) => ({
    ...state
});

export default connect(mapStateToProps)(SetlistSongList);