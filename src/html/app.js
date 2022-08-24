/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import GameControl from '../game/GameControl.js'

class HtmlApp {
  constructor() {
    this.gameControl = this.initializeGameControl()
  }

  onLoad() {
    this.renderMap()
  }

  renderMap() {
    const table = document.getElementById('grid').getElementsByTagName('tbody')[0]
    table.innerHTML = ''

    const loadCell = (newRow, cellData, i, j) => {
      const newCell = newRow.insertCell(j)
      newCell.id = `${i}-${j}`
      newCell.className = `cell ${cellData ? 'alive' : 'dead'}`
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

  updateGenerationCount() {
    const generationCount = document.getElementById('generation-count')
    generationCount.innerHTML = this.gameControl.generationCount
  }

  onNext() {
    this.gameControl.gameLoop()
    this.renderMap()
    this.updateGenerationCount()
  }

  onStart() {
    this.gameControl.gameLoop()
    this.renderMap()
    this.updateGenerationCount()
  }

  onStop() {
    this.gameControl.gameLoop()
    this.renderMap()
    this.updateGenerationCount()
  }

  onGameStateChange() {
    console.log('onGameStateChange')
  }

  onGameLoop() {
    console.log('onGameLoop')
  }

  initializeGameControl() {
    const gameInit = new GameControl(11, 11, this.onGameStateChange, this.onGameStateChange, this.onGameLoop)
    this.setInitialGameMap(gameInit)
    return gameInit
  }

  setInitialGameMap(gameInit) {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    gameInit.mapData[3][3] = gameInit.mapData[2][3] = gameInit.mapData[3][2] = gameInit.mapData[2][1] = gameInit.mapData[1][3] = gameInit.mapData[0][0] = 1
  }
}

window.app = new HtmlApp()
