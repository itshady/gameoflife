import React from "react"
import '../assets/Cell.css'

const Cell = ({state}) => {
  return (
    <td className={`cell ${state ? 'alive' : 'dead'}`} ></td>
  )
}

export default Cell;