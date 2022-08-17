import GameOfLife from './GameOfLife'

class GameControl {
  constructor(width, height) {
    this.gameEngine = new GameOfLife(width, height)
  }

  get mapData() {
    return this.gameEngine.mapData
  }

  set mapData(newMapData) {
    this.gameEngine.mapData = newMapData
  }

  nextGeneration() {
    this.gameEngine.nextGeneration()
  }
}

export default GameControl
