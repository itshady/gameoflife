import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div>
    <a href={process.env.PUBLIC_URL + "/html"} >(MORE RECENT AND WAY BETTER) Html version of Game</a>
    <App />
  </div>
)
