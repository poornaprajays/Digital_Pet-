import { useState, useEffect } from 'react'

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState('focus')

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

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSessionType('focus')
    setTimeLeft(25 * 60)
  }

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">Focus Timer</h2>
      <div className="pomodoro-timer">{formatTime(timeLeft)}</div>
      <div className="pomodoro-session-label">
        {sessionType === 'focus' ? 'Focus Session' : 'Break Session'}
      </div>
      <div className="pomodoro-buttons">
        <button className="btn-start" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="pomodoro-info">
        <span>Focus: 25 min</span>
        <span>Break: 5 min</span>
      </div>
    </div>
  )
}

export default Pomodoro
