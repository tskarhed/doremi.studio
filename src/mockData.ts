interface Setlist {
  title: string;
  songs: Song[];
  id: string;
}

interface Song {
  id: string;
  title: string;
  notes: string[];
}

export const songs: Song[] = [
  {
    title: "High Barbary",
    id: encodeURI("High Barbary"),
    notes: ["B4", "E4"]
  },
  {
    title: "Dåne liksom åskan",
    id: encodeURI("Dåne liksom åskan"),
    notes: ["D4", "F#4", "A5"]
  },
  {
    title: "Norrland",
    id: encodeURI("Norrland"),
    notes: ["Bb4"]
  }
];

export const setlists: Setlist[] = [
  {
    title: "Feb 26 på TD-galan",
    songs: songs,
    id: encodeURI("Feb 26 på TD-galan")
  },
  {
    title: "Barhäng med grabbarna",
    songs: songs,
    id: encodeURI("Barhäng med grabbarna")
  },
  {
    title: "Viktig sjunging (mycket para)",
    songs: songs,
    id: encodeURI("Viktig sjunging (mycket para)")
  },
  {
    title: "Alla hjärtans dag - Serenader",
    songs: songs,
    id: encodeURI("Alla hjärtans dag - Serenader")
  }
];
