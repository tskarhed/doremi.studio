// @ts-ignore
import { Monophonic as Synth, Sequence, Transport, Sampler, Ticks } from "tone";

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

const synth = new Synth().toMaster();
const sampler = new Sampler(constructLinkObject(), () =>
  console.log("Sampler initialized")
).toMaster();

const getSynth = () => synth;

export { getSynth, sampler, Sequence, Transport, Sampler, Ticks };
