import { Sequence, Transport, sampler, Ticks } from "./synth";

export class Note {
  constructor(private noteString: string) {}

  play() {
    sampler.triggerAttackRelease(this.noteString, "4n");
  }
}

export class ToneSequence {
  constructor(private notes: string[], private onNoteStart?: Function) {}
  play() {
    const sequence = new Sequence(
      (time: string, note: string) => {
        this.onNoteStart && this.onNoteStart(note, Ticks(time).toMilliseconds);
        console.log(note, Ticks(time).toFrequency());
        sampler.triggerAttackRelease(note, "4n");
      },
      this.notes,
      "4n"
    );
    sequence.loop = false;
    sequence.start();
    Transport.start();
  }
}
