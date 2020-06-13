import React, { FC } from 'react';
import { SearchState, Setlist, Song } from '../state/types';
import {ListItem} from './List';

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




// Lägg till inputs, lista mm här
return <div style={searchStyles.container}>
  
  <div style={searchStyles.list}>
  {generateListItems(songs, 'song')}
  </div>
</div>  
}




// Create input field

