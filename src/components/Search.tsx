import React, { FC, useState } from 'react';
import { SearchState, Setlist, Song, SetlistId } from '../state/types';
import { ListItem, List } from './List';
import { Input } from '../native';
import { useDispatch } from 'react-redux';

import { setSearch } from '../state/actions';
import Icon from './Icon';
        
import { createSong, createSetlist } from '../state/actions';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import theme from '../theme.module.scss';
import ShortUniqueId from 'short-unique-id';
import { db } from '../firebase/firebase';
import { useUser } from '../firebase/hooks/useUser';
import { useAddSongToSetlist } from '../firebase/hooks/useAddSongToSetlist';

// Create interface
interface Props {
  isSearching: SearchState;
  setlists: Setlist[];
  songs: Song[];
}
const searchStyles = {
  container: {
    backgroundColor: theme.primary,
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    zIndex: 11,
  } as React.CSSProperties,
  list: {
    height: '90%',
    overflowY: 'auto',
  } as React.CSSProperties,
  input: {
    height: '4.4rem',
    backgroundColor: theme.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 5px black',
  } as React.CSSProperties,
};

type SearchList = Array<Song | Setlist>;

// Skapa en funktion som genererar alla list-items

// Create a function which exports so that otehrs can reach
export const Search: FC<Props> = ({ isSearching, setlists, songs }) => {
  const dispatch = useDispatch();
  const searchableList =
    isSearching === 'setlist'
      ? []
      : [...songs, ...(isSearching === 'song' ? [...setlists] : [])];
  const [list, setList] = useState<SearchList>(searchableList);

  const { setlistId } = useParams();

  const addSong = useAddSongToSetlist(setlistId || '');

  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setInputValue(event.currentTarget.value);

    // Lägg in grejen som givet en lista filtrar och sparar enligt input.
    setList(
      searchableList.filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };
  // TODO: Fix typings here
  const generateListItems = (list: SearchList) => {
    return list.map((item) => {
      const type = !!(item as Setlist).songs ? 'setlist' : 'song';
      const url = `/${type}/${item.shortUID}`;
      return (
        <ListItem
          onClick={(event: React.MouseEvent) => {
            // Add song to current setlist
            if (isSearching === 'song' && setlistId) {
              console.log('Trying to add song');
              event.preventDefault();
              addSong(item.shortUID);
            }
          }}
          key={item.shortUID}
          to={url}
          type={type}
        >
          {item.title}
        </ListItem>
      );
    });
  };

  const onSearchSelect = (event: React.MouseEvent) => {
    dispatch(setSearch(false));
  };

  // Lägg till inputs, lista mm här
  return (
    <div style={searchStyles.container}>
      <div style={searchStyles.input}>
        <Input
          autoFocus
          value={inputValue}
          onChange={onInputChange}
          placeholder={
            isSearching === 'setlist' ? 'Create new setlist:' : 'Search...'
          }
        />
        <Icon
          size="2x"
          style={{ paddingRight: '3%' }}
          icon="times"
          onClick={onSearchSelect}
        />
      </div>
      <List style={searchStyles.list} onClick={onSearchSelect}>
        {generateListItems(list)}
        {isSearching && (
          <CreateNew setlist={setlistId} type={isSearching}>
            {inputValue}
          </CreateNew>
        )}
      </List>
    </div>
  );
};

interface CreateNewProps {
  children: string;
  type: string;
  setlist?: SetlistId;
}
const CreateNew: FC<CreateNewProps> = ({ setlist, type, children }) => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const addSong = useAddSongToSetlist(setlist || '');

  let history = useHistory();

  const onClick = () => {
    const uid = new ShortUniqueId();
    if (type === 'all' || type === 'song') {
      let song = {
        title: children,
        shortUID: uid(),
        uid: '',
        notes: [],
      };
      dispatch(createSong(song));
      if (user) {
        db.collection(`users/${user.uid}/songs`).add(song);
      }

      if (setlist) {
        addSong(song.shortUID);
      }
      // Redirect to place
      history.push(`/song/${song.shortUID}`);
    } else if (type === 'setlist') {
      const setlist = {
        title: children,
        shortUID: uid(),
        uid: '',
        songs: [],
      };
      dispatch(createSetlist(setlist));

      if (user) {
        db.collection(`users/${user.uid}/setlists`).add(setlist);
      }
      // Redirect
      history.push(`/setlist/${setlist.shortUID}`);
    }
    // Reset isSearching

    dispatch(setSearch(false));
  };

  return (
    <ListItem to="#" onClick={onClick}>
      Create new {type === 'all' ? 'song' : type}: {children}
    </ListItem>
  );
};

// Create input field
