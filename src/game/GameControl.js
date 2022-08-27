import GameOfLife from './GameOfLife.js'

class GameControl {
  constructor(initMap, onGameStart, onGameStop, onGameNext) {
    this.intervalId = 0
    this.onGameStart = onGameStart
    this.onGameStop = onGameStop
    this.onGameNext = onGameNext
    this.reset(initMap)
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

  validate(map) {
    const { length } = map[0]
    return map.every((rowData) => rowData.length === length)
  }

  reset(map) {
    if (this.validate(map)) this.gameEngine =  new GameOfLife(map)
    else throw 'Map Data invalid. Must be rectangular.'
    this.generationCount = 0
  }
}

export default GameControl
