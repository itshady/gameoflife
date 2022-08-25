import GameOfLife from './GameOfLife.js'

class GameControl {
  constructor(width, height, onGameStart, onGameStop, onGameNext) {
    this.gameEngine = new GameOfLife(width, height)
    this.generationCount = 0
    this.intervalId = 0
    this.onGameStart = onGameStart
    this.onGameStop = onGameStop
    this.onGameNext = onGameNext
  }

  get isActive() {
    return this.intervalId !== 0
  }

  get mapData() {
    return this.gameEngine.mapData
  }

  set mapData(newMapData) {
    this.gameEngine.mapData = newMapData
  }

  start(intervalTime) {
    this.intervalId = setInterval(() => {
      this.nextGeneration()
    }, intervalTime)
    this.onGameStart()
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = 0
    this.onGameStop()
  }

  nextGeneration() {
    this.gameEngine.nextGeneration()
    this.generationCount += 1
    this.onGameNext()
  }
}

export default GameControl
