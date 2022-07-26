import React, { useState } from "react"
import Row from './Row.js'

const Grid = ({width, height, mapData}) => {
  var items = []

  for (var i=0; i < height; i++) {
    items.push(<Row width={width} key={`${i}`}/>)
  }

  return (
    <div>
      <table>
        <tbody>
          {items}
        </tbody>
      </table>
    </div>
  )
}

export default Grid;