import React, {FC} from "react";
import { ListItem } from "./List";
import { Song, SetlistId } from "../state/types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

interface Props {
    songs: Song[];
    setlist: SetlistId;
}

export const SongList: FC<Props> = ({songs, setlist}) => {
    const history = useHistory();
    return <>{songs.map((song, i) => {
        return (<ListItem
            type="song"
            to={`/setlist/${setlist}/play/${song.id}`}
            key={`${song.id}-${i}`}
            actionComponent={
                <Icon
                onClick={(e) =>{
                    e.preventDefault();
                    history.push(`/song/${song.id}`);
                }}
                size="2x"
                icon={faPen}
                />
            }>
        {song.title}
      </ListItem>)
    })}</>
} 
