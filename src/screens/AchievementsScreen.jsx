import { useStore, BADGES, RARITY_COLOR, getLevel, getLevelProgress, LEVELS } from '../store'

export default function AchievementsScreen({ onBack }) {
  const { store } = useStore()
  const { xp, badges: earned, streak, totalQuizzes, totalCorrect, flashcardsLearned } = store
  const level = getLevel(xp)
  const progress = getLevelProgress(xp)
  const nextLevel = LEVELS.find(l => l.n === level.n + 1)

  const rarityOrder = { legendary: 0, rare: 1, uncommon: 2, common: 3 }
  const sorted = [...BADGES].sort((a, b) => {
    const aEarned = earned.includes(a.id)
    const bEarned = earned.includes(b.id)
    if (aEarned !== bEarned) return aEarned ? -1 : 1
    return rarityOrder[a.rarity] - rarityOrder[b.rarity]
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white p-1 hover:text-white/80 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 className="font-display text-2xl text-white flex-1">Achievements</h2>
        <span className="text-white/70 text-sm font-bold">{earned.length}/{BADGES.length} 🏅</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full space-y-4">
        {/* Level card */}
        <div className={`bg-gradient-to-r ${level.color} rounded-3xl p-5 text-white shadow-xl`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{level.emoji}</span>
            <div>
              <div className="font-display text-2xl">{level.title}</div>
              <div className="text-white/80 text-sm font-bold">Level {level.n} · {xp} XP total</div>
            </div>
          </div>
          {nextLevel && (
            <>
              <div className="flex justify-between text-sm font-bold text-white/80 mb-1">
                <span>Progress to Level {nextLevel.n}</span>
                <span>{xp}/{nextLevel.min} XP</span>
              </div>
              <div className="bg-white/30 rounded-full h-3">
                <div className="bg-white rounded-full h-3 transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </>
          )}
          {!nextLevel && (
            <div className="text-center font-bold text-white/90">👑 Maximum Level Reached!</div>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Streak', value: `${streak.count} 🔥`, sub: 'days' },
            { label: 'Quizzes', value: totalQuizzes, sub: 'done' },
            { label: 'Words', value: flashcardsLearned.length, sub: 'learned' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-md">
              <div className="font-display text-2xl text-purple-700">{s.value}</div>
              <div className="text-gray-400 text-xs font-bold uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <p className="text-white font-bold mb-3">{earned.length} of {BADGES.length} badges earned:</p>
          <div className="grid grid-cols-2 gap-3">
            {sorted.map(badge => {
              const isEarned = earned.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-4 flex items-center gap-3 shadow-md transition-all ${
                    isEarned
                      ? `bg-gradient-to-br ${RARITY_COLOR[badge.rarity]} text-white`
                      : 'bg-white/20 text-white/50'
                  }`}
                >
                  <div className={`text-3xl flex-shrink-0 ${isEarned ? '' : 'grayscale opacity-30'}`}>
                    {isEarned ? badge.icon : '🔒'}
                  </div>
                  <div className="min-w-0">
                    <div className={`font-bold text-sm leading-tight ${isEarned ? 'text-white' : 'text-white/50'}`}>
                      {isEarned ? badge.name : '???'}
                    </div>
                    <div className={`text-xs mt-0.5 ${isEarned ? 'text-white/80' : 'text-white/35'}`}>
                      {badge.desc}
                    </div>
                    {isEarned && (
                      <div className="text-xs mt-1 bg-white/20 rounded-full px-2 py-0.5 inline-block capitalize">
                        {badge.rarity}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* XP guide */}
        <div className="bg-white rounded-3xl p-5 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3">How to earn XP ⭐</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between"><span>✓ Correct quiz answer</span><span className="font-bold text-purple-600">+10 XP</span></div>
            <div className="flex justify-between"><span>⚡ Quick answer (5s+ left)</span><span className="font-bold text-purple-600">+5 XP</span></div>
            <div className="flex justify-between"><span>💯 Perfect round (10/10)</span><span className="font-bold text-purple-600">+50 XP</span></div>
            <div className="flex justify-between"><span>🌟 Perfect full quiz</span><span className="font-bold text-purple-600">+100 XP</span></div>
            <div className="flex justify-between"><span>🔥 Daily streak bonus</span><span className="font-bold text-purple-600">+20 XP</span></div>
            <div className="flex justify-between"><span>📖 Flashcard learned</span><span className="font-bold text-purple-600">+2 XP</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
