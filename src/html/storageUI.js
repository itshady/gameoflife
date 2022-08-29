import MapStorage from './mapStorage.js'

class StorageUI {
  constructor() {
    this.mapStorage = new MapStorage()
  }
  
  savePattern() {
    // documentation on localStorage: https://javascript.plainenglish.io/3-ways-to-store-data-in-the-browser-db11c412104b
    let name = document.getElementById('name').value
    if(!this.mapStorage.valid(name)) {
      name = (`${name}-${Math.floor(Math.random()*10000000)}`) 
    }
    this.mapStorage.save(name, this.gameControl.mapData)
    this.appendPattern(name)
  }

  loadPattern() {
    const fetchName = document.getElementById('load-pattern').value
    const map = this.mapStorage.load(fetchName)
    if (map) this.handleReset(map)
  }

  clearPattern() {
    const select = document.getElementById('load-pattern')
    this.mapStorage.delete(select.value)
    select.options[select.selectedIndex].remove()
  }

  clearPatterns() {
    const select = document.getElementById('load-pattern')
    select.innerHTML = ''
    this.mapStorage.clear()
  }

  appendPattern(value) {
    const select = document.getElementById('load-pattern')
    const patternName = document.createElement('option')
    patternName.value = patternName.innerHTML = value
    select.append(patternName)
  }

  renderPatterns() {
    const patterns = this.mapStorage.getKeys()
    patterns.forEach((name, i) => this.appendPattern(name))
  }
}

export default StorageUI