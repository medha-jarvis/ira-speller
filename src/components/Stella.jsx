// Stella — the star mascot character
import { useEffect, useState } from 'react'
import { randomMsg } from '../store'

export function StellaFace({ state = 'happy', size = 80, animate = true }) {
  const isExcited = state === 'excited' || state === 'celebrating'

  return (
    <div
      className={`inline-block select-none ${animate ? (isExcited ? 'animate-bounce' : 'animate-[float_3s_ease-in-out_infinite]') : ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="starGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDE68A"/>
            <stop offset="100%" stopColor="#F59E0B"/>
          </radialGradient>
        </defs>

        {/* Star body */}
        <polygon
          points="50,8 61.8,35.5 91,35.5 67.5,52.5 77,80 50,63 23,80 32.5,52.5 9,35.5 38.2,35.5"
          fill="url(#starGrad)"
          stroke="#D97706"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Star inner highlight */}
        <polygon
          points="50,16 58,34 77,34 63,44.5 68,64 50,53 32,64 37,44.5 23,34 42,34"
          fill="#FCD34D"
          opacity="0.5"
        />

        {/* Cheek blushes */}
        {(state === 'happy' || state === 'excited' || state === 'celebrating') && (
          <>
            <ellipse cx="32" cy="52" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.6"/>
            <ellipse cx="68" cy="52" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.6"/>
          </>
        )}

        {/* Eyes */}
        {state === 'sad' ? (
          <>
            {/* Sad eyes — drooping */}
            <ellipse cx="39" cy="46" rx="4.5" ry="3.5" fill="#1F2937"/>
            <ellipse cx="61" cy="46" rx="4.5" ry="3.5" fill="#1F2937"/>
            <path d="M 35 43 Q 39 40 43 43" stroke="#1F2937" fill="none" strokeWidth="1.5"/>
            <path d="M 57 43 Q 61 40 65 43" stroke="#1F2937" fill="none" strokeWidth="1.5"/>
          </>
        ) : state === 'excited' || state === 'celebrating' ? (
          <>
            {/* Big excited eyes */}
            <circle cx="39" cy="46" r="6" fill="#1F2937"/>
            <circle cx="61" cy="46" r="6" fill="#1F2937"/>
            <circle cx="41" cy="44" r="2" fill="white"/>
            <circle cx="63" cy="44" r="2" fill="white"/>
          </>
        ) : (
          <>
            {/* Normal happy eyes */}
            <circle cx="39" cy="46" r="4.5" fill="#1F2937"/>
            <circle cx="61" cy="46" r="4.5" fill="#1F2937"/>
            <circle cx="41" cy="44" r="1.5" fill="white"/>
            <circle cx="63" cy="44" r="1.5" fill="white"/>
          </>
        )}

        {/* Mouth */}
        {state === 'happy' && (
          <path d="M 38 57 Q 50 67 62 57" stroke="#1F2937" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
        )}
        {(state === 'excited' || state === 'celebrating') && (
          <>
            <ellipse cx="50" cy="60" rx="9" ry="7" fill="#1F2937"/>
            <ellipse cx="50" cy="61" rx="7" ry="4" fill="#F87171" opacity="0.8"/>
          </>
        )}
        {state === 'sad' && (
          <path d="M 38 63 Q 50 55 62 63" stroke="#1F2937" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
        )}
        {state === 'neutral' && (
          <line x1="40" y1="60" x2="60" y2="60" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round"/>
        )}
        {state === 'thinking' && (
          <path d="M 40 60 Q 45 65 50 60 Q 55 55 60 60" stroke="#1F2937" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
        )}

        {/* Sparkles around star when celebrating */}
        {(state === 'celebrating' || state === 'excited') && (
          <>
            <text x="10" y="25" fontSize="14" className="sparkle-1">✨</text>
            <text x="75" y="20" fontSize="12" className="sparkle-2">⭐</text>
            <text x="5" y="70" fontSize="10" className="sparkle-3">💫</text>
          </>
        )}
      </svg>
    </div>
  )
}

export function StellaWithBubble({ state = 'happy', msgKey, message, size = 80, bubblePos = 'right' }) {
  const msg = message || randomMsg(msgKey || 'greeting')

  return (
    <div className={`flex items-center gap-3 ${bubblePos === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>
      <StellaFace state={state} size={size} />
      {msg && (
        <div className={`relative bg-white rounded-2xl px-3 py-2 shadow-lg max-w-[200px] animate-[bounceIn_0.4s_ease-out]`}>
          {/* Bubble tail */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${bubblePos === 'right' ? '-left-2 border-r-8 border-r-white border-y-8 border-y-transparent' : '-right-2 border-l-8 border-l-white border-y-8 border-y-transparent'}`} />
          <p className="text-gray-700 font-bold text-sm leading-snug">{msg}</p>
        </div>
      )}
    </div>
  )
}

// Floating reaction popup — shows briefly after answer
export function StellaReaction({ correct, timeout, show, onDone }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onDone, 1800)
      return () => clearTimeout(t)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-[bounceIn_0.3s_ease-out]">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white shadow-2xl ${
        correct ? 'bg-emerald-500' : 'bg-red-500'
      }`}>
        <StellaFace state={correct ? 'happy' : 'sad'} size={36} animate={false} />
        <span>{correct ? randomMsg('correct') : timeout ? randomMsg('timeout') : randomMsg('wrong')}</span>
      </div>
    </div>
  )
}
