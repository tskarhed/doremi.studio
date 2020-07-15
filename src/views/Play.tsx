import React, { FC } from 'react';
import { Page } from './Page';
import { NoteLayout } from '../components/NoteLayout';
import { useParams, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { StoreState, Song, SetlistId, Setlist } from '../state/types';
import { View } from '../native';
import { Back } from '../components/Back';
import { ActionButton } from '../components/ActionButton';
import { playSequence } from '../state/actions';
import { motion } from 'framer-motion';

interface PlayFooterProps {
  prev?: Song;
  next?: Song;
  setlistId: SetlistId;
  current: Song;
  currentIndex: number;
}

// const navStyles ={
//   fontSize: "1.3rem",
//   margin: "5px",
//   fontWeight: "bold",
//   cursor: "pointer"
// };
const songTitleStyle = {
  maxWidth: '200%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  position: 'absolute',
  top: '-30px',
  textAlign: 'center',
  width: '200%',
  left: '-50%',
};

const PlayFooter: FC<PlayFooterProps> = ({
  prev,
  next,
  setlistId,
  current,
  currentIndex,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const navigate = (songNumber: number) => {
    history.push(`/setlist/${setlistId}/play/${songNumber}`);
  };
  console.log(current);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 0px',
        width: '100%',
      }}
    >
      <View style={{ position: 'relative' }}>
        <motion.div layoutId={prev && prev.id} style={songTitleStyle as any}>
          {prev && `${prev.title}`}
        </motion.div>
        <ActionButton
          icon="prev"
          size="md"
          onClick={() => prev && navigate(currentIndex - 1)}
          inverted
          disabled={!prev}
        />
      </View>
      <ActionButton
        icon="play"
        size="xl"
        onClick={() => dispatch(playSequence(current.notes))}
        inverted
      />
      <View style={{ position: 'relative' }}>
        <motion.div layoutId={next && next.id} style={songTitleStyle as any}>
          {next && `${next.title}`}
        </motion.div>
        <ActionButton
          icon="next"
          size="md"
          onClick={() => next && navigate(currentIndex + 1)}
          inverted
          disabled={!next}
        />
      </View>
    </View>
  );
};

interface Props {
  songs: Song[];
  setlists: Setlist[];
}

export const UnconnectedPlay: FC<Props> = ({ songs, setlists }) => {
  const history = useHistory();
  const { songNumber, setlistName } = useParams();

  const songIndex = parseInt(songNumber as string) || 0;

  const setlist = setlists.find(
    (setlist) => setlist.id === encodeURI(setlistName || '')
  );
  console.log(setlist);

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

  const song = setlistSongs[songIndex];

  if (!song) {
    history.push(`/setlist/${setlist.id}`);
    return <></>;
  }
  return (
    <Page
      titleLayoutId={song.id}
      editable={false}
      title={song.title}
      prefixElement={<Back to={`/setlist/${setlist.id}`} />}
      footer={
        <PlayFooter
          setlistId={setlist.id}
          prev={setlistSongs[songIndex - 1]}
          next={setlistSongs[songIndex + 1]}
          current={song}
          currentIndex={songIndex}
        />
      }
    >
      <NoteLayout notes={song.notes} edit={false} songId={song.id} />
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({
  songs: state.songs,
  setlists: state.setlists,
});

export const Play = connect(mapStateToProps)(UnconnectedPlay);
