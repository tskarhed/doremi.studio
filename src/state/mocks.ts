import { Song, Setlist } from './types';

export const mockSongs: Song[] = [
  {
    uid: 'dåne',
    shortUID: 'dåne',
    title: 'Dåne liksom åskan',
    notes: ['D3', 'F#3', 'A3'],
    lyrics: `Dåne liksom åskan, bröder,
    Högt vår fosterländska sång.
    Pulsen brinner, hjertat glöder;
    Marsch framåt ännu en gång!
    Sångens ädla känslor föder,
    Hjertats nyckel heter sång.
    Må vi då i toner svära
    Trohetseden hand i hand:
    Lif och blod för Sveriges ära!
    Hell! Vårt dyra fosterland!
    Lif och blod för Sveriges ära,
    Svära
    Trogne bröder hand i hand.`,
  },
  {
    uid: 'norrland',
    shortUID: 'norrland',
    title: 'Norrland',
    notes: ['Bb4'],
    lyrics: `Vaktat av de vita fjällar och de mörka furors krans,
    vilar nu i vårens kvällar Norrland i sin fägrings glans.
    Sagoland där älven blänker. Svanen glänser i det blå.
    Framtidsland som skatter skänker tag vårt löfte då.
    Ljus dit upp vi vilja sprida, odla byggd, och bryta mark,
    och vid dina älvar strida stå som skyddsvakt stolt och starkt.
    Norrland, Norrland, Du skall tona rikt på nya släktens sång.
    Och i Sveriges kungakrona pärlan varder du en gång.`,
  },
  {
    uid: 'high-barbary',
    shortUID: 'high-barbary',
    title: 'High Barbary',
    notes: ['B2', 'E3'],
  },
  {
    uid: 'erlaube-mir',
    shortUID: 'erlaube-mir',
    title: 'Erlaube mir',
    notes: ['F3'],
  },
  {
    uid: 'kom-du-ljuva',
    shortUID: 'kom-du-ljuva',
    title: 'Madrigal (Kom du ljuva)',
    notes: ['Db3', 'F3', 'Ab3', 'Db4'],
  },
  {
    uid: 'kristallen-den-fina',
    shortUID: 'kristallen-den-fina',
    title: 'Kristallen den fina',
    notes: ['A2', 'A3'],
  },
  {
    uid: 'gute-nacht',
    shortUID: 'gute-nacht',

    title: 'Gute Nacth (Warum bist du so ferne)',
    notes: ['C4'],
  },
  {
    uid: 'stjarnorna-tindra',
    shortUID: 'stjarnorna-tindra',
    title: 'Serenad (Stjärnorna tindra)',
    notes: ['A2', 'A3', 'C4', 'E4'],
  },
  {
    uid: 'jag-vet-en-dejlig-rosa',
    shortUID: 'jag-vet-en-dejlig-rosa',
    title: 'Jag vet en dejlig rosa',
    notes: ['G2', 'G3', 'B3', 'D4'],
  },
  {
    uid: 'helan',
    shortUID: 'helan',
    title: 'Helan',
    notes: ['A3', 'C#4'],
  },
  {
    uid: 'halvan',
    shortUID: 'halvan',
    title: 'Halvan',
    notes: ['Eb3'],
  },
  {
    uid: 'tersen',
    shortUID: 'tersen',
    title: 'Tersen',
    notes: ['D4'],
  },
  {
    uid: 'skanklat',
    shortUID: 'sknklat',
    title: 'Skänklåt',
    notes: ['G3'],
  },
  {
    uid: 'metsa',
    shortUID: 'metsa',
    title: 'Metsämiehen juomalaulu',
    notes: ['A3'],
  },
  {
    uid: 'das-konigslied',
    shortUID: 'kristallen-den-fina',
    title: 'Das königslied (Ein könig ist der wein)',
    notes: ['A3'],
  },
  {
    uid: 'svensk-punschsang',
    shortUID: 'svensk-punschsang',
    title: 'Svensk punschsång (gott så in i norden)',
    notes: ['F3', 'A3', 'C4', 'F4'],
  },
  {
    uid: 'nubbejojk',
    shortUID: 'nubbejojk',
    title: 'Nubbejojk (brandbil brandbil)',
    notes: ['E3'],
  },
];

export const mockSetlists: Setlist[] = [
  {
    uid: 'fina-klassiker',
    shortUID: 'fina-klassiker',
    title: 'Fina klassiker',
    id: 'klassiker',
    songs: ['dane-liksom-askan', 'norrland', 'high-barbary', 'nubbejojk'],
  },
  {
    uid: 'serenader',
    shortUID: 'serenader',
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
    uid: 'bordsvisor',
    shortUID: 'bordsvisor',
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
