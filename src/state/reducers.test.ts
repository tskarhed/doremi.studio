import { notes, song, setlist, setlists, songs, isSearching } from './reducers';
import { reducerTestFactory } from './testUtil';
import { Notes, Song, Setlist } from './types';
import { mockSetlists, mockSongs } from './mocks'

describe("Test test util reudcerTestFactory", () => {
    
    it("Test util should fail if state is mutated", () => {
        const failingReducer = (prevState: Notes, _action: any) => {
            prevState.push("D2");
            return prevState;
        }
        let reducerTest = reducerTestFactory(["any"], failingReducer);         
        expect(() => {
            reducerTest({});
        }).toThrowError();
    });

});


describe("Notes reducer", () => {
    let initialNotesState: Notes;
    let reducerTest: Function;
    beforeEach(() => {
        initialNotesState = ["A4", "D#2", "D4", "D4"];
        reducerTest = reducerTestFactory(initialNotesState, notes);
    })

    describe("actions", ()=> {
        it("add note", () => {
            expect(reducerTest({type: "ADD_NOTE", note: "D3"})).toEqual([...initialNotesState, "D3"])
        });
        it("remove note", () => {
            expect(reducerTest({type: "DELETE_NOTE", index: 2})).toEqual(["A4", "D#2", "D4"])
        });
        it("update note", () => {
            expect(reducerTest({type: "UPDATE_NOTE", index: 2, note:"D5"})).toEqual(["A4", "D#2", "D5", "D4"])
        });
        it("random action returns default", () => {
            expect(reducerTest({type: "WHAT_IS_THIS", index: 2, note:"D5"})).toEqual(["A4", "D#2", "D4", "D4"])
        });
    });


});

describe("Song reducer", () => {
    let initialSongState: Song;
    let reducerTest: Function;
    beforeEach(() => {
        initialSongState = {id: "", notes: ["B3"], title: "My title"};
        reducerTest = reducerTestFactory(initialSongState, song);
    });

    it("update song title", () => {
        expect(reducerTest({type: "UPDATE_SONG_TITLE", title: "New title"}).title).toEqual("New title")
    });

    it("create new song", () => {
        expect(reducerTest({type: "CREATE_SONG", id: "newSong", title: "awesome"})).toEqual({title: "awesome", notes:[], id: "newSong", setlists: []})
    });

});

describe("Setlist reducer", () => {
    let initSetlistState: Setlist;
    let reducerTest: Function;
    beforeEach(() => {
        initSetlistState = { id: "whatever", title: "My setlist", songs: ["id1", "id2"]}
        reducerTest = reducerTestFactory(initSetlistState, setlist);
    });
    
    it("add song", () => {
        expect(reducerTest({type: "ADD_SONG_TO_SETLIST", song: "id3", setlist: ""}).songs).toEqual(["id1", "id2", "id3"]);
    });
    it("remove song", () => {
        expect(reducerTest({type: "REMOVE_SONG", index: 1}).songs).toEqual(["id1"]);
    });
    it("create new empty setlist", () => {
        expect(reducerTest({type: "CREATE_SETLIST", id: "song52"})).toEqual({ id: "song52", title: "", songs: []})
    });
    
    it("creates new song assigned to setlist", () => {
        expect(reducerTest({type: "CREATE_SONG", id: "song9", setlist: "whatever"}).songs).toEqual(["id1", "id2", "song9"]);
    });

    
    it("doesn't add new song when setlist is not the id", () => {
        expect(reducerTest({type: "CREATE_SONG", id: "song9", setlist: "whatever1"}).songs).toEqual(["id1", "id2"]);
        expect(reducerTest({type: "CREATE_SONG", id: "song9"}).songs).toEqual(["id1", "id2"]);
    });
    
});

describe("Setlists reducer", () => {
    let reducerTest: Function;

    beforeEach(() => {
        reducerTest = reducerTestFactory(mockSetlists, setlists);
    });
    it("adds new empty setlist to end of array", () => {
        expect(reducerTest({type: "CREATE_SETLIST", id: "song52"})).toEqual([...mockSetlists,{ id: "song52", title: "", songs: []}])
    });
    it("returns prevState for unknown action", () => {
        expect(reducerTest({type: "RANDOM_ACTION", id: "song52"})).toEqual(mockSetlists);
    });

    it("deletes setlist", () => {
        expect(reducerTest({type: "DELETE_SETLIST", id: mockSetlists[0].id}).length).toEqual(mockSetlists.length-1);
    });
    
});

describe("Song reducer", () => {
    let reducerTest: Function;

    beforeEach(() => {
        reducerTest = reducerTestFactory(mockSongs, songs);
    });
    it("creates a song without assigned setlist", () => {
        expect(reducerTest({type: "CREATE_SONG", id: "newSong"})).toEqual([...mockSongs, {title: "", notes:[], id: "newSong", setlists:[]}])
    })
    it("creates a song with assigned setlist", () => {
        expect(reducerTest({type: "CREATE_SONG", id: "newSong", setlist: "setlist1"})).toEqual([...mockSongs, {title: "", notes:[], id: "newSong", setlists:["setlist1"]}])
    })
    it("deletes song", () => {
        expect(reducerTest({type: "DELETE_SONG", id: mockSongs[0].id}).length).toEqual(mockSongs.length-1)
    });

    it("returns prevState for unknown action", () => {
        expect(reducerTest({type: "RANDOM_ACTION", id: "song52"})).toEqual(mockSongs);
    });
})

describe("Toggle searching", () => {
    let reducerTest: Function;

    beforeEach(() => {
        reducerTest = reducerTestFactory(false, isSearching);
    });

    it("handle random action", () => {
        expect(reducerTest({type: "RANDOM_ACTION"})).toEqual(false);
    });
    it("all", () => {
        expect(reducerTest({type: "SEARCH_ALL"})).toEqual("all");
    });
    
    it("songs", () => {
        expect(reducerTest({type: "SEARCH_SETLISTS"})).toEqual("setlists");
    });
    
    it("setlists", () => {
        expect(reducerTest({type: "SEARCH_SONGS"})).toEqual("songs");
    });

    it("reset search", () => {
        expect(reducerTest({type: "SEARCH_NONE"})).toEqual(false);
    });
})
