import React, { useState } from "react"
import Row from './Row.js'

const Grid = ({mapData}) => {
  var items = []
  //console.debug(mapData)

  mapData.forEach((rowData,i) => {
    items.push(<Row rowData={rowData} key={`${i}`}/>)
  })
  // for (var [i,rowData] of mapData) {
  //   console.debug(rowData)
  //   items.push(<Row rowData={rowData} key={`${i}`}/>)
  // }

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