import React, { FC } from 'react';
import { SearchState, Setlist, Song } from '../state/types';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import theme from '../theme.module.scss'
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { View } from '../native';
import styles from "./List.module.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMusic, faListUl } from '@fortawesome/free-solid-svg-icons';
import { setSearch, createSong, createSetlist, addSongToSetlist } from '../state/actions';
import {  useDispatch } from 'react-redux';

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
    // Container that holds everything together
    container: (provided: any, state: any) => ({
        ...provided,
        position: "fixed",
        top: "0",
        width: "100%",
        color: theme.secondary,
        backgroundColor: theme.accent,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
    }),
    // The input itself
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: 0,
        border: "none",
        backgroundColor: theme.accent,
        height: "10vh",
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: theme.secondary,
    }),
    input: (provided: any) => ({
        ...provided,
        color: theme.secondary,
    }),
    singleValue: (provided: any) => ({
        ...provided,
        fontFamily: theme.fontFamily,
        color: theme.secondary,
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: theme.primary,
        borderRadius: 0,
        marginTop: 0,
        height: "auto",
        maxHeight: "90vh",
    }),
    option: () => ({}),
    menuList: (provided: any) => ({...provided, maxHeight: "none"}),
    indicatorContainer: () => ({color: theme.secondary}),
    noOptionsMessage: () => ({})
};

const Option: FC<any> = (props: any) => {
    const { children, data, ...rest} = props;
    return <components.Option {...rest} className={styles.wrapper}>
        {data.type && <View className={styles.type}><Icon icon={data.type === "song" ? faMusic : faListUl}/></View>}
        <View className={styles.children}>{children}</View>
    </components.Option>
};

const NoOptionsMessage: FC<any> = (props: any) => (
    <View className={styles.wrapper}>
        <View className={styles.children}>Start typing to create magic!</View>
    </View>
);

const songsToOptions = (songs: Song[]): Option[] => {
    return songs.map(song => ({value: song.id, label: song.title, type: "song" }))
}
const setlistsToOptions = (setlists: Setlist[]): Option[] => {
    return setlists.map(setlist => ({value: setlist.id, label: setlist.title, type: "setlist" }))
}


export const Search: FC<Props> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    let location = useLocation();
    let createLabel = (inputValue: string) => `New setlist: ${inputValue}`;

    let options: Option[] = [];
    let onCreate: (inputVal: string) => void;

    const onSelect = (val: any) => {
        if(props.isSearching === "songs"){
            const params = matchPath<{setlistName: string}>(location.pathname, {
                path: "/setlist/:setlistName",
            })?.params;
            const setlistName = params?.setlistName || '';
            dispatch(addSongToSetlist(val.value, setlistName));
            dispatch(setSearch(false));
            return;
        }

        history.push(`/${val.type}/${val.value}`);
        dispatch(setSearch(false));
    }

    const onCreateSong = (songName: string) => {
        const params = matchPath<{setlistName: string}>(location.pathname, {
            path: "/setlist/:setlistName",
        })?.params;
        const setlistName = params?.setlistName;
        //Dispatch action
        dispatch(createSong(songName, setlistName));
        //Reroute to song
        history.push(`/song/${createSong(songName).id}`);
        dispatch(setSearch(false));
    }

    const onCreateSetlist = (setlistName: string) => {
        dispatch(createSetlist(setlistName));
        history.push(`/setlist/${createSetlist(setlistName).id}`);
        dispatch(setSearch(false));
    }

    if(props.isSearching === "songs"){
        options = songsToOptions(props.songs);
        createLabel = (inputValue: string) => `New song: ${inputValue}`;
        onCreate = onCreateSong;
    } else if(props.isSearching === "setlists"){
        // No options as you only want  to create a setlist
        // options = setlistsToOptions(props.setlists);
        onCreate = onCreateSetlist;
    } else {
        options = [...songsToOptions(props.songs), ...setlistsToOptions(props.setlists)];
        onCreate = onCreateSetlist;
    }


    

    return (
    <CreatableSelect
    autoFocus
    onCreateOption={onCreate}
    onBlur={() => dispatch(setSearch(false))}
    components={{Option, NoOptionsMessage}}
    placeholder="Search..."
    openMenuOnFocus
    onChange={onSelect}
    styles={customStyles}
    options={options}
    formatCreateLabel={createLabel}
    />);

}
