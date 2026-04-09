const Pomodoro = () => {
  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">Focus Timer</h2>
      <div className="pomodoro-timer">25:00</div>
      <div className="pomodoro-session-label">Focus Session</div>
      <div className="pomodoro-buttons">
        <button className="btn-start">Start</button>
        <button className="btn-reset">Reset</button>
      </div>
      <div className="pomodoro-info">
        <span>Focus: 25 min</span>
        <span>Break: 5 min</span>
      </div>
    </div>
  )
}

export default Pomodoro
