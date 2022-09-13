import Rules from './rules/Rules.js'
import Map from './components/map.js'

class GameOfLife {
  constructor(map, speciesCount) {
    this.width = map[0].length
    this.height = map.length
    this.speciesCount = speciesCount
    this.history = []
    this.currentGenMap = new Map(map, 0)
    this.rules = new Rules(speciesCount)
  }

  get mapData() {
    return this.currentGenMap.data
  }

  set mapData(newMapData) {
    this.currentGenMap.data = newMapData
  }

  get isGameOver() {
    const lastGen = this.history[this.history.length - 1]
    const twoGensAgo = this.history[this.history.length - 2]
    const threeGensAgo = this.history[this.history.length - 3]

    // if last gen == current, we done
    // else if this gen == 2 ago and last gen == 3 ago, then we flickering... done.
    if (JSON.stringify(lastGen) == JSON.stringify(this.mapData) || 
    (JSON.stringify(twoGensAgo) == JSON.stringify(this.mapData) && JSON.stringify(threeGensAgo) == JSON.stringify(lastGen))) {
      return this.rules.findWinner(this.currentGenMap)
    }
  }

  nextGeneration() {
    this.history.push(this.mapData)
    const speciesMaps = []
    for (let i=1; i <= this.speciesCount; i++) {
      speciesMaps.push(this.nextGenForSpecies(i))
    }

    this.mapData = this.mergeMapsDynamic(speciesMaps)
  }

  mergeMapsDynamic(maps) {
    const nextMap = this.createMapShell()
    
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        nextMap[i][j] = this.rules.multiplayer(maps, i, j)
      }
    }
    return nextMap
  }

  nextGenForSpecies(speciesId) {
    const nextGenForSpeciesMap = this.createMapShell()
    const tempCurrentMap = new Map(JSON.parse(JSON.stringify(this.mapData)), speciesId)
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        nextGenForSpeciesMap[i][j] = this.rules.singleplayer(tempCurrentMap, i, j)
      }
    }
    return new Map(nextGenForSpeciesMap, speciesId)
  }

  createMapShell() {
    return Array.from(Array(this.height), () => Array(this.width).fill(0))
  }
}

export default GameOfLife
