/* eslint-disable no-underscore-dangle */
class GameOfLife {
  constructor(width, height) {
    this.mapData = Array.from(Array(height), () => Array(width).fill(0))
  }

  get mapData() {
    return this._mapData
  }

  set mapData(newMapData) {
    this._mapData = newMapData
  }

  nextGeneration() {
    this.countNeighbours(1, 1)
  }

  countNeighbours(x, y) {
    const deltas = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 }, { x: 1, y: 0 },
      { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ]

    const inRange = (rowIndex, colIndex) => rowIndex >= 0 && colIndex >= 0
      && rowIndex < this._mapData.length && colIndex < this._mapData[0].length

    return deltas.reduce((sum, delta) => {
      const rowIndex = x + delta.x
      const colIndex = y + delta.y

      return inRange(rowIndex, colIndex) ? sum + this._mapData[x + delta.x][y + delta.y] : sum
    }, 0)
  }
}

export default GameOfLife
