import { useEffect, useRef } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function HomeScreen({ onNavigate }) {
  const bgRef = useRef(null)

  // Create floating letters (replicating the book cover design)
  useEffect(() => {
    const container = bgRef.current
    if (!container) return
    container.innerHTML = ''
    const letters = 'NSZXDUHADGAQCJMRKHBTWGFNZYFUMJNSEQ'
    letters.split('').forEach((letter, i) => {
      const el = document.createElement('span')
      el.className = 'float-letter'
      el.textContent = letter
      const size = 24 + Math.random() * 48
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${size}px;
        color: white;
        animation-duration: ${8 + Math.random() * 12}s;
        animation-delay: ${-Math.random() * 15}s;
        font-weight: bold;
      `
      container.appendChild(el)
    })
  }, [])

  const modes = [
    {
      id: 'learn',
      icon: '📖',
      title: 'Learn',
      subtitle: 'Grammar rules & spelling tips',
      gradient: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-300',
      navigateTo: 'learn',
    },
    {
      id: 'flashcards',
      icon: '🔤',
      title: 'Word Cards',
      subtitle: '100 words with meanings',
      gradient: 'from-purple-400 to-purple-600',
      shadow: 'shadow-purple-300',
      navigateTo: 'flashcards',
    },
    {
      id: 'practice',
      icon: '✏️',
      title: 'Practice',
      subtitle: 'No timer · hints available',
      gradient: 'from-emerald-400 to-emerald-600',
      shadow: 'shadow-emerald-300',
      navigateTo: 'practice',
      opts: { round: null },
    },
    {
      id: 'quiz',
      icon: '🏆',
      title: 'Quiz Time!',
      subtitle: 'Timed · competition mode',
      gradient: 'from-orange-400 to-rose-500',
      shadow: 'shadow-orange-300',
      navigateTo: 'quiz',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      {/* Floating letter background */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-lg screen-enter">
        {/* Header badge */}
        <div className="text-center mb-6">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30 mb-4">
            ⭐ MASTER SPELLERS 2026-27 · GRADE 2 BETA
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2 drop-shadow-lg">
            Ira's Spell Lab
          </h1>
          <p className="text-white/80 text-lg font-semibold">
            Choose how you want to learn today!
          </p>
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onNavigate(mode.navigateTo, mode.opts || {})}
              className={`mode-card bg-gradient-to-br ${mode.gradient} rounded-2xl p-5 text-white shadow-xl ${mode.shadow} border-0 text-left`}
            >
              <div className="text-4xl mb-2">{mode.icon}</div>
              <div className="font-display text-xl leading-tight">{mode.title}</div>
              <div className="text-white/80 text-xs mt-1 font-semibold">{mode.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Round quick-access */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3">Quick Practice by Round</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { n: 1, label: 'Common Errors', emoji: '🔍' },
              { n: 2, label: 'Scrambled Words', emoji: '🔀' },
              { n: 3, label: 'Correct Spelling', emoji: '🔤' },
              { n: 4, label: 'Spell The Word', emoji: '🗣️' },
            ].map(({ n, label, emoji }) => (
              <button
                key={n}
                onClick={() => onNavigate('practice', { round: n })}
                className="bg-white/20 hover:bg-white/35 text-white rounded-xl p-2.5 text-center transition-all hover:scale-105 active:scale-95 border border-white/20"
              >
                <div className="text-xl mb-1">{emoji}</div>
                <div className="font-display text-sm">Round {n}</div>
                <div className="text-white/70 text-xs leading-tight mt-0.5 hidden md:block">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/50 text-xs text-center mt-4">
          4 Rounds · 30 Questions Each · 100 Word Basket Words
        </p>
      </div>
    </div>
  )
}
