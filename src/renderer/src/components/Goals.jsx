import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, Plus, Target } from 'lucide-react'

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
    <div className="goals-container" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="goals-header">
        <Target className="text-accent" size={20} color="#7c4dff" />
        <h2 className="goals-title" style={{ margin: 0 }}>Daily Objectives</h2>
      </div>

      <div className="goals-list">
        <AnimatePresence>
          {goals.map((goal, index) => (
            <motion.div 
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="goal-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="goal-title">{goal.title}</span>
                {goal.progress >= goal.target && <CheckCircle2 size={16} color="#4ade80" />}
              </div>

              <div className="progress-container">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    background: goal.progress >= goal.target 
                      ? 'linear-gradient(90deg, #4ade80, #22c55e)' 
                      : 'linear-gradient(90deg, #00d2ff, #7c4dff)'
                  }}
                />
              </div>

              <div className="goal-footer">
                <span className="goal-stats">
                  {goal.progress} / {goal.target} complete
                </span>
                
                {goal.progress < goal.target && (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateProgress(goal.id, goal.progress + 1)}
                    className="btn-update"
                  >
                    <Plus size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Goals
