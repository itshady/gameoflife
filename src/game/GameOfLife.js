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
}

export default GameOfLife
