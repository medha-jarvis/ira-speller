import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import LearnScreen from './screens/LearnScreen'
import FlashcardScreen from './screens/FlashcardScreen'
import PracticeScreen from './screens/PracticeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [practiceRound, setPracticeRound] = useState(null)
  const [quizResults, setQuizResults] = useState(null)

  const navigate = (to, opts = {}) => {
    if (opts.round !== undefined) setPracticeRound(opts.round)
    setScreen(to)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600">
      {screen === 'home' && (
        <HomeScreen onNavigate={navigate} />
      )}
      {screen === 'learn' && (
        <LearnScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'flashcards' && (
        <FlashcardScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'practice' && (
        <PracticeScreen round={practiceRound} onBack={() => setScreen('home')} />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          onComplete={(results) => { setQuizResults(results); setScreen('results') }}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          results={quizResults}
          onHome={() => setScreen('home')}
          onRetry={() => setScreen('quiz')}
          onPractice={() => setScreen('practice')}
        />
      )}
    </div>
  )
}
