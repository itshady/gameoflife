import Rules from './rules/Rules.js'

class GameOfLife {
  constructor(map) {
    this.width = map[0].length
    this.height = map.length
    this.history = []
    this.mapData = map
  }

  get mapData() {
    return this._mapData
  }

  set mapData(newMapData) {
    this._mapData = newMapData
  }

  get isGameOver() {
    const lastGen = this.history[this.history.length - 1]
    return JSON.stringify(lastGen) == JSON.stringify(this.mapData)
  }

  nextGeneration() {
    this.history.push(this.mapData)
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
