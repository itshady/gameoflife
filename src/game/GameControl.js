import GameOfLife from './GameOfLife'

class GameControl {
  constructor(width, height, onGameLoop) {
    this.gameEngine = new GameOfLife(width, height)
    this.generationCount = 0
    this.onGameLoop = onGameLoop
  }

  get mapData() {
    return this.gameEngine.mapData
  }

  set mapData(newMapData) {
    this.gameEngine.mapData = newMapData
  }

  gameLoop() {
    this.gameEngine.nextGeneration()
    this.generationCount += 1
    this.onGameLoop()
  }
}

export default GameControl
