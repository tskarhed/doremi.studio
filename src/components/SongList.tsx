import React, {FC} from "react";
import { ListItem } from "./List";
import { Song } from "../state/types";

interface Props {
    songs: Song[];
}

export const SongList: FC<Props> = ({songs}) => {
    return <>{songs.map((song) => {
        return (<ListItem type="song" to={`/song/${song.id}`} key={song.id}>
        {song.title}
      </ListItem>)
    })}</>
} 
