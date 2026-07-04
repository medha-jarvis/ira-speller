import { useEffect, useRef } from 'react'

export default function ResultsScreen({ results, onHome, onRetry, onPractice }) {
  const canvasRef = useRef(null)

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={onHome} className="text-white font-display text-2xl">← Home</button>
      </div>
    )
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0)
  const pct = Math.round((totalScore / totalPossible) * 100)

  const stars =
    pct >= 90 ? 5 :
    pct >= 75 ? 4 :
    pct >= 60 ? 3 :
    pct >= 40 ? 2 : 1

  const message =
    stars === 5 ? 'Outstanding! You\'re a Master Speller! 🏆' :
    stars === 4 ? 'Excellent work, Ira! Almost perfect! ⭐' :
    stars === 3 ? 'Great job! Keep practising! 💪' :
    stars === 2 ? 'Good try! Practice makes perfect! 📚' :
    'Keep going, Ira! You\'ve got this! 🌟'

  // Confetti effect
  useEffect(() => {
    if (typeof window === 'undefined') return
    import('canvas-confetti').then(module => {
      const confetti = module.default
      const count = stars >= 4 ? 200 : stars >= 3 ? 100 : 50
      confetti({
        particleCount: count,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#2563EB', '#10B981', '#F59E0B', '#EF4444', '#EC4899'],
      })
      if (stars >= 5) {
        setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } }), 400)
        setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } }), 700)
      }
    }).catch(() => {})
  }, [stars])

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-lg screen-enter space-y-5">

        {/* Trophy card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
          <div className="text-6xl mb-3">
            {stars === 5 ? '🏆' : stars === 4 ? '🥇' : stars === 3 ? '🥈' : stars === 2 ? '🥉' : '💪'}
          </div>
          <h1 className="font-display text-3xl text-purple-700 mb-1">Quiz Complete!</h1>
          <p className="text-gray-600 text-base font-semibold mb-4">{message}</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <span
                key={s}
                className={`star ${s <= stars ? 'lit' : 'opacity-20'}`}
                style={{ animationDelay: `${s * 0.15}s` }}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Score */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-2">
            <div className="font-display text-5xl text-purple-700 mb-1">
              {totalScore}<span className="text-gray-400 text-3xl">/{totalPossible}</span>
            </div>
            <div className="text-gray-500 font-bold">{pct}% · {stars}/5 Stars</div>
          </div>
        </div>

        {/* Per-round breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <h2 className="font-display text-xl text-gray-800 mb-4">Round Breakdown</h2>
          <div className="space-y-3">
            {results.map((r, i) => {
              const rpct = Math.round((r.score / r.total) * 100)
              const barColor = rpct >= 80 ? 'bg-emerald-500' : rpct >= 60 ? 'bg-yellow-400' : 'bg-red-400'
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-700 text-sm">{r.emoji} Round {r.n}: {r.label}</span>
                    <span className="font-bold text-gray-800">{r.score}/{r.total}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${barColor} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${rpct}%` }}
                    />
                  </div>
                  {r.score < r.total && (
                    <p className="text-xs text-gray-400 mt-0.5">{r.total - r.score} question{r.total - r.score > 1 ? 's' : ''} to improve on</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Wrong answers review */}
        {results.some(r => r.answers && r.answers.some(a => !a.correct)) && (
          <div className="bg-white rounded-3xl shadow-xl p-5">
            <h2 className="font-display text-xl text-gray-800 mb-4">📚 Review Wrong Answers</h2>
            {results.map((r) =>
              r.answers && r.answers.filter(a => !a.correct).length > 0 ? (
                <div key={r.n} className="mb-4">
                  <p className="text-sm font-bold text-purple-600 mb-2">{r.emoji} Round {r.n}</p>
                  {r.answers.filter(a => !a.correct).map((a, j) => (
                    <WrongAnswerCard key={j} roundN={r.n} qa={a} />
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95"
          >
            🔄 Try Again
          </button>
          <button
            onClick={onHome}
            className="bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95"
          >
            🏠 Home
          </button>
          <button
            onClick={onPractice}
            className="col-span-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105 active:scale-95"
          >
            ✏️ Practice Wrong Answers
          </button>
        </div>
      </div>
    </div>
  )
}

function WrongAnswerCard({ roundN, qa }) {
  const { q } = qa
  if (!q) return null

  if (roundN === 1) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
        <p className="text-gray-600 text-xs mb-0.5">"{q.parts.join(' / ')}"</p>
        <p className="font-bold text-red-700">Error in part <span className="uppercase">{['a','b','c'][q.answerIndex]}</span>: <span className="line-through">{q.parts[q.answerIndex]}</span> → <span className="text-emerald-700">{q.correction}</span></p>
        <p className="text-gray-500 text-xs mt-0.5 italic">{q.explanation}</p>
      </div>
    )
  }
  if (roundN === 2) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
        <p className="text-gray-500 text-xs">{q.scrambled} → <span className="font-bold text-emerald-700">{q.answer}</span></p>
        <p className="text-gray-500 text-xs italic">{q.meaning}</p>
      </div>
    )
  }
  if (roundN === 3) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
        <p className="text-gray-600 text-xs">{q.sentence}</p>
        <p className="font-bold text-emerald-700 mt-0.5">✓ {q.options[q.answerIndex]}</p>
      </div>
    )
  }
  if (roundN === 4) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-2 text-sm">
        <p className="text-gray-500 text-xs italic">"{q.meaning}"</p>
        <p className="font-bold text-emerald-700">✓ {q.word}</p>
      </div>
    )
  }
  return null
}
