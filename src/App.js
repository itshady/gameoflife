import React, { useState } from 'react'
import './App.css'
import Grid from './components/Grid.js'

function App({ initialMapState }) {
  const [mapState, setMapState] = useState(initialMapState)
  const grid = React.createRef()

  setTimeout(() => {
    console.log('.')
    mapState[0][0] = mapState[0][0] === 0 ? 1 : 0
    setMapState(mapState)
  }, 1)

  return (
    <div className="App">
      <Grid
        ref={grid}
        mapData={mapState}
      />
    </div>
  )
}

export default App
