import React, { useState } from 'react'
import './App.css'
import Grid from './components/Grid.js'
import GameOfLife from './game/GameOfLife'

function gameLoop(map, setMap, game) {
  game.nextGeneration()
  setMap(game.mapData)
}

function App() {
  const game = new GameOfLife(40, 20)
  const mapPointer = game.mapData
  // eslint-disable-next-line no-multi-assign, max-len
  mapPointer[10][10] = mapPointer[9][10] = mapPointer[10][9] = mapPointer[9][8] = mapPointer[8][10] = mapPointer[5][5] = 1
  const [map, setMap] = useState(mapPointer)

  setTimeout(() => gameLoop(map, setMap, game), 1000)

  return (
    <div className="App">
      <Grid
        mapData={map}
      />
    </div>
  )
}

export default App
