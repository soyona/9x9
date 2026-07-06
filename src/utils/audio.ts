type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

let sharedContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  if (sharedContext?.state === "closed") {
    sharedContext = null;
  }

  const AudioContextConstructor =
    window.AudioContext ?? (window as AudioWindow).webkitAudioContext;

  if (!AudioContextConstructor) return null;

  sharedContext ??= new AudioContextConstructor();
  return sharedContext;
}

function scheduleSine(
  context: AudioContext,
  frequency: number,
  startOffset: number,
  duration: number,
  peakGain: number,
) {
  const startsAt = context.currentTime + startOffset;
  const endsAt = startsAt + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startsAt);

  gain.gain.setValueAtTime(0.0001, startsAt);
  gain.gain.exponentialRampToValueAtTime(
    peakGain,
    startsAt + Math.min(0.018, duration * 0.18),
  );
  gain.gain.exponentialRampToValueAtTime(0.0001, endsAt);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startsAt);
  oscillator.stop(endsAt + 0.02);
}

function playSequence(
  notes: ReadonlyArray<{
    frequency: number;
    offset: number;
    duration: number;
    gain: number;
  }>,
) {
  const context = getAudioContext();
  if (!context) return;

  const schedule = () => {
    notes.forEach((note) =>
      scheduleSine(
        context,
        note.frequency,
        note.offset,
        note.duration,
        note.gain,
      ),
    );
  };

  if (context.state === "suspended") {
    void context.resume().then(schedule).catch(() => undefined);
    return;
  }

  schedule();
}

export function playCorrect() {
  playSequence([
    { frequency: 659.25, offset: 0, duration: 0.16, gain: 0.055 },
    { frequency: 880, offset: 0.09, duration: 0.22, gain: 0.06 },
  ]);
}

export function playLevelComplete() {
  playSequence([
    { frequency: 523.25, offset: 0, duration: 0.3, gain: 0.045 },
    { frequency: 659.25, offset: 0.1, duration: 0.32, gain: 0.048 },
    { frequency: 783.99, offset: 0.2, duration: 0.36, gain: 0.05 },
    { frequency: 1046.5, offset: 0.32, duration: 0.56, gain: 0.055 },
  ]);
}
