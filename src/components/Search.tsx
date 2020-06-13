import React, { FC, useState } from 'react';
import { SearchState, Setlist, Song } from '../state/types';
import {ListItem} from './List';
import { Input } from '../native';
import { useDispatch } from 'react-redux';
import { setSearch } from '../state/actions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';


// Create interface
interface Props {
  isSearching: SearchState;
  setlists: Setlist[];
  songs: Song[];
}
const searchStyles = {
  container: {
    backgroundColor: 'red',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    zIndex: 10,
  }as React.CSSProperties,
  list: {
    height: '90%',
    overflowY: 'auto',
  }as React.CSSProperties,
  input: {
    height: '10%',
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }as React.CSSProperties,
}

// Skapa en funktion som genererar alla list-items



// Create a function which exports so that otehrs can reach
export const Search: FC<Props> = ({isSearching, setlists, songs}) => {
  const dispatch = useDispatch();
  const [list, setList] = useState<Song[]>(songs);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

// Lägg in grejen som givet en lista filtrar och sparar enligt input.
  setList(songs.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase())))
  console.log(songs.filter((item) => item.title.includes(inputValue)))
  
}
// TODO: Fix typings here
const generateListItems = (list: any, type:'setlist'|'song') => {
  return list.map((item: Setlist | Song) => {
    return <ListItem key={item.id} to={`/${type}/${item.id}`} type={type}  >{item.title}</ListItem>
  });
}

const onSearchSelect = (event: React.MouseEvent) => {
    dispatch(setSearch(false));
}

// Lägg till inputs, lista mm här
return <div style={searchStyles.container}>
  <div style={searchStyles.input}>
    <Input autoFocus onChange={onInputChange} placeholder='Search...' />
    <Icon size="2x" style={{ paddingRight: '3%'}} icon={faTimes} onClick={onSearchSelect}/>
  </div>
  <div style={searchStyles.list} onClick={onSearchSelect}>
  {generateListItems(list, 'song')}
  </div>
</div>  
}




// Create input field

