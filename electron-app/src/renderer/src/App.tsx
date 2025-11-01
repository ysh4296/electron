function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="app">
      <h1>Electron + Vite + React</h1>
      <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px'}}>
        <p> hi</p>
      </div>
    </div>
  )
}

export default App
