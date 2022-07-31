import React from 'react'
import Cell from './Cell'

const Row = ({ rowData }) => {
  const items = []

  rowData.forEach((cellState, i) => {
    items.push(<Cell state={cellState} key={`${i}`} />)
  })

  return (
    <tr>
      {items}
    </tr>
  )
}

export default Row
