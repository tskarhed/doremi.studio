import Tone, {
  Sequence,
  Transport,
  Sampler,
  Ticks
  // @ts-ignore
} from "tone";

// Used to avoid lag on mobile
Tone.context.latencyHint = "fastest";
// Audio files courtesy of:
//https://github.com/googlecreativelab/aiexperiments-ai-duet/blob/master/static/audio/Salamander_README
const getSampleUrl = (note: string) =>
  `https://raw.githubusercontent.com/googlecreativelab/aiexperiments-ai-duet/master/static/audio/Salamander/${note}.mp3`;

export const constructLinkObject = () => {
  let linkObject: { [key: string]: string } = {};
  const notes = ["A", "C"];
  for (let i = 0; i < 8; i++) {
    notes.forEach(note => {
      linkObject[note + i] = getSampleUrl(note + i);
    });
  }
  return linkObject;
};

console.log(constructLinkObject());

const sampler = new Sampler(constructLinkObject(), () =>
  console.log("Sampler initialized")
).toMaster();

export const playNote = (noteString: string) => {
  sampler.triggerAttackRelease(noteString, "4n");
};

export const playSequence = (
  notes: string[],
  onNoteChange?: (note: string, duration: number) => void
) => {
  const noteLength = "4n";
  const sequence = new Sequence(
    (time: string, note: string) => {
      onNoteChange && onNoteChange(note, Ticks(noteLength).toSeconds());
      console.log(note, Ticks(time).toFrequency());
      sampler.triggerAttackRelease(note, noteLength);
    },
    notes,
    noteLength
  );
  sequence.loop = false;
  sequence.start();
  Transport.start();
};

export { sampler, Sequence, Transport, Sampler, Ticks };
