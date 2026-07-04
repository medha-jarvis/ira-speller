import { useState } from 'react'
import { useStore } from '../store'
import { StellaFace } from '../components/Stella'

const AVATARS = ['⭐', '🦋', '🦄', '🐬', '🦊', '🐉', '🦁', '🌈']
const GOALS = [
  { mins: 5,  label: '5 minutes',  desc: 'Just a quick practise',  emoji: '🌱' },
  { mins: 10, label: '10 minutes', desc: 'A good daily session',    emoji: '🌟' },
  { mins: 15, label: '15 minutes', desc: 'Serious practice mode!',  emoji: '🚀' },
]

export default function OnboardingScreen({ onComplete }) {
  const { update } = useStore()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('⭐')
  const [goal, setGoal] = useState(10)

  const steps = [
    { title: 'Welcome!',       subtitle: 'Your spelling adventure starts here!' },
    { title: 'What\'s your name?', subtitle: 'I\'ll cheer you on every step!' },
    { title: 'Pick your avatar!', subtitle: 'Choose your lucky symbol!' },
    { title: 'Set your daily goal', subtitle: 'How long will you practise each day?' },
  ]

  const finish = () => {
    update({
      name: name.trim() || 'Ira',
      avatar,
      dailyGoalMinutes: goal,
      onboarded: true,
    })
    onComplete()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-white' : i < step ? 'w-2 bg-white/60' : 'w-2 bg-white/25'}`} />
        ))}
      </div>

      {/* Step 0 — Welcome */}
      {step === 0 && (
        <div className="text-center screen-enter max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <StellaFace state="excited" size={120} />
          </div>
          <div className="bg-white/15 rounded-3xl px-4 py-2 mb-4 inline-block">
            <p className="text-white/80 text-sm font-bold">⭐ MASTER SPELLERS 2026-27 · GRADE 2 BETA</p>
          </div>
          <h1 className="font-display text-5xl text-white mb-3">Ira's Spell Lab!</h1>
          <p className="text-white/80 text-lg font-semibold mb-8">
            Learn grammar, practise spelling, and earn amazing badges! Let's set you up!
          </p>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-white text-purple-700 font-display text-2xl py-4 rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-105 active:scale-95"
          >
            Let's go! 🚀
          </button>
        </div>
      )}

      {/* Step 1 — Name */}
      {step === 1 && (
        <div className="text-center screen-enter max-w-sm w-full">
          <div className="flex justify-center mb-4">
            <StellaFace state="thinking" size={90} />
          </div>
          <h2 className="font-display text-4xl text-white mb-2">{steps[1].title}</h2>
          <p className="text-white/70 text-base font-semibold mb-8">{steps[1].subtitle}</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type your name..."
            maxLength={20}
            className="w-full bg-white rounded-2xl px-6 py-4 text-2xl font-display text-purple-700 text-center shadow-xl mb-6 focus:outline-none focus:ring-4 focus:ring-white/50"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && setStep(2)}
          />
          {name.trim() && (
            <p className="text-yellow-300 font-bold text-lg mb-4 animate-[bounceIn_0.3s_ease-out]">
              Hi {name.trim()}! Great to meet you! 👋
            </p>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="flex-1 py-3 bg-white/20 text-white font-bold rounded-2xl hover:bg-white/30 transition">← Back</button>
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 bg-white text-purple-700 font-bold rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Avatar */}
      {step === 2 && (
        <div className="text-center screen-enter max-w-sm w-full">
          <div className="flex justify-center mb-4">
            <div className="text-7xl animate-bounce">{avatar}</div>
          </div>
          <h2 className="font-display text-4xl text-white mb-2">{steps[2].title}</h2>
          <p className="text-white/70 font-semibold mb-6">{steps[2].subtitle}</p>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-4xl rounded-2xl py-3 transition-all ${avatar === a ? 'bg-white shadow-xl scale-110' : 'bg-white/20 hover:bg-white/35 hover:scale-105'}`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white/20 text-white font-bold rounded-2xl hover:bg-white/30 transition">← Back</button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-white text-purple-700 font-bold rounded-2xl shadow-lg hover:shadow-xl transition">Next →</button>
          </div>
        </div>
      )}

      {/* Step 3 — Daily goal */}
      {step === 3 && (
        <div className="text-center screen-enter max-w-sm w-full">
          <div className="flex justify-center mb-4">
            <StellaFace state="happy" size={80} />
          </div>
          <h2 className="font-display text-4xl text-white mb-2">{steps[3].title}</h2>
          <p className="text-white/70 font-semibold mb-6">{steps[3].subtitle}</p>
          <div className="space-y-3 mb-8">
            {GOALS.map(g => (
              <button
                key={g.mins}
                onClick={() => setGoal(g.mins)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  goal === g.mins ? 'bg-white border-white text-purple-700 scale-102' : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                }`}
              >
                <span className="text-3xl">{g.emoji}</span>
                <div className="text-left">
                  <div className="font-bold text-lg">{g.label}</div>
                  <div className="text-sm opacity-70">{g.desc}</div>
                </div>
                {goal === g.mins && <span className="ml-auto text-emerald-600 font-black">✓</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 bg-white/20 text-white font-bold rounded-2xl hover:bg-white/30 transition">← Back</button>
            <button onClick={finish} className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-display text-xl rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-105 active:scale-95">
              Let's Spell! ⭐
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
