import React, { FC } from 'react';
import { Page } from './Page';
import { useParams, useHistory } from 'react-router-dom';

import { ActionButton } from '../components/ActionButton';
import { SongList } from '../components/SongList';
import { useDispatch } from 'react-redux';
import { Back } from '../components/Back';
import { AddToListButton } from '../components/AddToListButton';
import { setSearch } from '../state/actions';
import { useSetlist } from '../firebase/hooks/useSetlist';
import { useSongs } from '../state/hooks/useSongs';

export const Setlist: FC = () => {
  const { setlistId } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const [setlist, updateSetlist] = useSetlist(setlistId);

  const setlistSongs = useSongs(setlistId);

  if (!setlist || !updateSetlist || !setlistId) {
    history.push(`/`);
    return <></>;
  }

  return (
    <Page
      title={setlist.title}
      onTitleChange={(newTitle) => {
        updateSetlist({ ...setlist, title: newTitle });
      }}
      prefixElement={<Back to="/" />}
      headerElement={
        <ActionButton
          icon="play"
          inverted
          style={{ margin: '5px' }}
          size="lg"
          onClick={() => history.push(`/setlist/${setlist.shortUID}/play/0`)}
        />
      }
    >
      <SongList
        songs={setlistSongs}
        setlist={setlist.shortUID}
        onRemove={(index) => {
          const newSongs = setlist.songs.filter((_song, i) => !(i === index));
          updateSetlist({ ...setlist, songs: newSongs });
        }}
      />
      <AddToListButton onClick={() => dispatch(setSearch('song'))} />
    </Page>
  );
};
