const Goals = () => {
  const goals = [
    { title: "GitHub Commits", type: "coding", target: 5, progress: 2 },
    { title: "DSA Problems", type: "dsa", target: 3, progress: 1 },
    { title: "Study Time (hrs)", type: "study", target: 4, progress: 0 }
  ]

  return (
    <div className="goals-container">
      <h2 className="goals-title">Today's Goals</h2>
      {goals.map((goal, index) => (
        <div key={index} className="goal-item">
          <span className="goal-label">{goal.title}</span>
          <div className="progress-bar-outer">
            <div 
              className="progress-bar-inner" 
              style={{ width: `${(goal.progress / goal.target) * 100}%` }}
            ></div>
          </div>
          <span className="goal-progress-text">{goal.progress} / {goal.target}</span>
        </div>
      ))}
    </div>
  )
}

export default Goals
