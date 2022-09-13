import Rules from './rules/Rules'

/* eslint-disable no-underscore-dangle */
class GameOfLife {
  constructor(width, height) {
    this.height = height
    this.width = width
    this.mapData = Array.from(Array(this.height), () => Array(this.width).fill(0))
  }

  get mapData() {
    return this._mapData
  }

  set mapData(newMapData) {
    this._mapData = newMapData
  }

  nextGeneration() {
    const tempMap = Array.from(Array(this.height), () => Array(this.width).fill(0))
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        tempMap[i][j] = Rules.for(this.countNeighbours(i, j), this.mapData[i][j])
      }
    }
    this.mapData = tempMap
  }

  countNeighbours(x, y) {
    const deltas = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 }, { x: 1, y: 0 },
      { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ]

    const inRange = (rowIndex, colIndex) => rowIndex >= 0 && colIndex >= 0
      && rowIndex < this.height && colIndex < this.width

    return deltas.reduce((sum, delta) => {
      const rowIndex = x + delta.x
      const colIndex = y + delta.y

      return inRange(rowIndex, colIndex) ? sum + this._mapData[x + delta.x][y + delta.y] : sum
    }, 0)
  }
}

export default GameOfLife