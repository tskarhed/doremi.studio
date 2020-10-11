import React, { FC, SyntheticEvent } from 'react';
import { ListItem, List } from './List';
import { Song, SetlistId } from '../state/types';
import Icon from './Icon';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  songs: Song[];
  setlist: SetlistId;
  onRemove: (song: number) => void;
}

export const SongList: FC<Props> = ({ songs, setlist, onRemove }) => {
  const history = useHistory();

  return (
    <List>
      {songs.map((song, i) => {
        return (
          <ListItem
            type="song"
            to={`/setlist/${setlist}/play/${i}`}
            key={`${song.id}-${i}`}
            actionComponent={
              <>
                <Icon
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault();
                    onRemove(i);
                  }}
                  size="2x"
                  icon="times"
                />
                <Icon
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault();
                    history.push(`/song/${song.id}`);
                  }}
                  size="2x"
                  icon="pen"
                />
              </>
            }
          >
            <motion.span>{song.title}</motion.span>
          </ListItem>
        );
      })}
    </List>
  );
};
