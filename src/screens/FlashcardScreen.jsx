import { useState, useMemo } from 'react'
import { wordBasket, shuffle } from '../data'
import { playFlip, playCorrect } from '../sounds'

export default function FlashcardScreen({ onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learned, setLearned] = useState(new Set())
  const [filter, setFilter] = useState('all') // 'all' | 'unlearned'
  const [cards, setCards] = useState(wordBasket)
  const [searchQ, setSearchQ] = useState('')

  const filtered = useMemo(() => {
    let list = cards
    if (filter === 'unlearned') list = list.filter((_, i) => !learned.has(cards[i].word))
    if (searchQ) list = list.filter(c => c.word.includes(searchQ.toUpperCase()))
    return list
  }, [cards, filter, learned, searchQ])

  const card = filtered[index] || wordBasket[0]

  const flip = () => { setFlipped(f => !f); playFlip() }

  const markLearned = () => {
    playCorrect()
    setLearned(prev => new Set([...prev, card.word]))
    next()
  }

  const next = () => {
    setFlipped(false)
    setTimeout(() => setIndex(i => (i + 1) % Math.max(filtered.length, 1)), 150)
  }

  const prev = () => {
    setFlipped(false)
    setTimeout(() => setIndex(i => (i - 1 + filtered.length) % Math.max(filtered.length, 1)), 150)
  }

  const doShuffle = () => {
    setCards(shuffle(wordBasket))
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white p-1 hover:text-white/80 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-display text-2xl text-white flex-1">Word Cards</h2>
        <span className="text-white/70 text-sm font-bold">{learned.size}/100 learned ⭐</span>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full">
        {/* Controls row */}
        <div className="flex gap-2 w-full mb-4">
          <input
            type="text"
            placeholder="Search word..."
            value={searchQ}
            onChange={e => { setSearchQ(e.target.value); setIndex(0); setFlipped(false) }}
            className="flex-1 rounded-xl px-3 py-2 text-sm font-bold bg-white/20 text-white placeholder-white/50 border border-white/30 focus:bg-white/30"
          />
          <button
            onClick={() => { setFilter(f => f === 'all' ? 'unlearned' : 'all'); setIndex(0); setFlipped(false) }}
            className={`px-3 py-2 rounded-xl text-sm font-bold border transition ${filter === 'unlearned' ? 'bg-yellow-400 text-yellow-900 border-yellow-300' : 'bg-white/20 text-white border-white/30'}`}
          >
            {filter === 'unlearned' ? '📚 To Learn' : '🌟 All'}
          </button>
          <button onClick={doShuffle} className="px-3 py-2 rounded-xl bg-white/20 text-white border border-white/30 text-sm font-bold hover:bg-white/30 transition">
            🔀
          </button>
        </div>

        {/* Progress */}
        <div className="text-white/70 text-sm font-bold mb-4">
          Card {Math.min(index + 1, filtered.length)} of {filtered.length}
          {filtered.length === 0 && ' — all learned! 🎉'}
        </div>

        {/* Flashcard */}
        {filtered.length > 0 ? (
          <>
            <div className="flip-card w-full h-64 mb-6 cursor-pointer" onClick={flip}>
              <div className={`flip-card-inner w-full h-full relative ${flipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="flip-card-front absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6">
                  <div className="font-display text-4xl md:text-5xl text-purple-700 text-center mb-2">{card.word}</div>
                  <p className="text-gray-400 text-sm font-semibold mt-4">Tap to see the meaning →</p>
                  <div className="absolute top-3 right-3 bg-purple-100 text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {wordBasket.findIndex(w => w.word === card.word) + 1}/100
                  </div>
                  {learned.has(card.word) && (
                    <div className="absolute top-3 left-3 text-xl">⭐</div>
                  )}
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

            {/* Navigation */}
            <div className="flex items-center gap-4 w-full justify-between mb-4">
              <button onClick={prev} className="bg-white/20 hover:bg-white/35 text-white rounded-2xl px-5 py-3 font-bold transition">← Prev</button>
              <button onClick={flip} className="bg-white text-purple-700 rounded-2xl px-5 py-3 font-bold shadow-lg hover:shadow-xl transition text-sm">
                {flipped ? '🔄 Flip Back' : '👀 See Meaning'}
              </button>
              <button onClick={next} className="bg-white/20 hover:bg-white/35 text-white rounded-2xl px-5 py-3 font-bold transition">Next →</button>
            </div>

            {/* Mark learned */}
            {!learned.has(card.word) ? (
              <button
                onClick={markLearned}
                className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl py-3 font-bold text-base shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95"
              >
                ⭐ I Know This Word!
              </button>
            ) : (
              <div className="w-full text-center bg-emerald-100 text-emerald-700 rounded-2xl py-3 font-bold">
                ✅ Learned! Great job!
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white py-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-display text-3xl mb-2">All Done!</p>
            <p className="text-white/80">You've learned all the words in this filter!</p>
            <button onClick={() => { setFilter('all'); setIndex(0) }} className="mt-4 bg-white text-purple-700 rounded-2xl px-6 py-3 font-bold">
              See All Cards
            </button>
          </div>
        )}

        {/* Word list preview */}
        <div className="mt-6 w-full">
          <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">All 100 Words</p>
          <div className="flex flex-wrap gap-1.5">
            {wordBasket.map((w, i) => (
              <button
                key={w.word}
                onClick={() => {
                  const fi = filtered.findIndex(f => f.word === w.word)
                  if (fi >= 0) { setIndex(fi); setFlipped(false) }
                  else { setFilter('all'); setIndex(i); setFlipped(false) }
                }}
                className={`text-xs px-2 py-0.5 rounded-lg font-bold border transition ${
                  learned.has(w.word)
                    ? 'bg-emerald-400/30 border-emerald-400/50 text-emerald-200'
                    : card.word === w.word
                    ? 'bg-yellow-400 border-yellow-300 text-yellow-900'
                    : 'bg-white/15 border-white/20 text-white/70 hover:bg-white/25'
                }`}
              >
                {w.word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
