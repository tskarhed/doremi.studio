import React, { FC, useState } from 'react';
import { Page } from './Page';
import { useParams, useHistory } from 'react-router-dom';
import { NoteLayout } from '../components/NoteLayout';
import { StoreState, Song } from '../state/types';
import { connect, useDispatch } from 'react-redux';
import { Back } from '../components/Back';
import { View } from '../native';
import { ActionButton } from '../components/ActionButton';
import { playSequence } from '../state/actions';
import { LyricLayout } from '../components/LyricLayout';
import { useSong } from '../firebase/hooks/useSong';

export const SongPage: FC<{ songs: Song[] }> = ({ songs }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const history = useHistory();
  const [song, updateSong] = useSong(songId);
  const [isLyricVisible, setisLyricVisible] = useState(false);
  if (!song || !updateSong) {
    history.push('/');
    return <></>;
  }

  return (
    <Page
      title={song ? song.title : ''}
      onTitleChange={(newTitle) => {
        updateSong({ ...song, title: newTitle });
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
            icon={isLyricVisible ? 'music' : 'text'}
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
              const newSong = song;
              newSong.notes.push(note);
              updateSong(newSong);
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
      {isLyricVisible ? (
        <LyricLayout
          edit={true}
          lyrics={song.lyrics}
          onChange={(lyrics) => updateSong({ ...song, lyrics })}
        />
      ) : (
        <NoteLayout
          notes={song ? song.notes : []}
          edit
          onChange={(newNote, index) => {
            let newNotes = song.notes;
            if (!newNote) {
              newNotes = newNotes.filter((note, i) => !(index === i));
            } else {
              newNotes[index] = newNote;
            }

            updateSong({ ...song, notes: newNotes });
          }}
        />
      )}
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({ songs: state.songs });

export default connect(mapStateToProps)(SongPage);
