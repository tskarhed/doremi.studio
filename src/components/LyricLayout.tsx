import React, { FC, CSSProperties } from 'react';
import { View } from '../native';
import theme from '../theme.module.scss';
// Import to get the animation
import './NoteLayout.scss';


interface Props {
  edit: boolean;
  lyrics?: string;
}
// Skapa style här
const lyricLayoutStyle = {
  textAlign: 'center',
  color: '#000000',
  padding: '10% 10%',
  fontSize: '1.3rem',
  whiteSpace: 'pre-wrap',
  height: "100%",
  boxSizing: "border-box",
};
const lyricEditStyle = {
  height: "100%",
  width: "100%",
  resize: "none",
  textAlign: 'center',
  background: theme.secondary,
  fontSize: '1.3rem',
  fontFamily: theme.fontFamily,
};
export const LyricLayout: FC<Props> = ({ edit, lyrics }) => {

  return (
    <View style={lyricLayoutStyle}>
      {edit ? <textarea name="" id="" style={lyricEditStyle as CSSProperties} defaultValue={lyrics}/>
      :
      lyrics}
    </View>
  );
};
