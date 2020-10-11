import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from './Icon';

interface Props {
  to?: string;
}

export const Back: FC<Props> = ({ to }) => {
  let history = useHistory();

  return (
    <Icon
      icon="chevron-left"
      onClick={() => (to ? history.push(to) : history.goBack())}
      size="2x"
      style={{
        margin: 'auto 0',
        padding: '15px',
        maxHeight: '100%',
        cursor: 'pointer',
      }}
    />
  );
};
