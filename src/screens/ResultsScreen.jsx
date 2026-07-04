import { useEffect } from 'react'
import { useStore, computeNewBadges, updateWrongLog, getLevel, BADGES, RARITY_COLOR } from '../store'
import { StellaFace } from '../components/Stella'

export default function ResultsScreen({ results: payload, onHome, onRetry, onPractice }) {
  const { store, update } = useStore()

  if (!payload || !payload.results) {
    return <div className="min-h-screen flex items-center justify-center"><button onClick={onHome} className="text-white font-display text-2xl">← Home</button></div>
  }

  const { results, quizXP = 0, duration = 0, mode, outOfLives = false, rounds = [] } = payload

  const totalScore = results.reduce((s, r) => s + r.score, 0)
  const totalPossible = results.reduce((s, r) => s + r.total, 0)
  const pct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const perfectBonus = results.every(r => r.score === r.total) && results.length === 4 ? 100 : 0
  const perfectRoundBonus = results.filter(r => r.score === r.total).length * 50
  const totalXPGained = quizXP + perfectBonus + perfectRoundBonus

  const prevLevel = getLevel(store.xp)
  const newXP = store.xp + totalXPGained
  const newLevel = getLevel(newXP)
  const leveledUp = newLevel.n > prevLevel.n

  const stars = outOfLives ? 1 : pct >= 90 ? 5 : pct >= 75 ? 4 : pct >= 60 ? 3 : pct >= 40 ? 2 : 1

  const message = outOfLives ? 'You ran out of hearts — keep practising! 💪'
    : stars === 5 ? 'Incredible! You\'re a Master Speller! 🏆'
    : stars === 4 ? 'Excellent! Almost perfect! ⭐'
    : stars === 3 ? 'Great job! Keep practising! 💪'
    : stars === 2 ? 'Good try! Practice makes perfect! 📚'
    : 'Keep going! You\'ve got this! 🌟'

  const stellaState = stars >= 4 ? 'celebrating' : stars >= 3 ? 'excited' : outOfLives ? 'sad' : 'happy'

  // Update store: XP, badges, session history, round stats, wrong log
  useEffect(() => {
    const newBadges = computeNewBadges(store, results)
    const newWrongLog = updateWrongLog(store.wrongLog, results)

    update(prev => {
      const newRoundStats = { ...prev.roundStats }
      results.forEach(r => {
        newRoundStats[r.n] = {
          correct: (newRoundStats[r.n]?.correct || 0) + r.score,
          total: (newRoundStats[r.n]?.total || 0) + r.total,
        }
      })
      const session = {
        date: new Date().toISOString(),
        score: totalScore,
        total: totalPossible,
        rounds,
        duration: Math.max(1, duration),
      }
      return {
        ...prev,
        xp: prev.xp + totalXPGained,
        badges: [...prev.badges, ...newBadges],
        totalQuizzes: prev.totalQuizzes + 1,
        totalCorrect: prev.totalCorrect + totalScore,
        totalAttempted: prev.totalAttempted + totalPossible,
        sessionHistory: [...prev.sessionHistory.slice(-19), session],
        roundStats: newRoundStats,
        wrongLog: newWrongLog,
      }
    })

    // Confetti
    import('canvas-confetti').then(m => {
      const confetti = m.default
      if (outOfLives) return
      confetti({ particleCount: stars >= 4 ? 200 : 80, spread: 70, origin: { y: 0.6 }, colors: ['#7C3AED','#2563EB','#10B981','#F59E0B','#EF4444','#EC4899'] })
      if (stars === 5) {
        setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } }), 400)
        setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } }), 700)
      }
    }).catch(() => {})

    // Compute new badges for display only (already stored above)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // For display: which badges just earned
  const justEarned = computeNewBadges(store, results)
  const justEarnedBadges = BADGES.filter(b => justEarned.includes(b.id))

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-lg screen-enter space-y-4">

        {/* Main result card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <StellaFace state={stellaState} size={90} />
          </div>
          <h1 className="font-display text-3xl text-purple-700 mb-1">
            {outOfLives ? 'Game Over! 💔' : 'Quiz Complete!'}
          </h1>
          <p className="text-gray-600 text-base font-semibold mb-4">{message}</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map(s => (
              <span key={s} className={`star ${s <= stars ? 'lit' : 'opacity-20'}`} style={{ animationDelay: `${s * 0.15}s` }}>⭐</span>
            ))}
          </div>

          {/* Score */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-3">
            <div className="font-display text-5xl text-purple-700 mb-1">
              {totalScore}<span className="text-gray-400 text-3xl">/{totalPossible}</span>
            </div>
            <div className="text-gray-500 font-bold">{pct}% · {stars}/5 Stars · ~{Math.max(1,duration)} min</div>
          </div>

          {/* XP earned */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="text-left">
              <div className="font-bold text-yellow-800">⭐ XP Earned</div>
              {perfectBonus > 0 && <div className="text-xs text-yellow-600">+{perfectBonus} perfect quiz bonus!</div>}
              {perfectRoundBonus > 0 && <div className="text-xs text-yellow-600">+{perfectRoundBonus} perfect round{results.filter(r=>r.score===r.total).length>1?'s':''} bonus!</div>}
            </div>
            <div className="font-display text-3xl text-yellow-700">+{totalXPGained}</div>
          </div>

          {/* Level up */}
          {leveledUp && (
            <div className="mt-3 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-4 text-white animate-[bounceIn_0.5s_ease-out]">
              <div className="font-display text-2xl">🚀 Level Up!</div>
              <div className="font-bold">You reached {newLevel.emoji} {newLevel.title}!</div>
            </div>
          )}
        </div>

        {/* New badges */}
        {justEarnedBadges.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-5">
            <h2 className="font-display text-xl text-gray-800 mb-3">🎊 New Badges!</h2>
            <div className="space-y-2">
              {justEarnedBadges.map(b => (
                <div key={b.id} className={`bg-gradient-to-r ${RARITY_COLOR[b.rarity]} rounded-2xl p-3 flex items-center gap-3 text-white animate-[bounceIn_0.4s_ease-out]`}>
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <div className="font-bold">{b.name}</div>
                    <div className="text-white/80 text-xs">{b.desc} · {b.rarity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Round breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <h2 className="font-display text-xl text-gray-800 mb-4">Round Breakdown</h2>
          <div className="space-y-3">
            {results.map((r, i) => {
              const rpct = Math.round((r.score / r.total) * 100)
              const barColor = rpct === 100 ? 'bg-yellow-400' : rpct >= 80 ? 'bg-emerald-500' : rpct >= 60 ? 'bg-yellow-400' : 'bg-red-400'
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-700 text-sm">{r.emoji} R{r.n}: {r.label}</span>
                    <span className={`font-bold text-sm ${rpct === 100 ? 'text-yellow-500' : rpct >= 80 ? 'text-emerald-600' : 'text-gray-700'}`}>
                      {r.score}/{r.total} {rpct === 100 ? '💯' : ''}
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className={`${barColor} h-4 rounded-full transition-all duration-700`} style={{ width: `${rpct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Wrong answers review */}
        {results.some(r => r.answers?.some(a => !a.correct)) && (
          <div className="bg-white rounded-3xl shadow-xl p-5">
            <h2 className="font-display text-xl text-gray-800 mb-4">📚 Review Wrong Answers</h2>
            {results.map((r) =>
              r.answers?.filter(a => !a.correct).length > 0 ? (
                <div key={r.n} className="mb-4">
                  <p className="text-sm font-bold text-purple-600 mb-2">{r.emoji} Round {r.n}</p>
                  {r.answers.filter(a => !a.correct).map((a, j) => <WrongCard key={j} roundN={r.n} qa={a} />)}
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <button onClick={onRetry} className="bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95">🔄 Try Again</button>
          <button onClick={onHome} className="bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95">🏠 Home</button>
          <button onClick={onPractice} className="col-span-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95">✏️ Practice My Weak Spots</button>
        </div>
      </div>
    </div>
  )
}

function WrongCard({ roundN, qa }) {
  const { q } = qa
  if (!q) return null
  if (roundN === 1) return (
    <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
      <p className="text-gray-600 text-xs mb-0.5 font-mono">"{q.parts?.join(' / ')}"</p>
      <p className="font-bold text-red-700">Error → <span className="line-through text-gray-400">{q.parts?.[q.answerIndex]}</span> should be <span className="text-emerald-700">{q.correction}</span></p>
    </div>
  )
  if (roundN === 2) return (
    <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
      <span className="font-mono text-purple-600">{q.scrambled}</span> → <span className="font-bold text-emerald-700">{q.answer}</span>
      <p className="text-gray-400 text-xs italic">{q.meaning}</p>
    </div>
  )
  if (roundN === 3) return (
    <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
      <p className="text-gray-600 text-xs">{q.sentence}</p>
      <p className="font-bold text-emerald-700">✓ {q.options?.[q.answerIndex]}</p>
    </div>
  )
  if (roundN === 4) return (
    <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
      <p className="text-gray-400 text-xs italic">"{q.meaning}"</p>
      <p className="font-bold text-emerald-700">✓ {q.word}</p>
    </div>
  )
  return null
}
