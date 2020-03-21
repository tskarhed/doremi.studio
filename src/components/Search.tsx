import React, { FC, Dispatch } from 'react';
import { SearchState, Setlist, Song, SetSearchState } from '../state/types';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import theme from '../theme.module.scss'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { View } from '../native';
import styles from "./List.module.scss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMusic, faListUl } from '@fortawesome/free-solid-svg-icons';
import { setSearch } from '../state/actions';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps<any>{
    isSearching: SearchState;
    setlists: Setlist[];
    songs: Song[];
}

interface DispatchProps {
    resetSearch: () => void;
}

type AllProps = Props & DispatchProps;

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
    indicatorContainer: () => ({color: theme.secondary})
};

const Option: FC<any> = (props: any) => {
    const { children, data, ...rest} = props;
    // const { data, innerRef,  } = props;
    // const { type, value } = props.data;
    // return (<ListItem onClick={props.onClick} ref={props.innerRef} to={`/${type}/${value}`} type={type}>{props.children}</ListItem>)
    return <components.Option {...rest} className={styles.wrapper}>
        {data.type && <View className={styles.type}><Icon icon={data.type === "song" ? faMusic : faListUl}/></View>}
        <View className={styles.children}>{children}</View>
    </components.Option>
};


export class Search extends React.PureComponent<AllProps>{
    private options: Option[] = [];
    constructor(props: AllProps){
        super(props);
        if(props.isSearching === "songs"){
            this.options = this.songsToOptions(props.songs);
        } else if(props.isSearching === "setlists"){
            this.options = this.setlistsToOptions(props.setlists);
        } else {
            this.options = [...this.setlistsToOptions(props.setlists), ...this.songsToOptions(props.songs)];
        }

    }

    onSelect = (val: any) => {
        console.log(val);
        const { history } = this.props;  
        history.push(`/${val.type}/${val.value}`);
        this.props.resetSearch();
    }

    
    songsToOptions = (songs: Song[]): Option[] => {
        return songs.map(song => ({value: song.id, label: song.title, type: "song" }))
    }
    setlistsToOptions = (setlists: Setlist[]): Option[] => {
        return setlists.map(setlist => ({value: setlist.id, label: setlist.title, type: "setlist" }))
    }

    render(){
        return (<CreatableSelect autoFocus onBlur={() => this.props.resetSearch()} components={{Option}} placeholder="Search..." openMenuOnFocus onChange={this.onSelect} styles={customStyles} options={this.options}/>);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<SetSearchState>) => ({
    resetSearch: () => dispatch(setSearch(false))
})

export default withRouter(connect(null, mapDispatchToProps)(Search));