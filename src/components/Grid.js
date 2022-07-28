import React, { useState, useEffect } from 'react'
import Row from './Row.js'

export const updateMap = (newMap) => {
  
}

const validate = (mapData) => {
  const { length } = mapData[0]
  return mapData.every((rowData) => rowData.length === length)
}

function Grid({ mapData }) {
  const [mapState, setMapState] = useState(mapData)
  const [status, setStatus] = useState(validate(mapState))

  useEffect(() => {
    console.debug('use effect ****************')
    setStatus(validate(mapState))
  }, [mapState])

  console.debug('init ****************')
  if (!status) {
    return (
      <div className="error-message">This map data is invalid</div>
    )
  }

  const items = []

  mapState.forEach((rowData, i) => {
    items.push(<Row rowData={rowData} key={`${i}`} />)
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

export default Grid
