import React from 'react'
import Cell from './Cell.js'

const Row = ({
  rowData, setMap, map, rowKey,
}) => {
  const items = []

  rowData.forEach((cellState, i) => {
    items.push(<Cell state={cellState} setMap={setMap} map={map} key={`${i}`} cellKey={i} />)
  })

  return (
    <tr data-key={rowKey}>
      {items}
    </tr>
  )
}

export default Row
