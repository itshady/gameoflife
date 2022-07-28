import React from 'react'
import './App.css'
import Grid from './components/Grid.js'

function App() {
  return (
    <div className="App">
      <Grid
        mapData={[
          [0, 0, 0],
          [0, 1, 1],
          [0, 1, 0],
        ]}
      />
    </div>
  )
}

export default App
