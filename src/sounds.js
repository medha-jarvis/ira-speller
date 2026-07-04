// Web Audio API sound effects — no external dependencies
let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function beep(freq, duration, type = 'sine', volume = 0.3) {
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + duration)
  } catch {}
}

export function playCorrect() {
  beep(523, 0.1)
  setTimeout(() => beep(659, 0.1), 100)
  setTimeout(() => beep(784, 0.2), 200)
}

export function playWrong() {
  beep(220, 0.15, 'sawtooth', 0.2)
  setTimeout(() => beep(180, 0.15, 'sawtooth', 0.2), 150)
}

export function playTick() {
  beep(880, 0.05, 'square', 0.1)
}

export function playVictory() {
  const notes = [523, 659, 784, 1047]
  notes.forEach((n, i) => setTimeout(() => beep(n, 0.15), i * 120))
}

export function playFlip() {
  beep(440, 0.08, 'sine', 0.15)
}
