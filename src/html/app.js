import GameControl from '../game/GameControl.js'
import StorageUI from './storageUI.js'
import LexiconUI from './lexiconUI.js'

const MINSPEED = 2000

class HtmlApp {
  constructor() {
    this.gameControl = this.initializeGameControl()
    this.intervalTime = 1000
    this.storageUI = new StorageUI(this.gameControl)
    this.storageUI.onPatternLoad = (map) => {
      this.handleReset(map)
    }
    this.lexiconUI = new LexiconUI()
    this.lexiconUI.onSelect = (map) => {
      this.handleReset(map)
    }
  }

  onLoad() {
    this.initMap()
    this.lexiconUI.renderLexicon()
    this.storageUI.renderPatterns()
  }

  initMap() {
    const table = document.getElementById('grid').getElementsByTagName('tbody')[0]
    table.innerHTML = ''

    const loadCell = (newRow, cellData, i, j) => {
      const newCell = newRow.insertCell(j)
      newCell.id = `${i}-${j}`
      newCell.className = `cell ${cellData ? 'alive' : 'dead'}`
      newCell.onclick = () => {
        this.gameControl.mapData[i][j] = this.gameControl.mapData[i][j] ? 0 : 1
        newCell.className = `cell ${this.gameControl.mapData[i][j] ? 'alive' : 'dead'}`
      }
    }

    const loadRow = (rowData, i) => {
      const newRow = table.insertRow(i)
      newRow.id = i
      rowData.forEach((cellData, j) => {
        loadCell(newRow, cellData, i, j)
      })
    }

    this.gameControl.mapData.forEach((rowData, i) => {
      loadRow(rowData, i)
    })
  }

  updateMap() {
    const updateCell = (cellData, i, j) => {
      const cell = document.getElementById(`${i}-${j}`)
      cell.className = `cell ${cellData ? 'alive' : 'dead'}`
    }

    const updateRow = (rowData, i) => {
      rowData.forEach((cellData, j) => {
        updateCell(cellData, i, j)
      })
    }

    this.gameControl.mapData.forEach((rowData, i) => {
      updateRow(rowData, i)
    })
  }

  renderGenerationCount() {
    const generationCount = document.getElementById('generation-count')
    generationCount.innerHTML = this.gameControl.generationCount
  }

  onNext() {
    this.gameControl.nextGeneration()
    this.updateMap()
    this.renderGenerationCount()
  }

  onStart() {
    this.onStop()
    this.gameControl.start(this.intervalTime)
  }

  onStop() {
    this.gameControl.stop()
  }

  onReset() {
    this.gameControl.isActive ? this.handleReset(this.gameControl.history[0]) : this.handleReset(this.setInitialGameMap())
  }

  handleReset(newMap) {
    this.gameControl.stop()
    this.gameControl.reset(newMap)
    this.updateMap()
    this.renderGenerationCount()
  }

  onClear() {
    this.handleReset(this.emptyGameMap())
  }

  onSpeedChange() {
    const newSpeed = document.getElementById('speed').value
    this.intervalTime = MINSPEED - newSpeed
    if (this.gameControl.isActive) this.onStart()
  }

  onBack() {
    this.gameControl.backGeneration()
  }

  onGameStateChange() {}

  onGameLoop() {
    this.updateMap()
    this.renderGenerationCount()
  }

  initializeGameControl() {
    const map = this.setInitialGameMap()
    const gameInit = new GameControl(map, this.onGameStateChange.bind(this), this.onGameStateChange.bind(this), this.onGameLoop.bind(this), this.onGameLoop.bind(this))
    return gameInit
  }

  setInitialGameMap() {
    const map = Array.from(Array(30), _ => Array(80).fill(0))
    map[3][3] = map[2][3] = map[3][2] = map[2][1] = map[1][3] = 1
    return map
  }

  emptyGameMap() {
    const map = Array.from(Array(30), _ => Array(80).fill(0))
    return map
  }
}

window.app = new HtmlApp()
