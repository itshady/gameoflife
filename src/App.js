import React, { useState, useEffect } from 'react'
import './App.css'
import Grid from './components/Grid.js'
import GameOfLife from './game/GameOfLife'

function gameLoop(setMap, game) {
  game.nextGeneration()
  setMap(game.mapData)
}

function App() {
  const game = new GameOfLife(11, 11)
  const mapPointer = game.mapData
  // eslint-disable-next-line no-multi-assign, max-len
  mapPointer[3][3] = mapPointer[2][3] = mapPointer[3][2] = mapPointer[2][1] = mapPointer[1][3] = mapPointer[0][0] = 1
  const [map, setMap] = useState(mapPointer)

  useEffect(() => {
    const interval = setInterval(() => {
      gameLoop(setMap, game)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <Grid
        mapData={map}
      />
    </div>
  )
}

export default App
