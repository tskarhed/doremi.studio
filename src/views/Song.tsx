import React, { FC, useState } from 'react';
import { Page } from './Page';
import { useParams, useHistory } from 'react-router-dom';
import { NoteLayout } from '../components/NoteLayout';
import { StoreState, Song } from '../state/types';
import { connect, useDispatch } from 'react-redux';
import { Back } from '../components/Back';
import { View } from '../native';
import { ActionButton } from '../components/ActionButton';
import { addNote, playSequence, updateSongTitle } from '../state/actions';
import { LyricLayout } from '../components/LyricLayout';

export const SongPage: FC<{ songs: Song[] }> = ({ songs }) => {
  const dispatch = useDispatch();
  const { songName } = useParams();
  const history = useHistory();
  const song = songs.find((song) => song.id === encodeURI(songName || ''));
  const [isLyricVisible, setisLyricVisible] = useState(false); 
  if (!song) {
    history.push('/');
    return <></>;
  }

 

  return (
    <Page
      title={song ? song.title : ''}
      onTitleChange={(newTitle) => {
        dispatch(updateSongTitle(newTitle, song.id));
      }}
      prefixElement={<Back />}
      footer={
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '15px 0',
            width: '100%',
          }}
        >
          
          <ActionButton
            inverted
            icon="text"
            size="lg"
            onClick={() => setisLyricVisible(!isLyricVisible)}
          />
          <ActionButton
            inverted
            icon="plus"
            size="xl"
            onClick={() => {
              const note =
                prompt('Write note with an octave you want to add', 'A4') ||
                'A4';
              dispatch(addNote(note, song.id));
            }}
          />
          <ActionButton
            inverted
            icon="play"
            size="lg"
            onClick={() => dispatch(playSequence(song.notes))}
          />
        </View>
      }
    >
      {isLyricVisible ?  <LyricLayout edit={true} lyrics={song.lyrics}/>
      :
      <NoteLayout notes={song ? song.notes : []} edit songId={song.id} />}
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({ songs: state.songs });

export default connect(mapStateToProps)(SongPage);
