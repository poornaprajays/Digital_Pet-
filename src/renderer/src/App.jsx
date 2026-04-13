import { motion } from 'framer-motion'
import Goals from './components/Goals'
import Pomodoro from './components/Pomodoro'
import Pet from './components/Pet'
import './assets/main.css'

function App() {
  return (
    <div className="app-container">
      <header className="top-bar">
        <h1>DigitalPet.</h1>
      </header>
      
      <main className="main-content">
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          <Goals />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card"
        >
          <Pomodoro />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
        >
          <Pet state="idle" />
        </motion.section>
      </main>
    </div>
  )
}

export default App
