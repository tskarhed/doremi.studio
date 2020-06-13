import React, { FC } from 'react';
import { View } from '../native';
import { ActionButton } from './ActionButton';
interface Props {
  onClick: (e: Event) => void;
}

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2%',
};

export const AddToListButton: FC<Props> = ({ onClick }) => {
  return (
    <View style={styles}>
      <ActionButton icon="plus" onClick={onClick} size="lg" />
    </View>
  );
};
