import { useState, useMemo } from 'react'
import { wordBasket, shuffle } from '../data'
import { useStore } from '../store'
import { playFlip, playCorrect } from '../sounds'

export default function FlashcardScreen({ onBack }) {
  const { store, update } = useStore()
  const learnedSet = useMemo(() => new Set(store.flashcardsLearned), [store.flashcardsLearned])

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [filter, setFilter] = useState('all')
  const [cards, setCards] = useState(wordBasket)
  const [searchQ, setSearchQ] = useState('')

  const filtered = useMemo(() => {
    let list = cards
    if (filter === 'unlearned') list = list.filter(c => !learnedSet.has(c.word))
    if (searchQ) list = list.filter(c => c.word.includes(searchQ.toUpperCase()))
    return list
  }, [cards, filter, learnedSet, searchQ])

  const card = filtered[Math.min(index, filtered.length - 1)] || wordBasket[0]

  const flip = () => { setFlipped(f => !f); playFlip() }

  const markLearned = () => {
    if (learnedSet.has(card.word)) return
    playCorrect()
    update(prev => ({
      ...prev,
      flashcardsLearned: [...prev.flashcardsLearned, card.word],
      xp: prev.xp + 2,
    }))
    next()
  }

  const next = () => {
    setFlipped(false)
    setTimeout(() => setIndex(i => Math.min(i + 1, filtered.length - 1)), 150)
  }

  const prev = () => {
    setFlipped(false)
    setTimeout(() => setIndex(i => Math.max(0, i - 1)), 150)
  }

  const doShuffle = () => { setCards(shuffle(wordBasket)); setIndex(0); setFlipped(false) }

  const isLearned = learnedSet.has(card.word)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white p-1 hover:text-white/80 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="font-display text-2xl text-white flex-1">Word Cards</h2>
        <span className="text-white/70 text-sm font-bold">{learnedSet.size}/100 ⭐</span>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-5 max-w-lg mx-auto w-full">
        {/* Controls */}
        <div className="flex gap-2 w-full mb-3">
          <input
            type="text" placeholder="Search..." value={searchQ}
            onChange={e => { setSearchQ(e.target.value); setIndex(0); setFlipped(false) }}
            className="flex-1 rounded-xl px-3 py-2.5 text-sm font-bold bg-white/20 text-white placeholder-white/50 border border-white/30 focus:bg-white/30"
          />
          <button
            onClick={() => { setFilter(f => f === 'all' ? 'unlearned' : 'all'); setIndex(0); setFlipped(false) }}
            className={`px-3 py-2 rounded-xl text-sm font-bold border transition ${filter === 'unlearned' ? 'bg-yellow-400 text-yellow-900 border-yellow-300' : 'bg-white/20 text-white border-white/30'}`}
          >
            {filter === 'unlearned' ? '📚 To Learn' : '🌟 All'}
          </button>
          <button onClick={doShuffle} className="px-3 py-2 rounded-xl bg-white/20 text-white border border-white/30 text-sm font-bold hover:bg-white/30 transition">🔀</button>
        </div>

        {/* Progress */}
        <div className="w-full mb-3">
          <div className="flex justify-between text-white/60 text-xs font-bold mb-1">
            <span>Card {Math.min(index + 1, filtered.length)} of {filtered.length}</span>
            <span>{learnedSet.size} learned · +2 XP each</span>
          </div>
          <div className="bg-white/20 rounded-full h-2">
            <div className="bg-yellow-400 rounded-full h-2 transition-all" style={{ width: `${(learnedSet.size / 100) * 100}%` }} />
          </div>
        </div>

        {filtered.length > 0 ? (
          <>
            {/* Flashcard */}
            <div className="flip-card w-full h-60 mb-4 cursor-pointer" onClick={flip}>
              <div className={`flip-card-inner w-full h-full relative ${flipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="flip-card-front absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6">
                  {isLearned && <div className="absolute top-4 left-4 text-2xl">⭐</div>}
                  <div className="font-display text-4xl md:text-5xl text-purple-700 text-center mb-2">{card.word}</div>
                  <p className="text-gray-400 text-sm font-semibold mt-3">Tap to see meaning →</p>
                  <div className="absolute top-4 right-4 bg-purple-100 text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {wordBasket.findIndex(w => w.word === card.word) + 1}/100
                  </div>
                </div>
                {/* Back */}
                <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl flex flex-col justify-center p-6 text-white">
                  <div className="font-display text-2xl mb-2">{card.word}</div>
                  <p className="text-white/90 text-base leading-relaxed mb-3 font-semibold">{card.meaning}</p>
                  <div className="bg-white/20 rounded-xl px-3 py-2">
                    <p className="text-white/80 text-sm italic">"{card.example}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-3 w-full mb-3">
              <button onClick={prev} disabled={index === 0} className="flex-1 py-3 bg-white/20 text-white rounded-2xl font-bold disabled:opacity-40 hover:bg-white/30 transition">← Prev</button>
              <button onClick={flip} className="flex-1 py-3 bg-white text-purple-700 rounded-2xl font-bold shadow-lg hover:shadow-xl transition text-sm">
                {flipped ? '🔄 Flip Back' : '👀 See Meaning'}
              </button>
              <button onClick={next} disabled={index >= filtered.length - 1} className="flex-1 py-3 bg-white/20 text-white rounded-2xl font-bold disabled:opacity-40 hover:bg-white/30 transition">Next →</button>
            </div>

            {!isLearned ? (
              <button onClick={markLearned} className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl py-3.5 font-bold text-base shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95">
                ⭐ I Know This Word! (+2 XP)
              </button>
            ) : (
              <div className="w-full text-center bg-emerald-100 text-emerald-700 rounded-2xl py-3 font-bold">✅ Learned! Great job!</div>
            )}
          </>
        ) : (
          <div className="text-center text-white py-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-display text-3xl mb-2">All Done!</p>
            <button onClick={() => { setFilter('all'); setIndex(0) }} className="mt-4 bg-white text-purple-700 rounded-2xl px-6 py-3 font-bold">See All Cards</button>
          </div>
        )}

        {/* Word grid */}
        <div className="mt-5 w-full">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">All 100 Words</p>
          <div className="flex flex-wrap gap-1.5">
            {wordBasket.map((w, i) => (
              <button key={w.word}
                onClick={() => { const fi = filtered.findIndex(f => f.word === w.word); if (fi >= 0) { setIndex(fi); setFlipped(false) } else { setFilter('all'); setIndex(i); setFlipped(false) } }}
                className={`text-xs px-2 py-0.5 rounded-lg font-bold border transition ${learnedSet.has(w.word) ? 'bg-emerald-400/30 border-emerald-400/50 text-emerald-200' : card.word === w.word ? 'bg-yellow-400 border-yellow-300 text-yellow-900' : 'bg-white/15 border-white/20 text-white/70 hover:bg-white/25'}`}>
                {w.word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
