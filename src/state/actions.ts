import { SongId, AddNote, UpdateNote, DeleteNote, UpdateSongTitle, CreateSong, SetlistId, DeleteSong, UpdateSetlistTitle, CreateSetlist, DeleteSetlist, AddSongToSetlist, SearchState, SetSearchState } from "./types";

// Notes


export const addNote = (note: string):AddNote => ({type: "ADD_NOTE", note  });
export const updateNote = (note: string, index: number): UpdateNote => ({type: "UPDATE_NOTE", index, note});
export const deleteNote = (index: number): DeleteNote => ({type: "DELETE_NOTE", index});


//Song
export const updateSongTitle = (title: string): UpdateSongTitle => ({type: "UPDATE_SONG_TITLE", title});
export const createSong = (id: SongId, setlist?: SetlistId): CreateSong => ({type: "CREATE_SONG", id, setlist});

//Songs
export const deleteSong = (id: SongId): DeleteSong => ({type: "DELETE_SONG", id});

//Setlist
export const updateSetlistTitle = (title: string): UpdateSetlistTitle => ({type: "UPDATE_SETLIST_TITLE", title});
export const addSongToSetlist = (song: SongId, setlist: SetlistId): AddSongToSetlist => ({type: "ADD_SONG_TO_SETLIST", setlist, song});


//Setlists
export const createSetlist = (id: SetlistId): CreateSetlist => ({type: "CREATE_SETLIST", id})
export const deleteSetlist = (id: SetlistId): DeleteSetlist => ({type: "DELETE_SETLIST", id})

//Search
export const setSearch = (state: SearchState): SetSearchState => {
    switch(state){
        case "all":
            return { type: "SEARCH_ALL"};
        case "setlists":
            return { type: "SEARCH_SETLISTS"};
        case "songs":
            return { type: "SEARCH_SONGS"};
        case false:
            default:
            return { type: "SEARCH_NONE"};
    }
}