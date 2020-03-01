// @ts-ignore
import { Synth, Sequence, Transport } from "tone";

const synth = new Synth().toMaster();

const getSynth = () => synth;

export { getSynth, Sequence, Transport };
