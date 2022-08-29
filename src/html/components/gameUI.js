const MINSPEED = 2000

class GameUI {
  constructor(gameControl) {
    this.gameControl = gameControl
    this.intervalTime = 1000
  }

  initMap() {
    this.saveStartMap(this.gameControl.mapData)
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
    this.gameControl.isActive ? this.handleReset(this.gameControl.history[0]) : this.handleReset(this.startMap)
  }

  handleReset(newMap) {
    this.saveStartMap(newMap)
    this.gameControl.stop()
    this.gameControl.reset(newMap)
    this.updateMap()
    this.renderGenerationCount()
  }

  saveStartMap(newMap) {
    this.startMap = JSON.parse(JSON.stringify(newMap))
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

  onGameLoop() {
    this.updateMap()
    this.renderGenerationCount()
  }

  emptyGameMap() {
    return Array.from(Array(30), _ => Array(80).fill(0))
  }
}

export default GameUI