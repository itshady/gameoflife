import React from "react"
import Cell from './Cell.js'

const Row = ({width}) => {
  var items = []

  for (var i=0; i < width; i++) {
    items.push(<Cell state={true} key={`${i}`} />)
  }

  return(
    <tr>
      {items}
    </tr>
  )
}

export default Row;