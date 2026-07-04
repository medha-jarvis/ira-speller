import { useEffect, useRef, useMemo } from 'react'
import { useStore, getLevel, getLevelProgress, LEVELS, BADGES, randomMsg, updateStreak } from '../store'
import { StellaFace } from '../components/Stella'
import { playCorrect } from '../sounds'

export default function HomeScreen({ onNavigate }) {
  const { store, update } = useStore()
  const { name, avatar, xp, streak, badges, roundStats, flashcardsLearned, dailyGoalMinutes, soundEnabled } = store

  const level = getLevel(xp)
  const progress = getLevelProgress(xp)
  const nextLevel = LEVELS.find(l => l.n === level.n + 1)

  const bgRef = useRef(null)
  const greeting = useMemo(() => randomMsg(streak.count > 1 ? 'streak' : 'greeting'), [])

  // Update daily streak on home load
  useEffect(() => {
    const newStreak = updateStreak(store.streak)
    if (newStreak.isNew) {
      let xpGain = 20
      update(prev => ({ ...prev, streak: { count: newStreak.count, lastDate: newStreak.lastDate }, xp: prev.xp + xpGain }))
    }
  }, [])

  // Floating letter background (matching book cover design)
  useEffect(() => {
    const container = bgRef.current
    if (!container) return
    container.innerHTML = ''
    const letters = 'NSZXDUGAHQCJMRKHBTWGFNZYFUMJNSEQABCDE'
    letters.split('').forEach((letter) => {
      const el = document.createElement('span')
      el.className = 'float-letter'
      el.textContent = letter
      const size = 20 + Math.random() * 50
      el.style.cssText = `left:${Math.random()*100}%;font-size:${size}px;color:white;animation-duration:${9+Math.random()*14}s;animation-delay:${-Math.random()*18}s;`
      container.appendChild(el)
    })
  }, [])

  const recentBadges = BADGES.filter(b => badges.includes(b.id)).slice(-3)

  const roundAccuracy = (n) => {
    const s = roundStats[n]
    if (!s || s.total === 0) return null
    return Math.round((s.correct / s.total) * 100)
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Floating background letters */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Subtle star dots overlay */}
      <div className="absolute inset-0 pointer-events-none star-field" />

      <div className="relative z-10 flex flex-col min-h-screen px-4 py-5 max-w-lg mx-auto w-full">

        {/* Top bar: streak + badges + parent */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {streak.count > 0 ? (
              <div className="bg-orange-500/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                <span className="text-lg">🔥</span>
                <span className="text-white font-bold text-sm">{streak.count} day{streak.count > 1 ? 's' : ''}</span>
              </div>
            ) : (
              <div className="bg-white/15 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <span className="text-lg">🔥</span>
                <span className="text-white/70 font-bold text-sm">Start a streak!</span>
              </div>
            )}
            <div className="bg-yellow-500/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
              <span className="text-white font-bold text-sm">⭐ {xp} XP</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('achievements')}
              className="bg-white/15 hover:bg-white/30 transition rounded-full w-10 h-10 flex items-center justify-center text-lg shadow"
              title="Achievements"
            >
              🏅
            </button>
            <button
              onClick={() => onNavigate('parent')}
              className="bg-white/15 hover:bg-white/30 transition rounded-full w-10 h-10 flex items-center justify-center text-lg shadow"
              title="Parent Dashboard"
            >
              👨‍👩‍👧
            </button>
          </div>
        </div>

        {/* Mascot + greeting */}
        <div className="flex items-center gap-4 mb-5">
          <StellaFace state={streak.count >= 3 ? 'excited' : 'happy'} size={72} />
          <div className="flex-1">
            <div className="bg-white rounded-2xl px-3 py-2.5 shadow-lg inline-block max-w-full">
              <p className="font-bold text-gray-700 text-sm leading-snug">{greeting}</p>
            </div>
            <p className="text-white font-display text-2xl mt-1">Hi, {name}! {avatar}</p>
          </div>
        </div>

        {/* Level + XP bar */}
        <div className={`bg-gradient-to-r ${level.color} rounded-2xl p-4 mb-4 shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{level.emoji}</span>
              <div>
                <div className="text-white font-display text-base">{level.title}</div>
                <div className="text-white/70 text-xs font-bold">Level {level.n}</div>
              </div>
            </div>
            {nextLevel ? (
              <div className="text-right">
                <div className="text-white/70 text-xs font-bold">Next level:</div>
                <div className="text-white text-xs">{xp}/{nextLevel.min} XP</div>
              </div>
            ) : (
              <div className="text-yellow-100 font-bold text-xs">👑 MAX LEVEL!</div>
            )}
          </div>
          <div className="bg-white/30 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white rounded-full h-3 transition-all duration-700 shadow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main mode cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { id: 'learn',      icon: '📖', title: 'Learn',       sub: 'Grammar & spelling rules',   gradient: 'from-blue-400 to-blue-600',     navigateTo: 'learn' },
            { id: 'flashcards', icon: `${flashcardsLearned.length > 0 ? '📚' : '🔤'}`, title: 'Word Cards', sub: `${flashcardsLearned.length}/100 words`, gradient: 'from-purple-400 to-purple-600', navigateTo: 'flashcards' },
            { id: 'practice',   icon: '✏️', title: 'Practice',    sub: 'Hints · no timer',           gradient: 'from-emerald-400 to-teal-500',   navigateTo: 'practice', opts: { round: null } },
            { id: 'quiz',       icon: '🏆', title: 'Quiz Time!',  sub: 'Timed · earn XP',            gradient: 'from-orange-400 to-rose-500',    navigateTo: 'quiz' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => onNavigate(mode.navigateTo, mode.opts || {})}
              className={`mode-card bg-gradient-to-br ${mode.gradient} rounded-2xl p-4 text-white shadow-xl text-left`}
            >
              <div className="text-4xl mb-2">{mode.icon}</div>
              <div className="font-display text-xl leading-tight">{mode.title}</div>
              <div className="text-white/75 text-xs mt-1 font-semibold">{mode.sub}</div>
            </button>
          ))}
        </div>

        {/* Quick round access with accuracy indicators */}
        <div className="bg-white/12 backdrop-blur-sm rounded-2xl p-3 border border-white/20 mb-3">
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Quick Practice by Round</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { n: 1, emoji: '🔍', label: 'Errors' },
              { n: 2, emoji: '🔀', label: 'Scramble' },
              { n: 3, emoji: '✏️', label: 'Spelling' },
              { n: 4, emoji: '🗣️', label: 'Spell It' },
            ].map(r => {
              const acc = roundAccuracy(r.n)
              return (
                <button
                  key={r.n}
                  onClick={() => onNavigate('practice', { round: r.n })}
                  className="bg-white/15 hover:bg-white/30 active:scale-95 text-white rounded-xl p-2.5 text-center transition-all hover:scale-105 border border-white/20"
                >
                  <div className="text-xl mb-0.5">{r.emoji}</div>
                  <div className="font-display text-xs">R{r.n}</div>
                  {acc !== null ? (
                    <div className={`text-xs font-bold mt-0.5 ${acc >= 80 ? 'text-emerald-300' : acc >= 60 ? 'text-yellow-300' : 'text-red-300'}`}>
                      {acc}%
                    </div>
                  ) : (
                    <div className="text-white/40 text-xs mt-0.5">—</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent badges */}
        {recentBadges.length > 0 && (
          <div className="bg-white/12 backdrop-blur-sm rounded-2xl p-3 border border-white/20 mb-3">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Recent Badges</p>
            <div className="flex gap-3">
              {recentBadges.map(b => (
                <div key={b.id} className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-1.5">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-white font-bold text-xs">{b.name}</span>
                </div>
              ))}
              {badges.length > 3 && (
                <button onClick={() => onNavigate('achievements')} className="text-white/60 text-xs font-bold self-center ml-auto">
                  +{badges.length - 3} more →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Badge invite if none earned */}
        {badges.length === 0 && (
          <div className="bg-white/10 rounded-2xl p-3 border border-white/20 mb-3 text-center">
            <p className="text-white/70 text-sm font-bold">🔒 Complete your first quiz to earn badges!</p>
          </div>
        )}

        {/* Competition prep reminder */}
        <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
          <p className="text-white/50 text-xs">Master Spellers 2026-27 · Grade 2 Beta · 4 rounds · 10 marks each</p>
        </div>
      </div>
    </div>
  )
}
