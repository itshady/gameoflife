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
    if (JSON.stringify(lastGen) == JSON.stringify(this.mapData) || 
    (JSON.stringify(twoGensAgo) == JSON.stringify(this.mapData) && JSON.stringify(threeGensAgo) == JSON.stringify(lastGen))) {

      const toFindDuplicates = (arr) => {
        return arr.filter((item, index) => arr.indexOf(item) !== index)
      }

      const arr = this.countLivingCells()
      const max = Math.max(...arr);
      const index = arr.indexOf(max);
      const maxDuplicate = Math.max(...toFindDuplicates(arr))
      if (maxDuplicate == max) return -1
      return index
    }
  }

  countLivingCells() {
    const arr = [0,0,0,0,0,0]
    this.currentGenMap.data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        arr[cellData] += cellData ? 1 : 0 
      })
    })
    return arr
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
        if(map2.isAlive(i, j) && map1.isDead(i, j)){ //no conflict
          nextMap[i][j] = map2.getCell(i, j)
        }
        else if(map1.isAlive(i, j) && map2.isDead(i, j)){ //no conflict
          nextMap[i][j] = map1.getCell(i, j)
        }
        else if(map2.isAlive(i, j) && map1.isAlive(i, j)){ //conflict
          const map1FriendlyCount = map1.countFriendlyNeighbours(i, j) 
          const map2FriendlyCount = map2.countFriendlyNeighbours(i, j) 
          if(map1FriendlyCount > map2FriendlyCount){ //1 wins
            nextMap[i][j] = map1.getCell(i, j)
          }
          else if(map1FriendlyCount < map2FriendlyCount){ //2 wins
            nextMap[i][j] = map2.getCell(i, j)
          }
          // else tied or both dead
        }
      }
    }
    return nextMap
  }

  nextGenForSpecies(speciesId) {
    const nextGenForSpeciesMap = this.createMapShell()
    const tempMap = new Map(JSON.parse(JSON.stringify(this.mapData)), speciesId)
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (tempMap.isFriendly(i, j) || tempMap.isDead(i, j)) {
          nextGenForSpeciesMap[i][j] = Rules.for(tempMap.id, tempMap.countFriendlyNeighbours(i, j), tempMap.getCell(i, j))
        }
      }
    }
    return new Map(nextGenForSpeciesMap, speciesId)
  }

  createMapShell() {
    return Array.from(Array(this.height), () => Array(this.width).fill(0))
  }
}

export default GameOfLife
