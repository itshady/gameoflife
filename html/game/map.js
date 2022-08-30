class Map {
  constructor(map, id) {
    this.data = map
    this.id = id
  }

  get data() {
    return this._data
  }

  set data(newMapData) {
    this._data = newMapData
  }
}

export default Map