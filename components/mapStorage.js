class MapStorage {
  load(name) {
    return JSON.parse(localStorage.getItem(name))
  }

  save(name, map) {
    localStorage.setItem(name, JSON.stringify(map))
  }

  delete(name) {
    localStorage.removeItem(name)
  }

  clear() {
    localStorage.clear()
  }

  getKeys() {
    const keys = []
    for (var i = 0; i < localStorage.length; i++){
      keys.push(localStorage.key(i))
    }
    return keys
  }
  
  valid(name) {
    return !localStorage.getItem(name) && name !== ''
  }
}


export default MapStorage