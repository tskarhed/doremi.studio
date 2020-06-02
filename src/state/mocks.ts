import { Song, Setlist } from "./types";

export const mockSongs: Song[] = [
    {
        title: "Dåne liksom åskan",
        id: "dane-liksom-askan",
        notes: ["D3", "F#3", "A3"]
    },
    {
        title: "Norrland",
        id: "norrland",
        notes: ["Bb4"],
    },
    {
        title: "High Barbary",
        id: "high-barbary",
        notes: ["B2", "E3"],
    },
    {
        title: "Erlaube mir",
        id: "erlaube-mir",
        notes: ["B4", "D#4"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Madrigal (Kom du ljuva)",
        id: "kom-du-ljuva",
        notes: ["Db3", "Ab3", "F3", "Db4"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Kristallen den fina",
        id: "kristallen-den-fina",
        notes: ["A4", "A3"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Gute Nacth (Warum bist du so ferne)",
        id: "gute-nacht",
        notes: ["C3", "C3"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Serenad (Stjärnorna tindra)",
        id: "stjarnorna-tindra",
        notes: ["E3", "C4", "A4", "A4"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Jag vet en dejlig rosa",
        id: "jag-vet-en-deijlig-rosa",
        notes: ["G2","G3","B4","D4"],
        setlists: [
            "serenader"
        ]
    },
    {
        title: "Helan",
        id: "helan",
        notes: ["C#2","A3"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Halvan",
        id: "halvan",
        notes: ["Eb3"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Tersen",
        id: "tersen",
        notes: ["d4"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Skänklåt",
        id: "skanklat",
        notes: ["G4"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Metsämiehen juomalaulu",
        id: "metsa",
        notes: ["a"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Das königslied (Ein könig ist der wein)",
        id: "das-konigslied",
        notes: ["a"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Svensk punschsång (gott så in i norden)",
        id: "svensk-punschsang",
        notes: ["F#4", "C#4", "A#3", "F3"],
        setlists: [
            "bordsvisor"
        ]
    },
    {
        title: "Nubbejojk (brandbil brandbil)",
        id: "nubbejojk",
        notes: ["E3"],
        setlists: [
            "klassiker"
        ]
    }

];

export const mockSetlists: Setlist[] = [
    {
        title: "Fina klassiker",
        id: "klassiker",
        songs: [
            "dane-liksom-askan",
            "norrland",
            "high-barbary",
            "nubbejojk"
        ]
    },
    {
        title: "Serenader",
        id: "serenader",
        songs: [
            "kristallen-den-fina",
            "kom-du-ljuva",
            "erlaube-mir",
            "gute-nacht",
            "stjarnorna-tindra",
            "jag-vet-en-deijlig-rosa"
        ]
    },
    {
        title: "Bordsvisor",
        id: "bordsvisor",
        songs: [
            "helan",
            "halvan",
            "tersen",
            "skanklat",
            "metsa",
            "das-konigslied",
            "svensk-punschsong"
        ]
    }
];