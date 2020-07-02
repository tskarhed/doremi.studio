import React, { FC } from 'react';
import { Page } from './Page';
import { useParams, useHistory } from 'react-router-dom';

import { ActionButton } from '../components/ActionButton';
import { SongList } from '../components/SongList';
import { StoreState, Song, Setlist as SetlistType } from '../state/types';
import { connect, useDispatch } from 'react-redux';
import { Back } from '../components/Back';
import { AddToListButton } from '../components/AddToListButton';
import { setSearch, removeSongFromSetlist } from '../state/actions';

interface Props {
  songs: Song[];
  setlists: SetlistType[];
}

export const UnconnectedSetlist: FC<Props> = ({ songs, setlists }) => {
  const { setlistName } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const setlist = setlists.find(
    (setlist) => setlist.id === encodeURI(setlistName || '')
  );
  if (!setlist) {
    history.push(`/`);
    return <></>;
  }

  const setlistSongs = setlist.songs.reduce<Song[]>((songArray, songId) => {
    const song = songs.find((song) => song.id === songId);
    if (song) {
      return [...songArray, song];
    }
    return songArray;
  }, []);

  return (
    <Page
      title={setlist.title}
      prefixElement={<Back to="/" />}
      headerElement={
        <ActionButton
          icon="play"
          inverted
          style={{ margin: '5px' }}
          size="lg"
          onClick={() =>
            history.push(`/setlist/${setlist.id}/play/${setlistSongs[0].id}`)
          }
        />
      }
    >
      <SongList
        songs={setlistSongs}
        setlist={setlist.id}
        onRemove={(index) => dispatch(removeSongFromSetlist(setlist.id, index))}
      />
      <AddToListButton onClick={() => dispatch(setSearch('song'))} />
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({
  setlists: state.setlists,
  songs: state.songs,
});

export const Setlist = connect(mapStateToProps)(UnconnectedSetlist);
