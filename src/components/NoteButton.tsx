import React, { FC } from 'react';
import { StoreState } from '../state/types';
import { useSelector, useDispatch } from 'react-redux';
import { ActionButton } from './ActionButton';
import { playSingleNote } from '../state/actions';
interface Props {
  note: string;
  editable?: boolean;
  /** Only used when editable*/
  onChange?: (newNote: string | null) => void;
}

export const NoteButton: FC<Props> = ({ note, editable = false, onChange }) => {
  const playingNote = useSelector((state: StoreState) => state.playingNote);
  const dispatch = useDispatch();

  const handleNoteClick = () => {
    if (!editable) {
      dispatch(playSingleNote(note));
      return;
    }
    const newNote = prompt(
      'What do you want to change the note to? Remove text to delete the note.',
      note
    );
    onChange && onChange(newNote);
  };

  return (
    <ActionButton
      style={{
        animationDuration: `${playingNote.duration}s`,
        margin: '5px 5%',
      }}
      className={playingNote.note === note ? 'invertAnim' : ''}
      size="lg"
      onClick={() => handleNoteClick()}
    >
      {note}
    </ActionButton>
  );
};
