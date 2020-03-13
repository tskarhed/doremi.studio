import React, {FC} from "react";
import { StoreState, SetlistId } from "../state/types";
import { ListItem } from "./List";
import { connect } from "react-redux";

interface Props extends StoreState {
    id: SetlistId;
}

export const SetlistSongList: FC<Props> = ({id, songs, setlists}) => {
    const currentSetlist = setlists.find((setlist) => setlist.id === id);
    const songsInList = currentSetlist?.songs.map(songId => songs.find(song => song.id === songId));
    return <>{songsInList?.map((song) => {
        return song &&(<ListItem type="song" to={`/song/${song.id}`} key={song.id}>
        {song.title}
      </ListItem>)
    })}</>
} 

const mapStateToProps = (state: StoreState) => ({
    ...state
});

export default connect(mapStateToProps)(SetlistSongList);