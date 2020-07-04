import React, { FC } from 'react';
import { View } from '../native';

// Import to get the animation
import './NoteLayout.scss';

import { useDispatch } from 'react-redux';
import { SongId } from '../state/types';
import { updateNote, deleteNote } from '../state/actions';
import { NoteButton } from './NoteButton';

interface Props {
  edit: boolean;
  notes: string[];
  songId: SongId;
}
// Skapa style här
const noteLayoutStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'center',
  width: '100%',
  alignItems: 'center',
  flexWrap: 'wrap',
  maxHeight: '100vh',
  height: '100%',
  alignContent: 'center',
};
export const NoteLayout: FC<Props> = ({ edit, notes, songId }) => {
  const dispatch = useDispatch();

  const handleNoteClick = (newNote: string | null, index: number) => {
    newNote === null
      ? dispatch(deleteNote(index, songId))
      : dispatch(updateNote(newNote, index, songId));
  };
  return (
    <View className="wrapper">
      {edit && (
        <p
          style={{
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            maxWidth: '100%',
            opacity: 0.6,
          }}
        >
          Click on the notes to edit them
        </p>
      )}
      <View style={noteLayoutStyle}>
        {notes.map((note, i) => (
          <NoteButton
            key={`${note}-${i}`}
            note={note}
            editable={edit}
            onChange={(newNote) => handleNoteClick(newNote, i)}
          />
        ))}
      </View>
    </View>
  );
};
