function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="app">
      <h1>Electron + Vite + React</h1>
    </div>
  )
}

export default App
