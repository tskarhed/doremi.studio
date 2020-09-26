import React, { FC, useState } from 'react';
import { Page } from './Page';
import { useParams, useHistory } from 'react-router-dom';
import { NoteLayout } from '../components/NoteLayout';
import { StoreState, Song } from '../state/types';
import { connect, useDispatch } from 'react-redux';
import { Back } from '../components/Back';
import { View } from '../native';
import { ActionButton } from '../components/ActionButton';
import {
  addNote,
  playSequence,
  updateSongTitle,
  updateSongLyrics,
} from '../state/actions';
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

  var acceptedNotesArray = [
    'Ab',
    'A',
    'A#',
    'Bb',
    'B',
    'B#',
    'Cb',
    'C',
    'C#',
    'Db',
    'D',
    'D#',
    'Eb',
    'E',
    'E#',
    'Fb',
    'F',
    'F#',
    'Gb',
    'G',
    'G#',
  ];

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
                prompt(
                  'Write note (capital) with an octave (integer) you want to add',
                  'Ab4'
                ) || 'Ab4';
              if (
                !isNaN(Number(note.substring(note.length - 1, note.length)))
              ) {
                console.log(note.substring(0, note.length - 1));
                var note_exists =
                  acceptedNotesArray.indexOf(
                    note.substring(0, note.length - 1)
                  ) > -1;
                if (note_exists) {
                  dispatch(addNote(note, song.id));
                }
              }
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
          onChange={(lyrics) => dispatch(updateSongLyrics(lyrics, song.id))}
        />
      ) : (
        <NoteLayout notes={song ? song.notes : []} edit songId={song.id} />
      )}
    </Page>
  );
};

const mapStateToProps = (state: StoreState) => ({ songs: state.songs });

export default connect(mapStateToProps)(SongPage);
