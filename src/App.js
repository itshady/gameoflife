import React, { useState } from 'react'
import './App.css'
import { scenario1 } from './game/mapScenarios/mapData.js'
import Grid from './components/Grid.js'

function gameLoop(map, setMap) {
  const newMap = JSON.parse(JSON.stringify(map))
  newMap[0][0] = map[0][0] === 0 ? 1 : 0
  setMap(newMap)
}

function App() {
  const initialState = scenario1
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
