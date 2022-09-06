import GameOfLife from './GameOfLife.js'

class GameControl {
  constructor(initMap, speciesCount, onGameStart, onGameStop, onGameNext, onBackGeneration, onGameOver) {
    this.intervalId = 0
    this.speciesCount = speciesCount
    this.onGameStart = onGameStart
    this.onGameStop = onGameStop
    this.onGameNext = onGameNext
    this.onGameOver = onGameOver
    this.onBackGeneration = onBackGeneration
    this.reset(initMap)
  }

  get isActive() {
    return this.generationCount !== 0
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
    if (this.gameEngine.isGameOver) return
    this.gameEngine.nextGeneration()
    this.generationCount += 1
    this.onGameNext()
    if (this.gameEngine.isGameOver) {
      this.stop()
      this.onGameOver(this.gameEngine.isGameOver)
    }
  }

  validate(map) {
    const { length } = map[0]
    return map.every((rowData) => rowData.length === length)
  }

  reset(map) {
    if (this.validate(map)) this.gameEngine = new GameOfLife(map, this.speciesCount)
    else throw 'Map Data invalid. Must be rectangular.'
    this.generationCount = 0
  }

  backGeneration() {
    if (this.isActive) {
      this.gameEngine.mapData = this.gameEngine.history.pop() // pop also removes the last element from the array permenantly
      this.generationCount -= 1
    }
    this.onBackGeneration()
  }
}

export default GameControl
