import { SongId, AddNote, UpdateNote, DeleteNote, UpdateSongTitle, CreateSong, SetlistId, DeleteSong, UpdateSetlistTitle, CreateSetlist, DeleteSetlist, AddSongToSetlist, SearchState, SetSearchState } from "./types";

// Notes


export const addNote = (note: string, songId: SongId):AddNote => ({type: "ADD_NOTE", note, songId  });
export const updateNote = (note: string, index: number, songId: SongId): UpdateNote => ({type: "UPDATE_NOTE", index, note, songId});
export const deleteNote = (index: number, songId: SongId): DeleteNote => ({type: "DELETE_NOTE", index, songId});


//Song
export const updateSongTitle = (title: string, songId: SongId): UpdateSongTitle => ({type: "UPDATE_SONG_TITLE", title, songId});
export const createSong = (title: string, setlist?: SetlistId): CreateSong => ({type: "CREATE_SONG", id: encodeURI(title), setlist, title});

//Songs
export const deleteSong = (id: SongId): DeleteSong => ({type: "DELETE_SONG", id});

//Setlist
export const updateSetlistTitle = (title: string): UpdateSetlistTitle => ({type: "UPDATE_SETLIST_TITLE", title});
export const addSongToSetlist = (song: SongId, setlist: SetlistId): AddSongToSetlist => ({type: "ADD_SONG_TO_SETLIST", setlist, song});


//Setlists
export const createSetlist = (title: string): CreateSetlist => ({type: "CREATE_SETLIST", title, id: encodeURIComponent(title)})
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