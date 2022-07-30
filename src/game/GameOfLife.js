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
    return this._sum
  }

  countNeighbours(x, y) {
    const deltas = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 }, { x: 1, y: 0 },
      { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ]

    return deltas.reduce((sum, delta) => sum + this._mapData[x + delta.x][y + delta.y], 0)
  }
}

export default GameOfLife
