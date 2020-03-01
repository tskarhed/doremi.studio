import { Sequence, Transport, sampler, Ticks } from "./synth";

export class Note {
  constructor(private noteString: string) {}

  play() {
    sampler.triggerAttackRelease(this.noteString, "4n");
  }
}

export class ToneSequence {
  constructor(
    private notes: string[],
    private onNoteChange?: (note: string, duration?: number) => void
  ) {}
  play() {
    const sequence = new Sequence(
      (time: string, note: string) => {
        this.onNoteChange &&
          this.onNoteChange(note, Ticks(time).toMilliseconds);
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
