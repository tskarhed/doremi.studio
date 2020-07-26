import React, { FC } from 'react';
import { Setlist } from '../state/types';
import { ListItem, List } from './List';
import { ActionButton } from './ActionButton';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  setlists: Setlist[];
}

export const SetlistList: FC<Props> = ({ setlists }) => {
  const history = useHistory();
  return (
    <List>
      {setlists.map((setlist, i) => {
        return (
          <ListItem
            key={`${setlist.id}-${i}`}
            type="setlist"
            to={`/setlist/${setlist.id}`}
            actionComponent={
              <ActionButton
                onClick={() => {
                  history.push(`/setlist/${setlist.id}/play/0`);
                }}
                size="md"
                inverted
                icon="play"
              />
            }
          >
            <motion.span>{setlist.title}</motion.span>
          </ListItem>
        );
      })}
    </List>
  );
};
