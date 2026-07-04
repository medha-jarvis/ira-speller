import { useState, useEffect, useRef, useCallback } from 'react'
import { commonErrors, scrambledWords, correctSpelling, wordBasket, pickRandom } from '../data'
import { playCorrect, playWrong, playTick, playVictory } from '../sounds'
import { StellaReaction } from '../components/Stella'

const ROUND_CONFIGS = [
  { n: 1, label: 'Common Errors',    emoji: '🔍', gradient: 'from-blue-400 to-blue-600',    time: 30 },
  { n: 2, label: 'Scrambled Words',  emoji: '🔀', gradient: 'from-purple-400 to-purple-600',time: 40 },
  { n: 3, label: 'Correct Spelling', emoji: '✏️', gradient: 'from-emerald-400 to-teal-500', time: 25 },
  { n: 4, label: 'Spell The Word',   emoji: '🗣️', gradient: 'from-orange-400 to-rose-500',  time: 35 },
]

const START_LIVES = 3

export default function QuizScreen({ onComplete, onBack }) {
  const [phase, setPhase] = useState('setup')
  const [mode, setMode] = useState('practice')
  const [selectedRounds, setSelectedRounds] = useState([1, 2, 3, 4])
  const [rounds, setRounds] = useState([])
  const [currentRound, setCurrentRound] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [answered, setAnswered] = useState(null)
  const [scrambleInput, setScrambleInput] = useState('')
  const [spellInput, setSpellInput] = useState('')
  const [results, setResults] = useState([])
  const [roundAnswers, setRoundAnswers] = useState([])
  const [lives, setLives] = useState(START_LIVES)
  const [quizXP, setQuizXP] = useState(0)
  const [inQuizStreak, setInQuizStreak] = useState(0) // consecutive correct answers
  const [stellaShow, setStellaShow] = useState(false)
  const [stellaCorrect, setStellaCorrect] = useState(true)
  const [stellaTimeout, setStellaTimeout] = useState(false)
  const [quizStartTime] = useState(Date.now())
  const timerRef = useRef(null)

  const clearTimer = () => clearInterval(timerRef.current)
  const round = rounds[currentRound]
  const q = round?.questions[currentQ]
  const timeAllowed = mode === 'competition' ? Math.round((round?.time || 30) * 0.65) : (round?.time || 30)
  const isCompetition = mode === 'competition'

  const buildQuiz = useCallback(() => {
    const built = selectedRounds.map(n => {
      const cfg = ROUND_CONFIGS.find(r => r.n === n)
      let questions
      if (n === 1) questions = pickRandom(commonErrors, 10)
      else if (n === 2) questions = pickRandom(scrambledWords, 10)
      else if (n === 3) questions = pickRandom(correctSpelling, 10)
      else questions = pickRandom(wordBasket, 10)
      return { ...cfg, questions }
    })
    setRounds(built)
    setCurrentRound(0); setCurrentQ(0); setResults([]); setRoundAnswers([])
    setLives(START_LIVES); setQuizXP(0); setInQuizStreak(0)
    setPhase('round-intro')
  }, [selectedRounds])

  // Timer
  useEffect(() => {
    if (phase !== 'question' || answered !== null) return
    setTimeLeft(timeAllowed)
    clearTimer()
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearTimer(); handleTimeout(); return 0 }
        if (t <= 6) playTick()
        return t - 1
      })
    }, 1000)
    return () => clearTimer()
  }, [phase, currentQ, currentRound, answered])

  const handleTimeout = () => {
    playWrong()
    setInQuizStreak(0)
    setAnswered({ correct: false, timeout: true, selectedIndex: -1 })
    setRoundAnswers(prev => [...prev, { q, correct: false, timeout: true }])
    setStellaTimeout(true); setStellaCorrect(false); setStellaShow(true)
    if (isCompetition) setLives(l => Math.max(0, l - 1))
  }

  const calcXP = (correct, tLeft, tAllowed) => {
    if (!correct) return 0
    let xp = 10
    if (tLeft > tAllowed * 0.5) xp += 5 // speed bonus
    return xp
  }

  const handleAnswer = (correct, selectedIdx = -1) => {
    clearTimer()
    const earnedXP = calcXP(correct, timeLeft, timeAllowed)
    setAnswered({ correct, selectedIndex: selectedIdx, earnedXP })
    setRoundAnswers(prev => [...prev, { q, correct, roundN: round.n }])
    setStellaTimeout(false); setStellaCorrect(correct); setStellaShow(true)
    if (correct) {
      playCorrect()
      setQuizXP(prev => prev + earnedXP)
      setInQuizStreak(s => s + 1)
    } else {
      playWrong()
      setInQuizStreak(0)
      if (isCompetition) setLives(l => Math.max(0, l - 1))
    }
  }

  // End when lives = 0 in competition mode
  useEffect(() => {
    if (isCompetition && lives === 0 && answered !== null) {
      setTimeout(() => finishQuiz(true), 2500)
    }
  }, [lives, answered])

  const finishRound = (finalAnswers) => {
    const score = finalAnswers.filter(a => a.correct).length
    const newResults = [...results, { n: round.n, label: round.label, emoji: round.emoji, score, total: 10, answers: finalAnswers }]
    setResults(newResults)
    setRoundAnswers([])
    if (currentRound < rounds.length - 1) {
      setCurrentRound(r => r + 1); setCurrentQ(0); setPhase('round-intro')
    } else {
      finishQuiz(false, newResults)
    }
  }

  const finishQuiz = (outOfLives = false, finalResults = results) => {
    playVictory()
    const duration = Math.round((Date.now() - quizStartTime) / 60000)
    onComplete({ results: finalResults, quizXP, duration, mode, outOfLives, rounds: finalResults.map(r => r.n) })
  }

  const nextQuestion = () => {
    setAnswered(null); setScrambleInput(''); setSpellInput('')
    const currentAnswers = [...roundAnswers]
    if (isCompetition && lives === 0) { finishQuiz(true); return }
    if (currentQ < round.questions.length - 1) {
      setCurrentQ(q => q + 1)
    } else {
      finishRound(currentAnswers)
    }
  }

  if (phase === 'setup') {
    return <QuizSetup mode={mode} setMode={setMode} selectedRounds={selectedRounds} setSelectedRounds={setSelectedRounds} onStart={buildQuiz} onBack={onBack} />
  }

  if (phase === 'round-intro' && round) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 screen-enter">
        <div className={`bg-gradient-to-br ${round.gradient} rounded-3xl p-10 text-center text-white shadow-2xl max-w-sm w-full`}>
          <div className="text-7xl mb-3">{round.emoji}</div>
          <div className="font-display text-3xl mb-1">Round {round.n}</div>
          <div className="text-white/90 text-xl font-bold mb-3">{round.label}</div>
          <div className="bg-white/20 rounded-2xl p-3 mb-4 space-y-1 text-sm">
            <p className="font-bold">10 questions · {timeAllowed}s each</p>
            <p className="text-white/70">{isCompetition ? `⚡ Competition — ${START_LIVES} ❤️ total` : '✏️ Practice — more time, no hearts'}</p>
            {isCompetition && (
              <div className="flex justify-center gap-2 mt-2">
                {Array.from({ length: START_LIVES }).map((_, i) => (
                  <span key={i} className={`text-2xl ${i < lives ? '' : 'grayscale opacity-30'}`}>❤️</span>
                ))}
              </div>
            )}
          </div>
          {quizXP > 0 && <p className="text-yellow-300 font-bold text-sm mb-3">⭐ {quizXP} XP earned so far!</p>}
          <button onClick={() => setPhase('question')} className="w-full bg-white text-gray-800 font-display text-2xl py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95">
            Start! 🚀
          </button>
        </div>
        <p className="mt-4 text-white/50 text-sm">Round {currentRound + 1} of {rounds.length}</p>
      </div>
    )
  }

  if (phase === 'question' && q) {
    const pct = (timeLeft / timeAllowed) * 100
    const timerColor = pct > 50 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444'

    return (
      <div className="min-h-screen flex flex-col">
        {/* Stella reaction popup */}
        <StellaReaction
          correct={stellaCorrect} timeout={stellaTimeout}
          show={stellaShow} onDone={() => setStellaShow(false)}
        />

        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
          <div className={`bg-gradient-to-r ${round.gradient} text-white text-sm font-bold px-3 py-1 rounded-full`}>
            {round.emoji} R{round.n}
          </div>
          <div className="flex-1 text-white font-bold text-sm">Q{currentQ + 1}/10</div>

          {/* In-quiz streak */}
          {inQuizStreak >= 2 && (
            <div className="bg-orange-500/80 rounded-full px-2 py-0.5 text-white text-xs font-bold">
              🔥×{inQuizStreak}
            </div>
          )}

          {/* XP earned */}
          <div className="text-yellow-300 font-bold text-sm">+{quizXP} XP</div>

          {/* Lives (competition) */}
          {isCompetition && (
            <div className="flex gap-0.5">
              {Array.from({ length: START_LIVES }).map((_, i) => (
                <span key={i} className={`text-base ${i < lives ? '' : 'grayscale opacity-25'}`}>❤️</span>
              ))}
            </div>
          )}
        </div>

        {/* Timer bar */}
        <div className="h-2.5 bg-white/20">
          <div className="h-2.5 timer-bar rounded-r-full" style={{ width: `${pct}%`, backgroundColor: timerColor }} />
        </div>
        <div className={`text-center py-0.5 font-display text-xl ${timeLeft <= 5 ? 'text-red-300 pulse-red' : 'text-white/70'}`}>
          {timeLeft}s
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 max-w-lg mx-auto w-full">
          {/* XP earned animation */}
          {answered?.correct && answered.earnedXP > 0 && (
            <div className="text-center">
              <span className="inline-block text-yellow-300 font-display text-xl animate-[slideUp_0.4s_ease-out] mb-1">
                +{answered.earnedXP} XP {answered.earnedXP > 10 ? '⚡' : ''}
              </span>
            </div>
          )}

          {round.n === 1 && <QuizCommonErrors q={q} answered={answered} onAnswer={(idx) => handleAnswer(idx === q.answerIndex, idx)} />}
          {round.n === 2 && <QuizScramble q={q} input={scrambleInput} setInput={setScrambleInput} answered={answered} onAnswer={(val) => handleAnswer(val.trim().toUpperCase() === q.answer)} />}
          {round.n === 3 && <QuizSpellingChoice q={q} answered={answered} onAnswer={(idx) => handleAnswer(idx === q.answerIndex, idx)} />}
          {round.n === 4 && <QuizSpellWord q={q} input={spellInput} setInput={setSpellInput} answered={answered} onAnswer={(val) => handleAnswer(val.trim().toUpperCase() === q.word)} />}

          {answered !== null && (
            <button
              onClick={nextQuestion}
              className="w-full mt-5 py-4 bg-white text-purple-700 font-display text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-105 active:scale-95"
            >
              {isCompetition && lives === 0 ? '💔 End Quiz' : currentQ < 9 ? 'Next →' : 'Round Complete! 🎉'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return <div className="min-h-screen flex items-center justify-center"><div className="text-white font-display text-3xl">Loading...</div></div>
}

function QuizSetup({ mode, setMode, selectedRounds, setSelectedRounds, onStart, onBack }) {
  const toggleRound = (n) =>
    setSelectedRounds(prev => prev.includes(n) ? (prev.length > 1 ? prev.filter(r => r !== n) : prev) : [...prev, n].sort())

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white p-1"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg></button>
        <h2 className="font-display text-2xl text-white">Quiz Setup</h2>
      </div>
      <div className="flex-1 p-4 max-w-lg mx-auto w-full space-y-5 screen-enter">
        <div>
          <p className="text-white font-bold mb-3">Choose Mode:</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'practice',    icon: '✏️', label: 'Practice Mode',    sub: '30-40s per question · no hearts', desc: 'Relaxed, more time to think' },
              { id: 'competition', icon: '⚡', label: 'Competition Mode',  sub: `${START_LIVES} ❤️ · faster timer`, desc: 'Like the real competition!' },
            ].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                className={`rounded-2xl p-4 border-2 text-left transition ${mode === m.id ? 'bg-white border-white text-purple-700' : 'bg-white/15 border-white/30 text-white hover:bg-white/25'}`}>
                <div className="text-3xl mb-2">{m.icon}</div>
                <div className="font-bold text-sm">{m.label}</div>
                <div className="text-xs opacity-70 mt-1">{m.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white font-bold mb-3">Include Rounds:</p>
          <div className="space-y-2">
            {ROUND_CONFIGS.map(r => (
              <button key={r.n} onClick={() => toggleRound(r.n)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition ${selectedRounds.includes(r.n) ? 'bg-white/25 border-white text-white' : 'bg-white/10 border-white/20 text-white/50'}`}>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedRounds.includes(r.n) ? 'bg-white border-white' : 'border-white/40'}`}>
                  {selectedRounds.includes(r.n) && <span className="text-purple-700 text-sm font-black">✓</span>}
                </span>
                <span className="text-xl">{r.emoji}</span>
                <span className="font-bold">Round {r.n}: {r.label}</span>
                <span className="ml-auto text-xs opacity-60">10 Q</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/15 rounded-2xl p-4 text-white text-sm space-y-1">
          <p className="font-bold">📋 Summary</p>
          <p>{selectedRounds.length} round{selectedRounds.length > 1 ? 's' : ''} · {selectedRounds.length * 10} questions · ~{selectedRounds.length * 5} minutes</p>
          <p>Earn up to {selectedRounds.length * 10 * 15} XP (with speed bonuses!)</p>
        </div>

        <button onClick={onStart} className="w-full py-5 bg-gradient-to-r from-orange-400 to-rose-500 text-white font-display text-3xl rounded-2xl shadow-2xl hover:shadow-3xl transition hover:scale-105 active:scale-95">
          Start Quiz! 🏆
        </button>
      </div>
    </div>
  )
}

// ── Quiz question components ─────────────────────────────────

function QuizCommonErrors({ q, answered, onAnswer }) {
  return (
    <div className="space-y-4 pt-2 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <p className="text-gray-500 text-sm font-bold mb-3">🔍 Find the part with an error:</p>
        <div className="bg-gray-50 rounded-2xl p-4 text-center mb-4">
          <p className="text-gray-800 text-lg font-bold leading-relaxed">
            {q.parts.map((p, i) => (
              <span key={i}>
                <span className={answered ? (i === q.answerIndex ? 'text-emerald-600 font-black underline decoration-2' : 'text-gray-400') : ''}>{p}</span>
                {i < 2 && <span className="text-gray-300 mx-1">/</span>}
              </span>
            ))}
          </p>
        </div>
        <div className="space-y-2">
          {q.parts.map((part, i) => {
            let state = ''
            if (answered) { if (i === q.answerIndex) state = 'correct'; else if (i === answered.selectedIndex) state = 'wrong' }
            return (
              <button key={i} onClick={() => !answered && onAnswer(i)} disabled={!!answered}
                className={`answer-btn w-full text-left px-4 py-4 rounded-xl border-2 font-bold text-base flex items-center gap-3 ${state} ${!answered ? 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50' : 'border-transparent'}`}>
                <span className="font-display text-gray-400 text-xl w-7 flex-shrink-0">{['A','B','C'][i]}</span>
                <span>{part}</span>
              </button>
            )
          })}
        </div>
        {answered && !answered.correct && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm">
            {answered.timeout ? '⏰ ' : '✗ '}<span className="font-bold">Correction:</span> <span className="text-emerald-700 font-bold">{q.correction}</span>
            <p className="text-gray-500 text-xs mt-1 italic">{q.correctSentence}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizScramble({ q, input, setInput, answered, onAnswer }) {
  return (
    <div className="space-y-4 pt-2 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <p className="text-gray-500 text-sm font-bold mb-3">🔀 Unscramble the letters:</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {q.scrambled.split('').map((l, i) => (
            <span key={i} className="bg-purple-100 text-purple-700 font-display text-2xl w-10 h-10 rounded-xl flex items-center justify-center border border-purple-200">{l}</span>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <p className="text-blue-800 text-sm font-bold">💡 {q.meaning}</p>
        </div>
        {!answered ? (
          <div className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && input.trim() && onAnswer(input)}
              placeholder="Type your answer..." autoFocus
              className="flex-1 border-2 border-purple-200 rounded-xl px-4 py-3 font-bold text-xl text-purple-700 focus:border-purple-500 uppercase"/>
            <button onClick={() => onAnswer(input)} disabled={!input.trim()} className="bg-purple-600 text-white rounded-xl px-4 font-bold disabled:opacity-40 hover:bg-purple-700 transition">✓</button>
          </div>
        ) : (
          <div className={`rounded-2xl p-3 text-sm font-bold ${answered.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {answered.correct ? `🌟 ${q.answer} — Correct!` : `✗ Answer: ${q.answer}`}
          </div>
        )}
      </div>
    </div>
  )
}

function QuizSpellingChoice({ q, answered, onAnswer }) {
  return (
    <div className="space-y-4 pt-2 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <p className="text-gray-500 text-sm font-bold mb-3">✏️ Choose the correct spelling:</p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <p className="text-gray-800 text-lg font-bold text-center leading-relaxed">{q.sentence}</p>
        </div>
        <div className="space-y-2">
          {q.options.map((option, i) => {
            let state = ''
            if (answered) { if (i === q.answerIndex) state = 'correct'; else if (i === answered.selectedIndex) state = 'wrong' }
            return (
              <button key={i} onClick={() => !answered && onAnswer(i)} disabled={!!answered}
                className={`answer-btn w-full text-left px-4 py-4 rounded-xl border-2 font-bold flex items-center gap-3 ${state} ${!answered ? 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50' : 'border-transparent'}`}>
                <span className="font-display text-gray-400 text-xl w-7 flex-shrink-0">{['A','B','C'][i]}</span>
                <span className="font-mono text-xl">{option}</span>
              </button>
            )
          })}
        </div>
        {answered && !answered.correct && (
          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 text-sm font-bold text-red-700">
            {answered.timeout ? '⏰ Time\'s up! ' : '✗ '} Answer: <span className="text-emerald-600 font-display text-lg">{q.options[q.answerIndex]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizSpellWord({ q, input, setInput, answered, onAnswer }) {
  return (
    <div className="space-y-4 pt-2 screen-enter">
      <div className="bg-white rounded-3xl shadow-xl p-5">
        <p className="text-gray-500 text-sm font-bold mb-3">🗣️ Spell the word that means:</p>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-4 text-center">
          <p className="text-orange-900 text-xl font-bold leading-relaxed">{q.meaning}</p>
          <p className="text-orange-500 text-sm mt-2 italic">"{q.example}"</p>
        </div>
        {!answered ? (
          <div className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && input.trim() && onAnswer(input)}
              placeholder="Spell it out..." autoFocus
              className="flex-1 border-2 border-orange-200 rounded-xl px-4 py-3 font-bold text-xl text-orange-700 focus:border-orange-500 uppercase"/>
            <button onClick={() => onAnswer(input)} disabled={!input.trim()} className="bg-orange-500 text-white rounded-xl px-4 font-bold disabled:opacity-40 hover:bg-orange-600 transition">✓</button>
          </div>
        ) : (
          <div className={`rounded-2xl p-3 font-bold ${answered.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {answered.correct ? `🌟 ${q.word} — Perfect!` : `✗ Answer: ${q.word}`}
          </div>
        )}
      </div>
    </div>
  )
}
