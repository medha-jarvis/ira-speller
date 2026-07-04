import { createContext, useContext, useState } from 'react'

const KEY = 'ira-spell-v2'

// ── Level definitions ─────────────────────────────────────────
export const LEVELS = [
  { n: 1, title: 'Beginner Speller',   emoji: '🌱', min: 0,    max: 99,   color: 'from-gray-400 to-gray-500' },
  { n: 2, title: 'Junior Speller',     emoji: '📗', min: 100,  max: 249,  color: 'from-green-400 to-green-600' },
  { n: 3, title: 'Good Speller',       emoji: '📘', min: 250,  max: 499,  color: 'from-blue-400 to-blue-600' },
  { n: 4, title: 'Great Speller',      emoji: '🏅', min: 500,  max: 799,  color: 'from-indigo-400 to-indigo-600' },
  { n: 5, title: 'Expert Speller',     emoji: '🎖️', min: 800,  max: 1199, color: 'from-purple-400 to-purple-600' },
  { n: 6, title: 'Master Speller',     emoji: '🏆', min: 1200, max: 1699, color: 'from-orange-400 to-amber-500' },
  { n: 7, title: 'Champion Speller!',  emoji: '👑', min: 1700, max: Infinity, color: 'from-yellow-400 to-yellow-500' },
]

// ── Badge definitions ─────────────────────────────────────────
export const BADGES = [
  { id: 'first_quiz',     name: 'First Steps!',      desc: 'Completed your first quiz',               icon: '🎯', rarity: 'common' },
  { id: 'perfect_round',  name: 'Flawless Round',     desc: 'Scored 10/10 in any quiz round',          icon: '💯', rarity: 'uncommon' },
  { id: 'perfect_quiz',   name: 'Superstar!',         desc: '40/40 — all rounds perfect!',             icon: '🌟', rarity: 'legendary' },
  { id: 'streak_3',       name: 'On a Roll!',         desc: 'Practised 3 days in a row',               icon: '🔥', rarity: 'common' },
  { id: 'streak_7',       name: 'Red Hot!',           desc: 'Practised 7 days in a row',               icon: '🌋', rarity: 'rare' },
  { id: 'streak_14',      name: 'Unstoppable!',       desc: 'Practised 14 days in a row',              icon: '💥', rarity: 'legendary' },
  { id: 'words_25',       name: 'Word Collector',     desc: 'Learned 25 Word Basket words',            icon: '📖', rarity: 'common' },
  { id: 'words_50',       name: 'Word Expert',        desc: 'Learned 50 Word Basket words',            icon: '📚', rarity: 'uncommon' },
  { id: 'words_100',      name: 'Word Master!',       desc: 'Learned ALL 100 words!',                  icon: '🎓', rarity: 'legendary' },
  { id: 'quiz_5',         name: 'Dedicated',          desc: 'Completed 5 quizzes',                     icon: '⭐', rarity: 'common' },
  { id: 'quiz_10',        name: 'Champion',           desc: 'Completed 10 quizzes',                    icon: '🏅', rarity: 'uncommon' },
  { id: 'century',        name: 'Century!',           desc: 'Got 100 correct answers',                 icon: '💪', rarity: 'uncommon' },
  { id: 'grammar_guru',   name: 'Grammar Guru',       desc: 'Scored 8+ in Common Errors',              icon: '📝', rarity: 'rare' },
  { id: 'scramble_king',  name: 'Unscrambler!',       desc: 'Scored 8+ in Scrambled Words',            icon: '🔀', rarity: 'rare' },
  { id: 'spell_champ',    name: 'Spelling Bee',       desc: 'Scored 8+ in Correct Spelling',           icon: '✏️', rarity: 'rare' },
  { id: 'word_wizard',    name: 'Word Wizard',        desc: 'Scored 8+ in Spell The Word',             icon: '🪄', rarity: 'rare' },
]

export const RARITY_COLOR = {
  common:    'from-gray-400 to-gray-500',
  uncommon:  'from-blue-400 to-blue-600',
  rare:      'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-amber-500',
}

// ── Mascot messages ────────────────────────────────────────────
export const STELLA_MSGS = {
  correct:      ['Yes! That\'s right! ⭐', 'Amazing! 🌟', 'You\'re brilliant! ✨', 'Superstar! 🎊', 'Nailed it! 💪', 'Wonderful! 🎉'],
  wrong:        ['Oops! Not quite — keep going!', 'So close! Next one! 💫', 'That\'s okay! You\'re doing great!', 'Keep trying! 🌟'],
  timeout:      ['Time\'s up! That was tricky!', 'Oops! The clock beat you — next time!'],
  perfect_round:['10 out of 10! INCREDIBLE! 🏆', 'FLAWLESS! You\'re amazing! 🌟'],
  level_up:     ['You levelled up! 🚀 Incredible!', 'NEW LEVEL! You\'re unstoppable! ⭐'],
  greeting:     ['Ready to practise? Let\'s go! 🚀', 'Hi! Let\'s learn something amazing! ⭐', 'Your brain is getting stronger! 💪', 'You\'re going to do great today! 🌟'],
  streak:       ['Practising every day — amazing! 🔥', 'You\'re on a streak! Keep it up! 🔥'],
}

export function randomMsg(key) {
  const msgs = STELLA_MSGS[key] || ['Great!']
  return msgs[Math.floor(Math.random() * msgs.length)]
}

// ── Default store state ────────────────────────────────────────
const DEFAULT = {
  name: 'Ira',
  avatar: '⭐',
  onboarded: false,
  xp: 0,
  streak: { count: 0, lastDate: null },
  totalQuizzes: 0,
  totalCorrect: 0,
  totalAttempted: 0,
  badges: [],
  sessionHistory: [], // [{date, score, total, rounds, duration}]
  wrongLog: { 1: [], 2: [], 3: [], 4: [] }, // {qId/word, count}
  roundStats: {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  },
  flashcardsLearned: [],
  soundEnabled: true,
  dailyGoalMinutes: 10,
  todayMinutes: 0,
  todayDate: null,
}

// ── React Context ──────────────────────────────────────────────
const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [store, setStore] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT, ...parsed, wrongLog: { ...DEFAULT.wrongLog, ...parsed.wrongLog } }
      }
    } catch {}
    return { ...DEFAULT }
  })

  const update = (fn) => {
    setStore(prev => {
      const next = typeof fn === 'function' ? fn(prev) : { ...prev, ...fn }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return <Ctx.Provider value={{ store, update }}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}

// ── Helpers ────────────────────────────────────────────────────
export function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i]
  }
  return LEVELS[0]
}

export function getLevelProgress(xp) {
  const lvl = getLevel(xp)
  if (lvl.max === Infinity) return 100
  const range = lvl.max - lvl.min + 1
  return Math.min(100, Math.round(((xp - lvl.min) / range) * 100))
}

export function updateStreak(streak) {
  const today = new Date().toDateString()
  if (streak.lastDate === today) return { ...streak, isNew: false }
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  if (streak.lastDate === yesterday) {
    return { count: streak.count + 1, lastDate: today, isNew: true }
  }
  return { count: 1, lastDate: today, isNew: true }
}

export function computeNewBadges(prev, quizResults) {
  const earned = new Set(prev.badges)
  const toAdd = []
  const check = (id) => { if (!earned.has(id)) { toAdd.push(id); earned.add(id) } }

  const newQuizTotal = prev.totalQuizzes + 1
  const newCorrect = prev.totalCorrect + quizResults.reduce((s, r) => s + r.score, 0)

  if (newQuizTotal === 1) check('first_quiz')
  if (newQuizTotal >= 5) check('quiz_5')
  if (newQuizTotal >= 10) check('quiz_10')
  if (newCorrect >= 100) check('century')
  if (quizResults.some(r => r.score === r.total)) check('perfect_round')
  if (quizResults.length === 4 && quizResults.every(r => r.score === r.total)) check('perfect_quiz')

  quizResults.forEach(r => {
    if (r.score >= 8) {
      if (r.n === 1) check('grammar_guru')
      if (r.n === 2) check('scramble_king')
      if (r.n === 3) check('spell_champ')
      if (r.n === 4) check('word_wizard')
    }
  })

  const fl = prev.flashcardsLearned.length
  if (fl >= 25) check('words_25')
  if (fl >= 50) check('words_50')
  if (fl >= 100) check('words_100')

  const streak = prev.streak.count
  if (streak >= 3) check('streak_3')
  if (streak >= 7) check('streak_7')
  if (streak >= 14) check('streak_14')

  return toAdd
}

export function updateWrongLog(prevLog, quizResults) {
  const log = { ...prevLog, 1: [...(prevLog[1] || [])], 2: [...(prevLog[2] || [])], 3: [...(prevLog[3] || [])], 4: [...(prevLog[4] || [])] }
  quizResults.forEach(r => {
    if (!r.answers) return
    r.answers.filter(a => !a.correct).forEach(a => {
      const qId = r.n === 4 ? a.q?.word : a.q?.id
      if (!qId) return
      const existing = log[r.n].find(x => x.id === qId)
      if (existing) existing.count++
      else log[r.n].push({ id: qId, count: 1, label: r.n === 4 ? a.q?.word : (a.q?.parts?.join(' / ') || a.q?.scrambled || a.q?.sentence || '') })
    })
  })
  // keep top 20 per round by count
  Object.keys(log).forEach(k => {
    log[k] = log[k].sort((a, b) => b.count - a.count).slice(0, 20)
  })
  return log
}
