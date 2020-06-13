import { Sequence, Transport, sampler, Ticks } from './synth';

export class Note {
  constructor(private noteString: string) {}

  play() {
    sampler.triggerAttackRelease(this.noteString, '4n');
  }
}

export class ToneSequence {
  constructor(
    private notes: string[],
    private onNoteChange?: (note: string, duration: number) => void
  ) {}
  play() {
    const noteLength = '4n';
    const sequence = new Sequence(
      (time: string, note: string) => {
        this.onNoteChange &&
          this.onNoteChange(note, Ticks(noteLength).toSeconds());
        console.log(note, Ticks(time).toFrequency());
        sampler.triggerAttackRelease(note, noteLength);
      },
      this.notes,
      noteLength
    );
    sequence.loop = false;
    sequence.start();
    Transport.start();
  }
}
