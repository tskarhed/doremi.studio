import React from 'react';
import { SearchState, Setlist, Song } from '../state/types';
import CreatableSelect from 'react-select/creatable';
import { setlists } from '../mockData';

interface Props{
    isSearching: SearchState;
    setlists: Setlist[];
    songs: Song[];
}

interface Option {
    value: string;
    label: string;
    type: "song" | "setlist";
}

const customStyles = {
    container: (provided: any, state: any) => ({
        ...provided,
        position: "fixed",
        top: "0",
        width: "100%"
    })
};


export class Search extends React.PureComponent<Props>{
    private options: Option[] = [];
    constructor(props: Props){
        super(props);
        if(props.isSearching === "songs"){
            this.options = this.songsToOptions(props.songs);
        } else if(props.isSearching === "setlists"){
            this.options = this.setlistsToOptions(props.setlists);
        } else {
            this.options = [...this.setlistsToOptions(props.setlists), ...this.songsToOptions(props.songs)];
        }

    }

    
    songsToOptions = (songs: Song[]): Option[] => {
        return songs.map(song => ({value: song.id, label: song.title, type: "song" }))
    }
    setlistsToOptions = (songs: Setlist[]): Option[] => {
        return setlists.map(setlist => ({value: setlist.id, label: setlist.title, type: "setlist" }))
    }

    render(){
        return (<CreatableSelect styles={customStyles} options={this.options}/>);
    }
}