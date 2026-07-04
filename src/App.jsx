import { useState } from 'react'
import { StoreProvider, useStore } from './store'
import HomeScreen from './screens/HomeScreen'
import LearnScreen from './screens/LearnScreen'
import FlashcardScreen from './screens/FlashcardScreen'
import PracticeScreen from './screens/PracticeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import AchievementsScreen from './screens/AchievementsScreen'
import ParentDashboard from './screens/ParentDashboard'

function AppContent() {
  const { store } = useStore()
  const [screen, setScreen] = useState('home')
  const [practiceRound, setPracticeRound] = useState(null)
  const [quizPayload, setQuizPayload] = useState(null)

  const navigate = (to, opts = {}) => {
    if (opts.round !== undefined) setPracticeRound(opts.round)
    setScreen(to)
    window.scrollTo(0, 0)
  }

  // Show onboarding on first launch
  if (!store.onboarded) {
    return <OnboardingScreen onComplete={() => setScreen('home')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-600 to-blue-600">
      {screen === 'home'         && <HomeScreen onNavigate={navigate} />}
      {screen === 'learn'        && <LearnScreen onBack={() => setScreen('home')} />}
      {screen === 'flashcards'   && <FlashcardScreen onBack={() => setScreen('home')} />}
      {screen === 'practice'     && <PracticeScreen round={practiceRound} onBack={() => setScreen('home')} />}
      {screen === 'achievements' && <AchievementsScreen onBack={() => setScreen('home')} />}
      {screen === 'parent'       && <ParentDashboard onBack={() => setScreen('home')} />}
      {screen === 'quiz'         && (
        <QuizScreen
          onComplete={(payload) => { setQuizPayload(payload); setScreen('results') }}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'results'      && (
        <ResultsScreen
          results={quizPayload}
          onHome={() => setScreen('home')}
          onRetry={() => setScreen('quiz')}
          onPractice={() => setScreen('practice')}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
