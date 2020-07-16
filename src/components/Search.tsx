import React, { FC, useState } from 'react';
import { SearchState, Setlist, Song, SetlistId } from '../state/types';
import { ListItem, List } from './List';
import { Input } from '../native';
import { useDispatch } from 'react-redux';
import { setSearch, addSongToSetlist } from '../state/actions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createSong, createSetlist } from '../state/actions';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import theme from '../theme.module.scss';

// Create interface
interface Props {
  isSearching: SearchState;
  setlists: Setlist[];
  songs: Song[];
}
const searchStyles = {
  container: {
    backgroundColor: theme.secondary,
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
    height: '10%',
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

  const { setlistName } = useParams();

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
      const url = `/${type}/${item.id}`;
      return (
        <ListItem
          onClick={(event: React.MouseEvent) => {
            // Add song to current setlist
            if (isSearching === 'song' && setlistName) {
              event.preventDefault();
              dispatch(addSongToSetlist(item.id, encodeURI(setlistName)));
            }
          }}
          key={item.id}
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
          icon={faTimes}
          onClick={onSearchSelect}
        />
      </div>
      <List style={searchStyles.list} onClick={onSearchSelect}>
        {generateListItems(list)}
        {isSearching && (
          <CreateNew setlist={setlistName} type={isSearching}>
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

  let history = useHistory();

  const onClick = () => {
    if (type === 'all' || type === 'song') {
      dispatch(createSong(children, setlist));
      // Redirect to place
      history.push(`/song/${encodeURI(children)}`);
    } else if (type === 'setlist') {
      dispatch(createSetlist(children));
      // Redirect
      history.push(`/setlist/${encodeURI(children)}`);
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
