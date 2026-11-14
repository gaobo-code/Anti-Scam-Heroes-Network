// A quiet original piano-like theme, with a slow melody and broken chords.
const melody = [69, 72, 76, 72, 67, 71, 74, 71, 65, 69, 72, 69, 64, 67, 71, 67,
  69, 72, 77, 76, 74, 71, 67, 71, 72, 69, 65, 64, 69, 67, 64, 69];
const chords = [[45, 52, 57], [43, 50, 55], [41, 48, 53], [40, 47, 52],
  [41, 48, 53], [43, 50, 55], [41, 48, 53], [45, 52, 57]];

export function startMemorialMusic() {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = .65;
  master.connect(context.destination);
  let disposed = false;
  let step = 0;
  let nextNote = context.currentTime + .08;

  function note(midi: number, at: number, volume: number, duration = 3.6) {
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    // A soft fundamental and two quiet overtones give each note a warmer attack.
    [1, 2, 3].forEach((harmonic, index) => {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.frequency.value = frequency * harmonic;
      const level = volume * [1, .20, .06][index];
      envelope.gain.setValueAtTime(0, at);
      envelope.gain.linearRampToValueAtTime(level, at + .035);
      envelope.gain.exponentialRampToValueAtTime(.0001, at + duration);
      oscillator.connect(envelope).connect(master);
      oscillator.start(at);
      oscillator.stop(at + duration + .05);
      oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
    });
  }

  function schedule() {
    if (disposed || context.state !== "running") return;
    if (nextNote < context.currentTime) nextNote = context.currentTime + .05;
    while (nextNote < context.currentTime + .3) {
      const position = step % melody.length;
      const chord = chords[Math.floor(position / 4)];
      note(melody[position], nextNote, .055);
      if (position % 4 === 0) note(chord[0], nextNote, .035, 4.8);
      note(chord[1 + position % 2], nextNote, .018, 3);
      step++;
      nextNote += 1.1;
    }
  }

  function resume(event?: Event) {
    if (disposed || context.state === "closed") return;
    if (event?.target instanceof Element && event.target.closest(".music-toggle")) return;
    void context.resume().then(schedule).catch(() => {});
  }

  context.onstatechange = schedule;
  const timer = window.setInterval(schedule, 150);
  window.addEventListener("pointerdown", resume);
  window.addEventListener("keydown", resume);
  resume();

  return () => {
    disposed = true;
    window.clearInterval(timer);
    window.removeEventListener("pointerdown", resume);
    window.removeEventListener("keydown", resume);
    context.onstatechange = null;
    master.disconnect();
    void context.close().catch(() => {});
  };
}
