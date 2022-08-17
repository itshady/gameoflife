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
  const onGameLoop = () => {
    setMap(game.mapData)
    setGenerationCount(game.generationCount)
  }
  const [game] = useState(new GameControl(11, 11, onGameLoop))

  const [map, setMap] = useState(game.mapData)
  const [intervalId, setIntervalId] = useState(0)
  const [generationCount, setGenerationCount] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [intervalTime, setIntervalTime] = useState(1000)

  const updateMap = (newMap) => {
    setMap(newMap)
    game.mapData = newMap
  }

  useEffect(() => {
    const mapPointer = JSON.parse(JSON.stringify(game.mapData))
    // eslint-disable-next-line no-multi-assign
    mapPointer[3][3] = mapPointer[2][3] = mapPointer[3][2] = mapPointer[2][1] = mapPointer[1][3] = mapPointer[0][0] = 1
    updateMap(mapPointer)
  }, [])

  const handleLoop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
      return
    }

    const newIntervalId = setInterval(() => {
      game.gameLoop()
    }, intervalTime)
    setIntervalId(newIntervalId)
  }

  const handleNext = () => {
    game.gameLoop()
  }

  const handleInterval = (e) => {
    setIntervalTime(MAXINTERVAL - e.target.value)
    if (intervalId) {
      clearInterval(intervalId)
      const newIntervalId = setInterval(() => {
        game.gameLoop()
      }, intervalTime)
      setIntervalId(newIntervalId)
    }
  }

  return (
    <div className="app d-flex flex-column align-items-center">
      <Grid
        mapData={map}
        setMap={updateMap}
      />
      <div className="app d-flex flex-row justify-content-between button-container">
        <Button onClick={handleLoop} key="button-start">{intervalId ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleNext} disabled={intervalId} key="button-next">Next</Button>
        <div>{generationCount}</div>
        <Form.Label><MdNextPlan /></Form.Label>
        <Form.Label><MdOutlineSpeed /></Form.Label>
        <Form.Range value={MAXINTERVAL - intervalTime} onChange={handleInterval} min={0} max={MAXINTERVAL} />
      </div>
    </div>
  )
}

export default App
