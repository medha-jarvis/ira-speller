import { useState } from 'react'
import { grammarLessons, spellingTips, unscramblingTips } from '../data'

const TABS = [
  { id: 'grammar',    label: '✅ Grammar',   emoji: '📚' },
  { id: 'scramble',  label: '🔀 Unscramble', emoji: '🧩' },
  { id: 'spelling',  label: '🔤 Spelling',   emoji: '✏️' },
]

export default function LearnScreen({ onBack }) {
  const [tab, setTab] = useState('grammar')
  const [openLesson, setOpenLesson] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white hover:text-white/80 transition p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-display text-2xl text-white">Learn</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setOpenLesson(null) }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              tab === t.id
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {tab === 'grammar' && (
          <GrammarTab openLesson={openLesson} setOpenLesson={setOpenLesson} />
        )}
        {tab === 'scramble' && <ScrambleTab />}
        {tab === 'spelling' && <SpellingTab />}
      </div>
    </div>
  )
}

function GrammarTab({ openLesson, setOpenLesson }) {
  return (
    <div className="space-y-3 pt-2">
      <p className="text-white/80 text-sm font-semibold mb-3">
        Tap a lesson to learn the rule, then see examples!
      </p>
      {grammarLessons.map((lesson, i) => (
        <div key={i} className="rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() => setOpenLesson(openLesson === i ? null : i)}
            className={`w-full bg-gradient-to-r ${lesson.color} p-4 text-left flex items-center gap-3`}
          >
            <span className="text-3xl">{lesson.icon}</span>
            <div className="flex-1">
              <div className="font-display text-white text-xl">{lesson.title}</div>
              <div className="text-white/70 text-xs">{lesson.rules.length} rules to learn</div>
            </div>
            <span className="text-white text-xl">{openLesson === i ? '▲' : '▼'}</span>
          </button>

          {openLesson === i && (
            <div className={`${lesson.bgLight} p-4 space-y-4`}>
              {lesson.rules.map((r, j) => (
                <div key={j} className={`border-l-4 ${lesson.borderColor} pl-3`}>
                  <p className="font-bold text-gray-800 text-sm mb-1">📌 {r.rule}</p>
                  {r.examples.map((ex, k) => (
                    <p key={k} className="text-gray-600 text-sm font-mono bg-white rounded px-2 py-0.5 mb-1 inline-block mr-2">
                      {ex}
                    </p>
                  ))}
                </div>
              ))}
              <div className="bg-yellow-100 border border-yellow-300 rounded-xl px-3 py-2 mt-3">
                <p className="text-yellow-800 text-sm font-bold">{lesson.tip}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ScrambleTab() {
  return (
    <div className="pt-2 space-y-3">
      <p className="text-white/80 text-sm font-semibold mb-3">
        5 tricks to unscramble any word quickly!
      </p>
      {unscramblingTips.map((tip, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">{tip.icon}</span>
            <div>
              <p className="font-bold text-purple-700 text-base mb-1">{tip.title}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{tip.body}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Practice Example */}
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-4 border border-purple-200 mt-4">
        <p className="font-bold text-purple-800 mb-3">🎯 Try It! Can you spot these words?</p>
        {[
          { s: 'EMRHOT', a: 'MOTHER', hint: 'female parent' },
          { s: 'CETINHK', a: 'KITCHEN', hint: 'room for cooking' },
          { s: 'BARETKFSA', a: 'BREAKFAST', hint: 'first meal' },
        ].map((ex, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <span className="font-mono font-bold text-purple-600 bg-white px-2 py-0.5 rounded text-sm">{ex.s}</span>
            <span className="text-gray-500 text-sm">({ex.hint})</span>
            <span className="text-gray-400 mx-1">→</span>
            <span className="font-bold text-emerald-600">{ex.a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpellingTab() {
  return (
    <div className="pt-2 space-y-3">
      <p className="text-white/80 text-sm font-semibold mb-3">
        Master these spelling rules and you'll ace Round 3!
      </p>
      {spellingTips.map((tip, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
          <div className={`bg-gradient-to-r ${tip.color} px-4 py-3 flex items-center gap-2`}>
            <span className="text-2xl">{tip.icon}</span>
            <span className="font-display text-white text-lg">{tip.title}</span>
          </div>
          <div className="p-4">
            <div className="space-y-2 mb-3">
              {tip.examples.map((ex, j) => (
                <div key={j} className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-0.5 rounded font-mono">✓ {ex.correct}</span>
                  <span className="bg-red-100 text-red-500 text-sm px-2 py-0.5 rounded line-through font-mono">✗ {ex.wrong}</span>
                  <span className="text-gray-500 text-xs">({ex.note})</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <p className="text-amber-800 text-sm font-bold">{tip.tip}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
