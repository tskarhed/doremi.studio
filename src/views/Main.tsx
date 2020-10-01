import React, { FC } from 'react';
import { Page } from './Page';
import { SetlistList } from '../components/SetlistList';
import Icon from '../components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../state/actions';
import { StoreState } from '../state/types';
import { AddToListButton } from '../components/AddToListButton';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const setlists = useSelector((state: StoreState) => state.setlists);
  console.log(process.env);
  return (
    <Page
      editable={false}
      title={`Setlist alpha`}
      onHeaderClick={() => dispatch(setSearch('all'))}
      headerElement={
        <Icon
          icon="search"
          size="2x"
          style={{
            margin: 'auto 0',
            padding: '15px',
            maxHeight: '100%',
            cursor: 'pointer',
          }}
          onClick={() => dispatch(setSearch('all'))}
        />
      }
    >
      <SetlistList setlists={setlists} />
      <AddToListButton onClick={() => dispatch(setSearch('setlist'))} />
    </Page>
  );
};
