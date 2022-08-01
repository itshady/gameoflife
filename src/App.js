import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Bootstrap Components
import Button from 'react-bootstrap/Button'

// This Projects Components
import Grid from './components/Grid'
import GameOfLife from './game/GameOfLife'

function gameLoop(setMap, game) {
  game.nextGeneration()
  setMap(game.mapData)
}

function App() {
  const [game] = useState(new GameOfLife(40, 40))
  const mapPointer = game.mapData
  useEffect(() => {
    // eslint-disable-next-line no-multi-assign, max-len
    mapPointer[3][3] = mapPointer[2][3] = mapPointer[3][2] = mapPointer[2][1] = mapPointer[1][3] = mapPointer[0][0] = 1
  }, [])

  const [map, setMap] = useState(mapPointer)
  const [intervalId, setIntervalId] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     gameLoop(setMap, game)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  const handleLoop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
      return
    }

    const newIntervalId = setInterval(() => {
      gameLoop(setMap, game)
    }, 1000)
    setIntervalId(newIntervalId)
  }

  const handleNext = () => {
    gameLoop(setMap, game)
  }

  return (
    <div className="app d-flex flex-column align-items-center">
      <Grid
        mapData={map}
      />
      <div className="app d-flex flex-row justify-content-between button-container">
        <Button onClick={handleLoop}>{intervalId ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleNext} disabled={intervalId}>Next</Button>
      </div>
    </div>
  )
}

export default App
