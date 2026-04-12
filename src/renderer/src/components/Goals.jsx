import { useState, useEffect } from 'react'

const Goals = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const initGoals = async () => {
      const data = await window.electronAPI.goals.init()
      setGoals(data)
    }
    initGoals()
  }, [])

  const handleUpdateProgress = async (id, progress) => {
    const updatedGoals = await window.electronAPI.goals.updateProgress(id, progress)
    setGoals(updatedGoals)
  }

  return (
    <div className="goals-container">
      <h2 className="goals-title">Today's Goals</h2>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-item">
          <span className="goal-label">{goal.title}</span>
          <div className="progress-bar-outer">
            <div 
              className="progress-bar-inner" 
              style={{ width: `${(goal.progress / goal.target) * 100}%` }}
            ></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="goal-progress-text">{goal.progress} / {goal.target}</span>
            {goal.progress < goal.target && (
              <button 
                onClick={() => handleUpdateProgress(goal.id, goal.progress + 1)}
                style={{ 
                  background: '#2a2a2a', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  padding: '2px 8px', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Goals
