import React, { useState } from 'react'
import './App.css'
import Grid from './components/Grid.js'

function App() {
  const [map, setMap] = useState([
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
  ])

  setTimeout(() => {
    setMap([
      [map[0][0] === 0 ? 1 : 0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ])
  }, 1000)

  return (
    <div className="App">
      <Grid
        mapData={map}
        setMap={setMap}
      />
    </div>
  )
}

export default App
