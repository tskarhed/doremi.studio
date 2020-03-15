import { Song, Setlist } from "./types";

export const mockSongs: Song[] = [
    {
        title: "Song 1",
        id: "song1",
        notes: ["B4", "B3", "A3", "C2", "E4", "F4", "G#3"],
    },
    {
        title: "Song 2",
        id: "song2",
        notes: ["B4", "B3"],
    },
    {
        title: "Song 3",
        id: "song3",
        notes: ["B4", "B3"],
    },
    {
        title: "Song 4",
        id: "song4",
        notes: ["B4", "B3"],
    }

];

export const mockSetlists: Setlist[] = [
    {title: "Setlist  dawqwdaw  1", id: "setlist1", songs: ["song1", "song2", "song4"]},
    {title: "Setlist 2", id: "setlist2", songs: ["song3", "song2", "song4"]},
    {title: "Setlist 3", id: "setlist3", songs: ["song1", "song2"]}
];