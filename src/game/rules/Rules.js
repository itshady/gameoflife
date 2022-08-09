import UnderPopulation from './UnderPopulation'
import Survive from './Survive'
import OverPopulation from './OverPopulation'
import Reproduction from './Reproduction'

/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
class Rules {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  static for(neighbourCount, cell) {
    let newData = cell
    if (cell === 1 && neighbourCount < 2) newData = UnderPopulation.newCellData()
    else if (cell === 1 && neighbourCount < 4) newData = Survive.newCellData()
    else if (cell === 1) newData = OverPopulation.newCellData()
    else if (cell === 0 && neighbourCount === 3) newData = Reproduction.newCellData()
    return newData
  }
}

export default Rules
