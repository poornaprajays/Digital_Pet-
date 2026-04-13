import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react'

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState('focus')

  const totalTime = sessionType === 'focus' ? 25 * 60 : 5 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    let interval = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (sessionType === 'focus') {
        setSessionType('break')
        setTimeLeft(5 * 60)
      } else {
        setSessionType('focus')
        setTimeLeft(25 * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, sessionType])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => setIsRunning(!isRunning)
  const handleReset = () => {
    setIsRunning(false)
    setSessionType('focus')
    setTimeLeft(25 * 60)
  }

  return (
    <div className="pomodoro-content">
      <div className="timer-display">
        <svg className="timer-circle" width="240" height="240">
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke={sessionType === 'focus' ? '#7c4dff' : '#00d2ff'}
            strokeWidth="8"
            strokeDasharray="691.15"
            animate={{ strokeDashoffset: 691.15 - (691.15 * progress) / 100 }}
            transition={{ duration: 1, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="timer-text">{formatTime(timeLeft)}</div>
        <div className="timer-status">
          {sessionType === 'focus' ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key="focus"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Target size={14} /> Focus
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key="break"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Coffee size={14} /> Break
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="timer-controls">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="control-btn" 
          onClick={handleReset}
        >
          <RotateCcw size={20} />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="control-btn primary" 
          onClick={handleStartPause}
        >
          {isRunning ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" style={{ marginLeft: '4px' }} />}
        </motion.button>
      </div>
    </div>
  )
}

export default Pomodoro
