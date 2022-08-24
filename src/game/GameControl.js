import GameOfLife from './GameOfLife.js'

class GameControl {
  constructor(width, height, onGameStart, onGameStop, onGameLoop) {
    this.gameEngine = new GameOfLife(width, height)
    this.generationCount = 0
    this.intervalId = 0
    this.onGameStart = onGameStart
    this.onGameStop = onGameStop
    this.onGameLoop = onGameLoop
    // eslint-disable-next-line no-console
    console.log('.')
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
      this.gameLoop()
    }, intervalTime)
    this.onGameStart()
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = 0
    this.onGameStop()
  }

  gameLoop() {
    this.gameEngine.nextGeneration()
    this.generationCount += 1
    this.onGameLoop()
  }
}

export default GameControl
