class Map {
  constructor(map, id) {
    this.data = map
    this._id = id
    this.width = map[0].length
    this.height = map.length
  }

  get data() {
    return this._data
  }

  set data(newMapData) {
    this._data = newMapData
  }

  get id() {
    return this._id
  }

  isDead(x, y) {
    return this.data[x][y] == 0
  }

  isFriendly(x, y) {
    return this.data[x][y] == this.id
  }

  countFriendlyNeighbours(x, y) {
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
        const hasFriendlyNeighbour = this.isFriendly(x + delta.x, y + delta.y) ? 1 : 0
        return sum + hasFriendlyNeighbour
      } else { 
        return sum
      }
    }, 0)
  }
}

export default Map