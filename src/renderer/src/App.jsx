function App() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="top-bar">
        <h1>DigitalPet</h1>
      </header>
      <main className="main-content">
        <section className="column">Goals</section>
        <section className="column">Pomodoro</section>
        <section className="column">Pet</section>
      </main>
    </div>
  )
}

export default App
