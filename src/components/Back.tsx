import React, { FC } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface Props {
  to?: string;
}

export const Back: FC<Props> = ({ to }) => {
  let history = useHistory();

  return (
    <Icon
      icon={faChevronLeft}
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
