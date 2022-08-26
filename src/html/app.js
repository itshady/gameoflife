/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import GameControl from '../game/GameControl.js'

class HtmlApp {
  constructor() {
    this.gameControl = this.initializeGameControl()
  }

  onLoad() {
    this.initMap()
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
    // const table = document.getElementById('grid').getElementsByTagName('tbody')[0]

    const updateCell = (cellData, i, j) => {
      const cell = document.getElementById(`${i}-${j}`)
      cell.className = `cell ${cellData ? 'alive' : 'dead'}`
    }

    const updateRow = (rowData, i) => {
      // const row = table.querySelector(`#${i}`)
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
    this.gameControl.start(50)
  }

  onStop() {
    this.gameControl.stop()
  }

  onReset() {
    this.gameControl.stop()
    this.gameControl.reset()
    this.setInitialGameMap(this.gameControl)
    this.updateMap()
  }

  onGameStateChange() {}

  onGameLoop() {
    this.updateMap()
    this.renderGenerationCount()
    console.log(this.gameControl.history)
  }

  initializeGameControl() {
    const gameInit = new GameControl(11, 11, this.onGameStateChange.bind(this), this.onGameStateChange.bind(this), this.onGameLoop.bind(this))
    this.setInitialGameMap(gameInit)
    return gameInit
  }

  setInitialGameMap(gameInit) {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    gameInit.mapData[3][3] = gameInit.mapData[2][3] = gameInit.mapData[3][2] = gameInit.mapData[2][1] = gameInit.mapData[1][3] = gameInit.mapData[0][0] = 1
  }
}

window.app = new HtmlApp()
