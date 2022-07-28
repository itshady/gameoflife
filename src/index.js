import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App initialMapState={[
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 0],
    ]}
    />
  </React.StrictMode>,
)
