import React, { useState } from 'react'
import './App.css'
import Grid from './components/Grid.js'

function gameLoop(map, setMap) {
  const newMap = JSON.parse(JSON.stringify(map))
  newMap[0][0] = map[0][0] === 0 ? 1 : 0
  setMap(newMap)
}

function App() {
  const initialState = Array.from(Array(5), () => Array(20).fill(0))
  const [map, setMap] = useState(initialState)

  setTimeout(() => gameLoop(map, setMap), 1000)

  return (
    <div className="App">
      <Grid
        mapData={map}
      />
    </div>
  )
}

export default App
