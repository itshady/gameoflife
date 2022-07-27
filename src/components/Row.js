import React from "react"
import Cell from './Cell.js'

const Row = ({rowData}) => {
  var items = []

  rowData.forEach((cellState,i) => {
    items.push(<Cell state={cellState} key={`${i}`} />)
  })

  return(
    <tr>
      {items}
    </tr>
  )
}

export default Row;