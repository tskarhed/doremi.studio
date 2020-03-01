import { getSynth, Sequence, Transport } from "./synth";

export class Note {
  constructor(private noteString: string) {}

  play() {
    getSynth().triggerAttackRelease(this.noteString, "4n");
  }
}

export class ToneSequence {
  constructor(private notes: string[]) {
    console.log(this.notes);
    const sequence = new Sequence(
      (time: string, note: string) => {
        console.log(note, time);
        getSynth().triggerAttackRelease(note, "4n");
      },
      this.notes,
      "4n"
    );
    sequence.loop = false;
    sequence.start();
  }
  play() {
    Transport.start();
  }
}
