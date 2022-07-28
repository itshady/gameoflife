import React from 'react'
import '../assets/Cell.css'

function Cell({ state }) {
  return (
    <td className={`cell ${state ? 'alive' : 'dead'}`} data-testid="cell" />
  )
}

export default Cell
