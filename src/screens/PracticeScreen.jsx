import { useState } from 'react'
import { commonErrors, scrambledWords, correctSpelling, wordBasket } from '../data'
import { playCorrect, playWrong } from '../sounds'

const ROUNDS = [
  { n: 1, label: 'Common Errors',      emoji: '🔍', color: 'from-blue-400 to-blue-600',        desc: '30 questions' },
  { n: 2, label: 'Scrambled Words',    emoji: '🔀', color: 'from-purple-400 to-purple-600',     desc: '30 words' },
  { n: 3, label: 'Correct Spelling',   emoji: '✏️', color: 'from-emerald-400 to-emerald-600',   desc: '30 questions' },
  { n: 4, label: 'Spell The Word',     emoji: '🗣️', color: 'from-orange-400 to-rose-500',      desc: '100 words' },
]

export default function PracticeScreen({ round: initialRound, onBack }) {
  const [round, setRound] = useState(initialRound)
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState(null) // {correct, selectedIndex}
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [scrambleInput, setScrambleInput] = useState('')
  const [scrambleResult, setScrambleResult] = useState(null) // null | 'correct' | 'wrong'
  const [spellInput, setSpellInput] = useState('')
  const [spellResult, setSpellResult] = useState(null)

  if (round === null) {
    return <RoundSelector onSelect={setRound} onBack={onBack} />
  }

  const resetQ = () => {
    setAnswered(null)
    setShowHint(false)
    setScrambleInput('')
    setScrambleResult(null)
    setSpellInput('')
    setSpellResult(null)
  }

  const next = () => {
    resetQ()
    const maxIndex = round === 4 ? wordBasket.length : 29
    if (qIndex < maxIndex) setQIndex(i => i + 1)
    else setQIndex(0) // loop
  }

  const prev = () => {
    resetQ()
    const maxIndex = round === 4 ? wordBasket.length - 1 : 29
    setQIndex(i => Math.max(0, i - 1))
  }

  const changeRound = (n) => { setRound(n); setQIndex(0); resetQ(); setScore(0); setTotal(0) }

  const onCorrect = () => { setScore(s => s + 1); setTotal(t => t + 1) }
  const onWrong  = () => { setTotal(t => t + 1) }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setRound(null)} className="text-white p-1 hover:text-white/80 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-display text-xl text-white flex-1">
          Round {round}: {ROUNDS[round - 1].label}
        </h2>
        {total > 0 && (
          <span className="text-white font-bold text-sm">
            {score}/{total}
          </span>
        )}
      </div>

      {/* Round tabs */}
      <div className="flex gap-1.5 px-4 pt-3 pb-1 overflow-x-auto">
        {ROUNDS.map(r => (
          <button
            key={r.n}
            onClick={() => changeRound(r.n)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-bold transition ${
              round === r.n ? 'bg-white text-purple-700' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {r.emoji} Round {r.n}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${((qIndex + 1) / (round === 4 ? 100 : 30)) * 100}%` }}
            />
          </div>
          <span className="text-white/70 text-xs font-bold">
            {qIndex + 1}/{round === 4 ? 100 : 30}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full">
        {round === 1 && (
          <CommonErrorsQ
            q={commonErrors[qIndex]}
            answered={answered}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            onAnswer={(selected) => {
              const correct = selected === commonErrors[qIndex].answerIndex
              setAnswered({ correct, selectedIndex: selected })
              if (correct) { playCorrect(); onCorrect() } else { playWrong(); onWrong() }
            }}
          />
        )}
        {round === 2 && (
          <ScrambledQ
            q={scrambledWords[qIndex]}
            input={scrambleInput}
            setInput={setScrambleInput}
            result={scrambleResult}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            onSubmit={() => {
              const correct = scrambleInput.trim().toUpperCase() === scrambledWords[qIndex].answer
              setScrambleResult(correct ? 'correct' : 'wrong')
              if (correct) { playCorrect(); onCorrect() } else { playWrong(); onWrong() }
            }}
          />
        )}
        {round === 3 && (
          <SpellingChoiceQ
            q={correctSpelling[qIndex]}
            answered={answered}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            onAnswer={(selected) => {
              const correct = selected === correctSpelling[qIndex].answerIndex
              setAnswered({ correct, selectedIndex: selected })
              if (correct) { playCorrect(); onCorrect() } else { playWrong(); onWrong() }
            }}
          />
        )}
        {round === 4 && (
          <SpellWordQ
            q={wordBasket[qIndex]}
            input={spellInput}
            setInput={setSpellInput}
            result={spellResult}
            showHint={showHint}
            onShowHint={() => setShowHint(true)}
            onSubmit={() => {
              const correct = spellInput.trim().toUpperCase() === wordBasket[qIndex].word
              setSpellResult(correct ? 'correct' : 'wrong')
              if (correct) { playCorrect(); onCorrect() } else { playWrong(); onWrong() }
            }}
          />
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={prev}
            disabled={qIndex === 0}
            className="flex-1 py-3 rounded-2xl bg-white/20 text-white font-bold disabled:opacity-40 hover:bg-white/30 transition"
          >
            ← Prev
          </button>
          <button
            onClick={next}
            className="flex-1 py-3 rounded-2xl bg-white text-purple-700 font-bold hover:shadow-lg transition"
          >
            Next →
          </button>
        </div>

        {/* Practice stats */}
        {total > 0 && (
          <div className="mt-4 bg-white/10 rounded-2xl p-3 flex items-center justify-between">
            <span className="text-white/80 text-sm font-bold">Practice Score</span>
            <span className="text-white font-display text-xl">{score}/{total}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function RoundSelector({ onSelect, onBack }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white p-1"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
        <h2 className="font-display text-2xl text-white">Practice</h2>
      </div>
      <div className="flex-1 p-4 max-w-lg mx-auto w-full screen-enter">
        <p className="text-white/80 font-bold mb-4">Choose a round to practice:</p>
        <div className="space-y-3">
          {ROUNDS.map(r => (
            <button
              key={r.n}
              onClick={() => onSelect(r.n)}
              className={`w-full bg-gradient-to-r ${r.color} rounded-2xl p-5 text-left text-white shadow-xl flex items-center gap-4 mode-card`}
            >
              <span className="text-4xl">{r.emoji}</span>
              <div>
                <div className="font-display text-xl">Round {r.n}: {r.label}</div>
                <div className="text-white/70 text-sm">{r.desc} · No timer · Hints available</div>
              </div>
              <span className="ml-auto text-white/60 text-2xl">›</span>
            </button>
          ))}
        </div>
        <div className="mt-4 bg-white/10 rounded-2xl p-3">
          <p className="text-white/70 text-xs text-center">💡 Practice mode has no timer and hints are available. Use Quiz mode for competition practice!</p>
        </div>
      </div>
    </div>
  )
}

// ── Round 1: Common Errors ─────────────────────────────────
function CommonErrorsQ({ q, answered, showHint, onShowHint, onAnswer }) {
  return (
    <div className="space-y-4 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">Round 1 · Common Errors</span>
          {answered && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${answered.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{answered.correct ? '✓ Correct!' : '✗ Wrong'}</span>}
        </div>
        <p className="text-gray-500 text-sm mb-3 font-semibold">Find the part with an error:</p>
        <div className="bg-gray-50 rounded-2xl p-4 text-center mb-4">
          <p className="text-gray-800 text-lg font-bold leading-relaxed">
            {q.parts.map((part, i) => (
              <span key={i}>
                <span className={`${answered ? (i === q.answerIndex ? 'text-emerald-600 font-black underline decoration-2' : 'text-gray-500') : 'text-gray-800'}`}>{part}</span>
                {i < 2 && <span className="text-gray-400 mx-1">/</span>}
              </span>
            ))}
          </p>
        </div>
        <div className="space-y-2">
          {q.parts.map((part, i) => {
            const letter = ['a', 'b', 'c'][i]
            let state = ''
            if (answered) {
              if (i === q.answerIndex) state = 'correct'
              else if (i === answered.selectedIndex) state = 'wrong'
            }
            return (
              <button
                key={i}
                onClick={() => !answered && onAnswer(i)}
                disabled={!!answered}
                className={`answer-btn w-full text-left px-4 py-3 rounded-xl border-2 font-bold text-base flex items-center gap-3 ${state} ${!answered ? 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50' : 'border-transparent'}`}
              >
                <span className="text-gray-400 font-display text-lg w-6 flex-shrink-0">{letter.toUpperCase()}</span>
                <span>{part}</span>
              </button>
            )
          })}
        </div>
      </div>

      {answered && (
        <div className={`rounded-2xl p-4 ${answered.correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="font-bold text-gray-800 mb-1">
            {answered.correct ? '🌟 Great!' : '💡 The error was in part ' + ['a', 'b', 'c'][q.answerIndex].toUpperCase() + ':'}
          </p>
          <p className="text-gray-600 text-sm mb-2">✏️ <span className="font-bold">Correction:</span> <span className="text-emerald-700 font-bold">{q.correction}</span></p>
          <p className="text-gray-600 text-sm mb-2">📝 <span className="font-bold">Correct sentence:</span> {q.correctSentence}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 mt-2">
            <p className="text-blue-800 text-sm"><span className="font-bold">Rule ({q.rule}):</span> {q.explanation}</p>
          </div>
        </div>
      )}

      {!answered && !showHint && (
        <button onClick={onShowHint} className="w-full py-2.5 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl text-yellow-200 font-bold text-sm hover:bg-yellow-400/30 transition">
          💡 Need a hint?
        </button>
      )}
      {showHint && !answered && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-3">
          <p className="text-yellow-800 text-sm font-bold">💡 Hint: Look at the <span className="font-black">{q.rule}</span> — {q.explanation.split('.')[0]}.</p>
        </div>
      )}
    </div>
  )
}

// ── Round 2: Scrambled Words ─────────────────────────────────
function ScrambledQ({ q, input, setInput, result, showHint, onShowHint, onSubmit }) {
  return (
    <div className="space-y-4 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">Round 2 · Scrambled Words</span>
          {result && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${result === 'correct' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{result === 'correct' ? '✓ Correct!' : '✗ Wrong'}</span>}
        </div>

        <p className="text-gray-500 text-sm mb-3 font-semibold">Rearrange to form a word (capital letters):</p>

        {/* Scrambled word display */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {q.scrambled.split('').map((letter, i) => (
            <span key={i} className="bg-purple-100 text-purple-700 font-display text-2xl w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-purple-200">
              {letter}
            </span>
          ))}
        </div>

        {/* Meaning */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <p className="text-blue-800 text-sm"><span className="font-bold">Meaning:</span> {q.meaning}</p>
        </div>

        {/* Input */}
        {!result && (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && input.trim() && onSubmit()}
              placeholder="Type your answer..."
              className="flex-1 border-2 border-purple-200 rounded-xl px-4 py-3 font-bold text-lg text-purple-700 focus:border-purple-500 uppercase"
              autoFocus
            />
            <button
              onClick={onSubmit}
              disabled={!input.trim()}
              className="bg-purple-600 text-white rounded-xl px-4 font-bold disabled:opacity-40 hover:bg-purple-700 transition"
            >
              Check
            </button>
          </div>
        )}

        {result && (
          <div className={`rounded-2xl p-4 mt-2 ${result === 'correct' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            {result === 'correct' ? (
              <p className="text-emerald-700 font-bold text-lg">🌟 {q.answer} — You got it!</p>
            ) : (
              <>
                <p className="text-red-600 font-bold mb-1">The answer is: <span className="text-2xl">{q.answer}</span></p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.answer.split('').map((letter, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-700 font-display text-xl w-9 h-9 rounded-xl flex items-center justify-center border border-emerald-200">{letter}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {!result && !showHint && (
        <button onClick={onShowHint} className="w-full py-2.5 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl text-yellow-200 font-bold text-sm hover:bg-yellow-400/30 transition">
          💡 Hint (first letter)
        </button>
      )}
      {showHint && !result && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-3">
          <p className="text-yellow-800 text-sm font-bold">💡 Hint: The word starts with <span className="text-2xl font-display text-yellow-900">{q.answer[0]}</span> and has {q.answer.length} letters.</p>
        </div>
      )}
    </div>
  )
}

// ── Round 3: Choose Correct Spelling ────────────────────────
function SpellingChoiceQ({ q, answered, showHint, onShowHint, onAnswer }) {
  return (
    <div className="space-y-4 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">Round 3 · Correct Spelling</span>
          {answered && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${answered.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{answered.correct ? '✓ Correct!' : '✗ Wrong'}</span>}
        </div>

        <p className="text-gray-500 text-sm mb-3 font-semibold">Choose the correctly spelled word:</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <p className="text-gray-800 text-lg font-bold text-center leading-relaxed">{q.sentence}</p>
        </div>

        <div className="space-y-2">
          {q.options.map((option, i) => {
            const letter = ['a', 'b', 'c'][i]
            let state = ''
            if (answered) {
              if (i === q.answerIndex) state = 'correct'
              else if (i === answered.selectedIndex) state = 'wrong'
            }
            return (
              <button
                key={i}
                onClick={() => !answered && onAnswer(i)}
                disabled={!!answered}
                className={`answer-btn w-full text-left px-4 py-3 rounded-xl border-2 font-bold text-base flex items-center gap-3 ${state} ${!answered ? 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50' : 'border-transparent'}`}
              >
                <span className="text-gray-400 font-display text-lg w-6 flex-shrink-0">{letter.toUpperCase()}</span>
                <span className="font-mono text-lg">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {answered && !answered.correct && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3">
          <p className="text-blue-800 text-sm font-bold">✏️ The correct spelling is: <span className="text-emerald-600 font-display text-xl">{q.options[q.answerIndex]}</span></p>
        </div>
      )}

      {!answered && !showHint && (
        <button onClick={onShowHint} className="w-full py-2.5 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl text-yellow-200 font-bold text-sm hover:bg-yellow-400/30 transition">
          💡 Hint (eliminate one wrong answer)
        </button>
      )}
      {showHint && !answered && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-3">
          <p className="text-yellow-800 text-sm font-bold">
            💡 The answer is NOT option {['a', 'b', 'c'].find((_, i) => i !== q.answerIndex).toUpperCase()}.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Round 4: Spell The Word ──────────────────────────────────
function SpellWordQ({ q, input, setInput, result, showHint, onShowHint, onSubmit }) {
  return (
    <div className="space-y-4 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">Round 4 · Spell The Word</span>
          {result && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${result === 'correct' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{result === 'correct' ? '✓ Correct!' : '✗ Wrong'}</span>}
        </div>

        <p className="text-gray-500 text-sm mb-3 font-semibold">Spell the word that means:</p>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-4 text-center">
          <p className="text-orange-900 text-xl font-bold leading-relaxed">{q.meaning}</p>
          <p className="text-orange-600 text-sm mt-2 italic">"{q.example}"</p>
        </div>

        {!result && (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && input.trim() && onSubmit()}
              placeholder="Type the spelling..."
              className="flex-1 border-2 border-orange-200 rounded-xl px-4 py-3 font-bold text-lg text-orange-700 focus:border-orange-500 uppercase"
              autoFocus
            />
            <button
              onClick={onSubmit}
              disabled={!input.trim()}
              className="bg-orange-500 text-white rounded-xl px-4 font-bold disabled:opacity-40 hover:bg-orange-600 transition"
            >
              Check
            </button>
          </div>
        )}

        {result && (
          <div className={`rounded-2xl p-4 mt-2 ${result === 'correct' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            {result === 'correct' ? (
              <p className="text-emerald-700 font-bold text-xl">🌟 {q.word} — Perfect spelling!</p>
            ) : (
              <>
                <p className="text-red-600 font-bold mb-2">The correct spelling is:</p>
                <div className="flex flex-wrap gap-1.5">
                  {q.word.split('').map((letter, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-700 font-display text-2xl w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-200">{letter}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {!result && !showHint && (
        <button onClick={onShowHint} className="w-full py-2.5 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl text-yellow-200 font-bold text-sm hover:bg-yellow-400/30 transition">
          💡 Hint (first letter)
        </button>
      )}
      {showHint && !result && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-3">
          <p className="text-yellow-800 text-sm font-bold">💡 The word starts with <span className="font-display text-2xl text-yellow-900">{q.word[0]}</span> and has {q.word.length} letters.</p>
        </div>
      )}
    </div>
  )
}
