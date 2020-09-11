import React, { FC, CSSProperties, ChangeEvent } from 'react';
import { View } from '../native';
import theme from '../theme.module.scss';

interface Props {
  edit: boolean;
  lyrics?: string;
  onChange?: (lyrics: string) => void;
}
// Skapa style här
const lyricLayoutStyle = {
  textAlign: 'center',
  color: theme.secondary,
  textShadow: '0 0 5px black',
  padding: '10% 10%',
  fontSize: '1.3rem',
  whiteSpace: 'pre-wrap',
  height: '100%',
  boxSizing: 'border-box',
};
const lyricEditStyle = {
  height: '100%',
  width: '100%',
  resize: 'none',
  textAlign: 'center',
  background: theme.secondary,
  fontSize: '1.3rem',
  fontFamily: theme.fontFamily,
};
export const LyricLayout: FC<Props> = ({ edit, lyrics, onChange }) => {
  return (
    <View style={lyricLayoutStyle}>
      {edit ? (
        <textarea
          name=""
          id=""
          style={lyricEditStyle as CSSProperties}
          defaultValue={lyrics}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            onChange && onChange(event.currentTarget.value || '');
          }}
        />
      ) : (
        lyrics
      )}
    </View>
  );
};
