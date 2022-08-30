import UnderPopulation from './UnderPopulation.js'
import Survive from './Survive.js'
import OverPopulation from './OverPopulation.js'
import Reproduction from './Reproduction.js'

/* eslint-disable no-underscore-dangle */
class Rules {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  static for(speciesId, neighbourCount, cell) {
    let newData = cell
    if (cell === speciesId && neighbourCount < 2) newData = UnderPopulation.newCellData()
    else if (cell === speciesId && neighbourCount < 4) newData = Survive.newCellData(speciesId)
    else if (cell === speciesId) newData = OverPopulation.newCellData()
    else if (cell === 0 && neighbourCount === 3) newData = Reproduction.newCellData(speciesId)
    return newData
  }
}

//Rules for conflict
// whichever species has the most species neighbours wins
// if ties, cell is dead

export default Rules
