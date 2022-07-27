import React, { useState, useEffect } from "react"
import Row from './Row.js'

const validate = (mapData) => {
  var length = mapData[0].length
  return mapData.every((rowData) => {
    return rowData.length == length
  })
}

const Grid = ({mapData}) => {
  const [status, setStatus] = useState(validate(mapData))
  
  useEffect(() => {
    setStatus(validate(mapData))
  },[mapData]);

  if (!status) {
    return (
      <div className="error-message">This map data is invalid</div>
    )
  }

  var items = []

  mapData.forEach((rowData,i) => {
    items.push(<Row rowData={rowData} key={`${i}`}/>)
  })

  return (
    <div>
      <table className="map-grid">
        <tbody>
          {items}
        </tbody>
      </table>
    </div>
  )
}

export default Grid;