import Rules from './rules/Rules.js'
import Map from './map.js'

class GameOfLife {
  constructor(map, speciesCount) {
    this.width = map[0].length
    this.height = map.length
    this.speciesCount = speciesCount
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

      const arr = this.countLivingCells()
      const max = Math.max(...arr);
      const maxIndex = arr.indexOf(max);
      const maxDuplicate = Math.max(...this.findDuplicates(arr))
      if (maxDuplicate == max) return -1
      return maxIndex
    }
  }

  countLivingCells() {
    const arr = new Array(this.speciesCount).fill(0)
    this.currentGenMap.data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        arr[cellData] += cellData ? 1 : 0 
      })
    })
    return arr
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
    // const neighbourCountArray = new Array(maps.length).fill(0)
    // const cellArray = new Array(maps.length).fill(0)
    // bottom way to initialize is better/fastest way apparently
    let cellArray
    (cellArray = []).length = maps.length; cellArray.fill(0);
    let neighbourCountArray
    (neighbourCountArray = []).length = maps.length; neighbourCountArray.fill(0);

    const nextMap = this.createMapShell()
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        maps.forEach((map, index) => {
          neighbourCountArray[index] = map.countFriendlyNeighbours(i, j)
          cellArray[index] = map.getCell(i, j)
        })
        
        // if all dead - no action
        const maxNeighbours = Math.max(...neighbourCountArray)
        const maxIndex = neighbourCountArray.indexOf(maxNeighbours)
        const duplicates = this.findDuplicates(neighbourCountArray)
        
        const numOfSpeciesOccupyCell = cellArray.reduce((sum, value) => {
          return sum + (value ? 1 : 0) 
        }, 0)

        //if 1 alive - he wins
        if (numOfSpeciesOccupyCell == 1) nextMap[i][j] = Math.max(...cellArray)
        else if (numOfSpeciesOccupyCell > 1) {
          // if only one has max friendlies - he wins
          if (duplicates.length == 0) nextMap[i][j] = cellArray[maxIndex]
          // else tied game
        }
      }
    }
    return nextMap
  }

  findDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index)
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
