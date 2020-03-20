import { Song, Setlist } from "./types";

export const mockSongs: Song[] = [
    {
        title: "Dåne liksom åskan",
        id: "song1",
        notes: ["D3", "F#3", "A3"]
    },
    {
        title: "Norrland",
        id: "song2",
        notes: ["Bb4"],
    },
    {
        title: "High Barbary",
        id: "song3",
        notes: ["B2", "E3"],
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