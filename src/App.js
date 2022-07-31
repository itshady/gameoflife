import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Bootstrap Components
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

// This Projects Components
import Grid from './components/Grid'
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
  const [intervalId, setIntervalId] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     gameLoop(setMap, game)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  const handleClick = () => {
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

  return (
    <Container className="app d-flex flex-column align-items-center">
      <Grid
        mapData={map}
      />
      <Button onClick={handleClick}>{intervalId ? 'Stop' : 'Start'}</Button>
    </Container>
  )
}

export default App
