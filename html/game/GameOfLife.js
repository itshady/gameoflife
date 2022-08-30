import Rules from './rules/Rules.js'
import Map from './map.js'

class GameOfLife {
  constructor(map) {
    this.width = map[0].length
    this.height = map.length
    this.history = []
    this.currentGenMap = new Map(map, 0)
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
    return JSON.stringify(lastGen) == JSON.stringify(this.mapData) || 
    (JSON.stringify(twoGensAgo) == JSON.stringify(this.mapData) && JSON.stringify(threeGensAgo) == JSON.stringify(lastGen))
  }

  nextGeneration() {
    this.history.push(this.mapData)
    const species1Map = this.nextGenForSpecies(1)
    const species2Map = this.nextGenForSpecies(2)
    const mapDataFixed = this.mergeMaps(species1Map, species2Map)
    //const mapDataArray = this.mergeMapsDynamic([species1Map, species2Map])

    //assertMapsMatch(this.mapDataFixed)

    this.mapData = mapDataFixed
  }

  mergeMapsDynamic(maps) {
    const nextMap = this.createMapShell()
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        //if all dead - no action
        
        //if 1 alive - he wins

        //if > 1 alive{
          //if only one has max friendlies - he wins
          //if > 1 has max friendlies - tie, dead cell

        //}
      }
    }
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
          const map1FriendlyCount = this.countFriendlyNeighbours(1, i, j, map1) 
          const map2FriendlyCount = this.countFriendlyNeighbours(2, i, j, map2) 
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
        if (this.isFriendly(speciesId, i, j, this.mapData) || this.isDead(i, j, this.mapData)) {
          const before = this.mapData[i][j]
          tempMap[i][j] = Rules.for(speciesId, this.countFriendlyNeighbours(speciesId, i, j, this.mapData), this.mapData[i][j])
        }
      }
    }
    return tempMap
  }

  createMapShell() {
    return Array.from(Array(this.height), () => Array(this.width).fill(0))
  }

  isDead(x, y, map) {
    return map[x][y] == 0
  }

  isFriendly(speciesId, x, y, map) {
    return map[x][y] == speciesId
  }

  countFriendlyNeighbours(speciesId, x, y, map) {
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
        const hasFriendlyNeighbour = this.isFriendly(speciesId, x + delta.x, y + delta.y, map) ? 1 : 0
        return sum + hasFriendlyNeighbour
      } else { 
        return sum
      }
    }, 0)
  }
}

export default GameOfLife
