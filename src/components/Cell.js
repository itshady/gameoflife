import React from 'react'
import '../assets/Cell.css'

function Cell({
  state, setMap, map, cellKey,
}) {
  const handleClick = (e) => {
    const a = e.target.parentElement.getAttribute('data-key')
    const b = e.target.getAttribute('data-key')
    const newMap = map
    newMap[parseInt(a, 10)][parseInt(b, 10)] = state ? 0 : 1
    setMap(newMap)
    console.log(map)
  }

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <td className={`cell ${state ? 'alive' : 'dead'}`} data-testid="cell" onClick={handleClick} data-key={cellKey} />
  )
}

export default Cell
