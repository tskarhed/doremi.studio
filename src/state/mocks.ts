import { Song, Setlist } from './types';

export const mockSongs: Song[] = [
  {
    title: 'Dåne liksom åskan',
    id: 'dane-liksom-askan',
    notes: ['D3', 'F#3', 'A3'],
  },
  {
    title: 'Norrland',
    id: 'norrland',
    notes: ['Bb4'],
  },
  {
    title: 'High Barbary',
    id: 'high-barbary',
    notes: ['B2', 'E3'],
  },
  {
    title: 'Erlaube mir',
    id: 'erlaube-mir',
    notes: ['F3'],
    setlists: ['serenader'],
  },
  {
    title: 'Madrigal (Kom du ljuva)',
    id: 'kom-du-ljuva',
    notes: ['Db3', 'F3', 'Ab3', 'Db4'],
    setlists: ['serenader'],
  },
  {
    title: 'Kristallen den fina',
    id: 'kristallen-den-fina',
    notes: ['A2', 'A3'],
    setlists: ['serenader'],
  },
  {
    title: 'Gute Nacth (Warum bist du so ferne)',
    id: 'gute-nacht',
    notes: ['C3'],
    setlists: ['serenader'],
  },
  {
    title: 'Serenad (Stjärnorna tindra)',
    id: 'stjarnorna-tindra',
    notes: ['A2', 'A3', 'C4', 'E4'],
    setlists: ['serenader'],
  },
  {
    title: 'Jag vet en dejlig rosa',
    id: 'jag-vet-en-deijlig-rosa',
    notes: ['G2', 'G3', 'B3', 'D4'],
    setlists: ['serenader'],
  },
  {
    title: 'Helan',
    id: 'helan',
    notes: ['A3', 'A3', 'C#4'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Halvan',
    id: 'halvan',
    notes: ['Eb3'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Tersen',
    id: 'tersen',
    notes: ['D4'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Skänklåt',
    id: 'skanklat',
    notes: ['G3'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Metsämiehen juomalaulu',
    id: 'metsa',
    notes: ['A3'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Das königslied (Ein könig ist der wein)',
    id: 'das-konigslied',
    notes: ['A3'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Svensk punschsång (gott så in i norden)',
    id: 'svensk-punschsang',
    notes: ['F3', 'A3', 'C4', 'F4'],
    setlists: ['bordsvisor'],
  },
  {
    title: 'Nubbejojk (brandbil brandbil)',
    id: 'nubbejojk',
    notes: ['E3'],
    setlists: ['klassiker'],
  },
];

export const mockSetlists: Setlist[] = [
  {
    title: 'Fina klassiker',
    id: 'klassiker',
    songs: ['dane-liksom-askan', 'norrland', 'high-barbary', 'nubbejojk'],
  },
  {
    title: 'Serenader',
    id: 'serenader',
    songs: [
      'kristallen-den-fina',
      'kom-du-ljuva',
      'erlaube-mir',
      'gute-nacht',
      'stjarnorna-tindra',
      'jag-vet-en-deijlig-rosa',
    ],
  },
  {
    title: 'Bordsvisor',
    id: 'bordsvisor',
    songs: [
      'helan',
      'halvan',
      'tersen',
      'skanklat',
      'metsa',
      'das-konigslied',
      'svensk-punschsong',
    ],
  },
];
