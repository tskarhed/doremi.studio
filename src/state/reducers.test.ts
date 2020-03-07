import { notes, song, setlist, setlists, songs } from './reducers';
import { reducerTestFactory } from './testUtil';
import { Notes, Song, Setlist } from './types';
import { mockSetlists, mockSongs } from './mocks'


describe("Notes reducer", () => {
    let initialNotesState: Notes;
    let reducerTest: Function;
    beforeEach(() => {
        initialNotesState = ["A4", "D#2", "D4", "D4"];
        reducerTest = reducerTestFactory(initialNotesState);
    })
    
    it("Test util should fail if state is mutated", () => {
        const failingReducer = (prevState: Notes, _action: any) => {
            prevState.push("D2");
            return prevState;
        }
        expect(() => {
            reducerTest(failingReducer, {});
        }).toThrowError();
    });

    describe("actions", ()=> {
        it("add note", () => {
            expect(reducerTest(notes, {type: "ADD_NOTE", note: "D3"})).toEqual([...initialNotesState, "D3"])
        });
        it("remove note", () => {
            expect(reducerTest(notes, {type: "DELETE_NOTE", index: 2})).toEqual(["A4", "D#2", "D4"])
        });
        it("update note", () => {
            expect(reducerTest(notes, {type: "UPDATE_NOTE", index: 2, note:"D5"})).toEqual(["A4", "D#2", "D5", "D4"])
        });
        it("random action returns default", () => {
            expect(reducerTest(notes, {type: "WHAT_IS_THIS", index: 2, note:"D5"})).toEqual(["A4", "D#2", "D4", "D4"])
        });
    });


});

describe("Song reducer", () => {
    let initialSongState: Song;
    let reducerTest: Function;
    beforeEach(() => {
        initialSongState = {id: "", notes: ["B3"], title: "My title"};
        reducerTest = reducerTestFactory(initialSongState);
    });

    it("update song title", () => {
        expect(reducerTest(song, {type: "UPDATE_SONG_TITLE", title: "New title"}).title).toEqual("New title")
    });

    it("create new song", () => {
        expect(reducerTest(song, {type: "CREATE_SONG", id: "newSong"})).toEqual({title: "", notes:[], id: "newSong"})
    });

});

describe("Setlist reducer", () => {
    let initSetlistState: Setlist;
    let reducerTest: Function;
    beforeEach(() => {
        initSetlistState = { id: "whatever", title: "My setlist", songs: ["id1", "id2"]}
        reducerTest = reducerTestFactory(initSetlistState);
    });
    
    it("add song", () => {
        expect(reducerTest(setlist, {type: "ADD_SONG_TO_SETLIST", song: "id3", setlist: ""}).songs).toEqual(["id1", "id2", "id3"]);
    });
    it("remove song", () => {
        expect(reducerTest(setlist, {type: "REMOVE_SONG", index: 1}).songs).toEqual(["id1"]);
    });
    it("create new empty setlist", () => {
        expect(reducerTest(setlist, {type: "CREATE_SETLIST", id: "song52"})).toEqual({ id: "song52", title: "", songs: []})
    });
    
    it("creates new song assigned to setlist", () => {
        expect(reducerTest(setlist, {type: "CREATE_SONG", id: "song9", setlist: "whatever"}).songs).toEqual(["id1", "id2", "song9"]);
    });

    
    it("doesn't add new song when setlist is not the id", () => {
        expect(reducerTest(setlist, {type: "CREATE_SONG", id: "song9", setlist: "whatever1"}).songs).toEqual(["id1", "id2"]);
        expect(reducerTest(setlist, {type: "CREATE_SONG", id: "song9"}).songs).toEqual(["id1", "id2"]);
    });
    
});

describe("Setlists reducer", () => {
    let reducerTest: Function;

    beforeEach(() => {
        reducerTest = reducerTestFactory(mockSetlists);
    });
    it("adds new empty setlist to end of array", () => {
        expect(reducerTest(setlists, {type: "CREATE_SETLIST", id: "song52"})).toEqual([...mockSetlists,{ id: "song52", title: "", songs: []}])
    });
    it("returns prevState for unknown action", () => {
        expect(reducerTest(setlists, {type: "RANDOM_ACTION", id: "song52"})).toEqual(mockSetlists);
    });

    it("deletes setlist", () => {
        expect(reducerTest(setlists, {type: "DELETE_SETLIST", id: "setlist1"}).length).toEqual(mockSetlists.length-1);
    });
    
});

describe("Song reducer", () => {
    let reducerTest: Function;

    beforeEach(() => {
        reducerTest = reducerTestFactory(mockSongs);
    });
    it("creates a song without assigned setlist", () => {
        expect(reducerTest(songs, {type: "CREATE_SONG", id: "newSong"})).toEqual([...mockSongs, {title: "", notes:[], id: "newSong"}])
    })
    it("creates a song without assigned setlist", () => {
        expect(reducerTest(songs, {type: "CREATE_SONG", id: "newSong", setlist: "setlist1"})).toEqual([...mockSongs, {title: "", notes:[], id: "newSong"}])
    })
    it("deletes song", () => {
        expect(reducerTest(songs, {type: "DELETE_SONG", id: "song1"}).length).toEqual(mockSongs.length-1)
    });

    it("returns prevState for unknown action", () => {
        expect(reducerTest(songs, {type: "RANDOM_ACTION", id: "song52"})).toEqual(mockSongs);
    });
})