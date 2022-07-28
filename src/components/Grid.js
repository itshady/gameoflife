import React from 'react'
import Row from './Row.js'

const validate = (mapData) => {
  const { length } = mapData[0]
  return mapData.every((rowData) => rowData.length === length)
}

// eslint-disable-next-line no-unused-vars
function Grid({ mapData, setMap }) {
  const status = validate(mapData)

  if (!status) {
    return (
      <div className="error-message">This map data is invalid</div>
    )
  }

  const items = []

  mapData.forEach((rowData, i) => {
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
