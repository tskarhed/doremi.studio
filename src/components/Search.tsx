import React, { FC, useState } from 'react';
import { SearchState, Setlist, Song } from '../state/types';
import {ListItem} from './List';
import { Input } from '../native';


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
    zIndex: 10,
  }as React.CSSProperties,
  list: {
    height: '100%',
    overflowY: 'auto',
  }as React.CSSProperties,
  input: {
    backgroundColor: 'gray',
  }as React.CSSProperties,
}

// Skapa en funktion som genererar alla list-items
// TODO: Fix typings here
const generateListItems = (list: any, type:'setlist'|'song') => {
  return list.map((item: Setlist | Song) => {
    return <ListItem to={`/${type}/${item.id}`} type={type}>{item.title}</ListItem>
  });
}


// Create a function which exports so that otehrs can reach
export const Search: FC<Props> = ({isSearching, setlists, songs}) => {
  const [list, setList] = useState<Song[]>(songs);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

// Lägg in grejen som givet en lista filtrar och sparar enligt input.
  setList(songs.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase())))
  console.log(songs.filter((item) => item.title.includes(inputValue)))
  }

// Lägg till inputs, lista mm här
return <div style={searchStyles.container}>
  <div style={searchStyles.input}>
    <Input autoFocus onChange={onInputChange}/>
  </div>
  <div style={searchStyles.list}>
  {generateListItems(list, 'song')}
  </div>
</div>  
}




// Create input field

