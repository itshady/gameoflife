/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Bootstrap Components
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { MdNextPlan, MdOutlineSpeed } from 'react-icons/md'

// This Projects Components
import Grid from './components/Grid'
// eslint-disable-next-line import/no-named-as-default
import GameControl from './game/GameControl'

const MAXINTERVAL = 5000

function App() {
  // eslint-disable-next-line no-console
  const onGameLoop = () => {
    setMap(game.mapData)
    setGenerationCount(game.generationCount)
  }

  const onGameStateChange = () => {
    setGameActive(game.isActive)
  }

  const gameControl = InitializeGameControl()
  const [game] = useState(gameControl)
  const [map, setMap] = useState(game.mapData)
  const [gameActive, setGameActive] = useState(game.isActive)
  const [generationCount, setGenerationCount] = useState(0)
  const [intervalTime, setIntervalTime] = useState(1000)

  const updateMap = (newMap) => {
    setMap(newMap)
    game.mapData = newMap
  }

  useEffect(() => {
    const nextMapData = JSON.parse(JSON.stringify(game.mapData))
    updateMap(nextMapData)
  }, [])

  const toggleGameState = () => {
    if (gameActive) {
      game.stop()
    } else {
      game.start(intervalTime)
    }
  }

  const handleNext = () => {
    game.gameLoop()
  }

  const handleInterval = (e) => {
    setIntervalTime(MAXINTERVAL - e.target.value)
    game.stop()
    game.start(intervalTime)
  }

  return (
    <div className="app d-flex flex-column align-items-center">
      <Grid
        mapData={map}
        setMap={updateMap}
      />
      <div className="app d-flex flex-row justify-content-between button-container">
        <Button onClick={toggleGameState} key="button-start">{gameActive ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleNext} disabled={gameActive} key="button-next">Next</Button>
        <div>{generationCount}</div>
        <Form.Label><MdNextPlan /></Form.Label>
        <Form.Label><MdOutlineSpeed /></Form.Label>
        <Form.Range value={MAXINTERVAL - intervalTime} onChange={handleInterval} min={0} max={MAXINTERVAL} />
      </div>
    </div>
  )

  function InitializeGameControl() {
    const gameInit = new GameControl(11, 11, onGameStateChange, onGameStateChange, onGameLoop)
    SetInitialGameMap(gameInit)
    return gameInit
  }

  function SetInitialGameMap(gameInit) {
    const mapPointer = JSON.parse(JSON.stringify(gameInit.mapData))
    // eslint-disable-next-line no-multi-assign
    mapPointer[3][3] = mapPointer[2][3] = mapPointer[3][2] = mapPointer[2][1] = mapPointer[1][3] = mapPointer[0][0] = 1
    // eslint-disable-next-line no-param-reassign
    gameInit.mapData = mapPointer
  }
}

export default App
