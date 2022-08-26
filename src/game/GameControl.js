import GameOfLife from './GameOfLife.js'

class GameControl {
  constructor(width, height, onGameStart, onGameStop, onGameNext) {
    this.width = width
    this.height = height
    this.intervalId = 0
    this.onGameStart = onGameStart
    this.onGameStop = onGameStop
    this.onGameNext = onGameNext
    this.reset()
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

  get history() {
    return this.gameEngine.history
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

  reset() {
    this.gameEngine = new GameOfLife(this.width, this.height)
    this.generationCount = 0
  }
}

export default GameControl
