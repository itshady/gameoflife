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

  constructor(speciesCount) {
    this.speciesCount = speciesCount
  }

  singleplayer(map, i, j) {
    const speciesId = map.id
    const cell = map.getCell(i, j)
    const neighbourCount = map.countFriendlyNeighbours(i, j)
    if (map.isFriendly(i, j) || map.isDead(i, j)) {
      let newData = cell
      if (cell === speciesId && neighbourCount < 2) newData = UnderPopulation.newCellData()
      else if (cell === speciesId && neighbourCount < 4) newData = Survive.newCellData(speciesId)
      else if (cell === speciesId) newData = OverPopulation.newCellData()
      else if (cell === 0 && neighbourCount === 3) newData = Reproduction.newCellData(speciesId)
      return newData
    }
    return 0
  }

  // Each species grows as per singleplayer rules
  // When conflicting, the one with the most neighbours wins, else both die

  multiplayer(maps, i, j) {
    let cellArray
    (cellArray = []).length = maps.length; cellArray.fill(0);
    let neighbourCountArray
    (neighbourCountArray = []).length = maps.length; neighbourCountArray.fill(0); //same as new Array(len).fill(0)

    const getOnlyOccupant = (cellArray) => {
      return Math.max(...cellArray)
    }

    const isContested = (cellArray) => {
      return cellArray.reduce((sum, value) => sum + (value ? 1 : 0), 0) > 1
    }

    const isOccupied = (cellArray) =>  {
      return getOnlyOccupant(cellArray) != 0
    }

    const cellDead = () => {
      return 0
    }

    const cellWinner = (speciesId) => {
      return speciesId
    }
    
    maps.forEach((map, index) => {
      neighbourCountArray[index] = map.countFriendlyNeighbours(i, j)
      cellArray[index] = map.getCell(i, j)
    })

    const maxNeighbours = Math.max(...neighbourCountArray)
    const maxIndex = neighbourCountArray.indexOf(maxNeighbours)
    const instanceCount = this.countInstances(maxNeighbours, neighbourCountArray)

    if (isOccupied(cellArray)) {
      if (isContested(cellArray)) {
        if (this.isTied(instanceCount))
          return cellDead()
        else
          return cellWinner(cellArray[maxIndex])
      }
      else {
        return cellWinner(getOnlyOccupant(cellArray))
      }
    } else {
      return cellDead()
    }
  }

  isTied(instanceCount) {
    return instanceCount != 1
  }

  countInstances(value, array) {
    return array.filter(x => x == value).length
  }

  findWinner(map) {
    const arrayOfLivingCells = this.countLivingCells(map)
    const maxLivingCells = Math.max(...arrayOfLivingCells)
    const maxIndex = arrayOfLivingCells.indexOf(maxLivingCells)
    const instanceCount = this.countInstances(maxLivingCells, arrayOfLivingCells)
    if (this.isTied(instanceCount)) return -1
    return maxIndex
  }

  countLivingCells(map) {
    const livingCellCountArray = new Array(this.speciesCount+1).fill(0)
    map.data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        livingCellCountArray[cellData] += cellData ? 1 : 0 
      })
    })
    return livingCellCountArray
  }
}

export default Rules
