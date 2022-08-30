import Rules from './rules/Rules.js'

class GameOfLife {
  constructor(map) {
    this.width = map[0].length
    this.height = map.length
    this.history = []
    this.mapData = map
  }

  get mapData() {
    return this._mapData
  }

  set mapData(newMapData) {
    this._mapData = newMapData
  }

  get isGameOver() {
    const lastGen = this.history[this.history.length - 1]
    return JSON.stringify(lastGen) == JSON.stringify(this.mapData)
  }

  nextGeneration() {
    this.history.push(this.mapData)
    const species1Map = this.nextGenForSpecies(1)
    const species2Map = this.nextGenForSpecies(2)

    //resolve conflicts
    // this.mapData = species2Map
    this.mapData = this.mergeMaps(species1Map, species2Map)
  }

  mergeMaps(map1, map2) {
    const nextMap = this.createMapShell()
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if(map2[i][j] != 0 && map1[i][j] == 0){ //no conflict
          nextMap[i][j] = map2[i][j]
        }
        else if(map1[i][j] != 0 && map2[i][j] == 0){ //no conflict
          nextMap[i][j] = map1[i][j]
        }
        else if(map2[i][j] != 0 && map1[i][j] != 0){ //conflict
          const map1FriendlyCount = this.countFriendlyNeighbours(1, i, j) 
          const map2FriendlyCount = this.countFriendlyNeighbours(1, i, j) 
          
          if(map1FriendlyCount > map2FriendlyCount){ //1 wins
            nextMap[i][j] = map1[i][j]
          }
          else if(map1FriendlyCount < map2FriendlyCount){ //2 wins
            nextMap[i][j] = map2[i][j]
          }
          // else tied or both dead
        }
      }
    }
    return nextMap
  }

  nextGenForSpecies(speciesId) {
    const tempMap = this.createMapShell()
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (this.isFriendly(speciesId, i, j) || this.isDead(i, j)) {
          const before = this.mapData[i][j]
          tempMap[i][j] = Rules.for(speciesId, this.countFriendlyNeighbours(speciesId, i, j), this.mapData[i][j])
        }
      }
    }
    return tempMap
  }

  createMapShell() {
    return Array.from(Array(this.height), () => Array(this.width).fill(0))
  }

  isDead(x, y) {
    return this.mapData[x][y] == 0
  }

  isFriendly(speciesId, x, y) {
    return this.mapData[x][y] == speciesId
  }

  countFriendlyNeighbours(speciesId, x, y) {
    const deltas = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 }, { x: 1, y: 0 },
      { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ]

    const inRange = (rowIndex, colIndex) => rowIndex >= 0 && colIndex >= 0
      && rowIndex < this.height && colIndex < this.width

    return deltas.reduce((sum, delta) => {
      const rowIndex = x + delta.x
      const colIndex = y + delta.y

      if (inRange(rowIndex, colIndex)) {
        const hasFriendlyNeighbour = this.isFriendly(speciesId, x + delta.x, y + delta.y) ? 1 : 0
        return sum + hasFriendlyNeighbour
      } else { 
        return sum
      }
    }, 0)
  }
}

export default GameOfLife
