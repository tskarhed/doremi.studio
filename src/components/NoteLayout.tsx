import React, { FC } from 'react';
import { View } from '../native';

// Import to get the animation
import './NoteLayout.scss';

import { NoteButton } from './NoteButton';

interface Props {
  edit: boolean;
  notes: string[];
  onChange?: (note: string | null, index: number) => void;
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
export const NoteLayout: FC<Props> = ({ edit, notes, onChange }) => {
  const handleNoteClick = (newNote: string | null, index: number) => {
    if (onChange === undefined) {
      return;
    }
    newNote === null ? onChange(null, index) : onChange(newNote, index);
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
