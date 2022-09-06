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
      newCell.className = `cell ${cellData ? `alive-${cellData}` : 'dead'}`
      newCell.onclick = () => {
        this.onClick(i, j)
        this.removeGameOverUI()
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
      cell.className = `cell ${cellData ? `alive-${cellData}` : 'dead'}`
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

  onClick(i, j) {
    const speciesId = document.getElementById('species').value

    const newValue = this.gameControl.mapData[i][j] == speciesId ? 0 : speciesId
    this.gameControl.mapData[i][j] = newValue
    document.getElementById(`${i}-${j}`).className = `cell ${this.gameControl.mapData[i][j] ? `alive-${newValue}` : 'dead'}`
  }

  onGameOver(winningSpeciesId) {
    this.winningSpeciesId = winningSpeciesId
    this.addGameOverUI()
  }

  renderGenerationCount() {
    const generationCount = document.getElementById('generation-count')
    generationCount.innerHTML = this.gameControl.generationCount
  }

  onNext() {
    this.gameControl.nextGeneration()
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
    this.removeGameOverUI()
    this.updateMap()
    this.renderGenerationCount()
  }

  removeGameOverUI() {
    document.getElementById('game-over').classList.remove(`alive-${this.winningSpeciesId}`)
    document.getElementById('btn-start').classList.remove("disabled")
    document.getElementById('btn-stop').classList.remove("disabled")
    document.getElementById('btn-next').classList.remove("disabled")
  }

  addGameOverUI() {
    document.getElementById('game-over').classList.add(`alive-${this.winningSpeciesId}`)
    document.getElementById('btn-start').classList.add("disabled")
    document.getElementById('btn-stop').classList.add("disabled")
    document.getElementById('btn-next').classList.add("disabled")
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
    this.removeGameOverUI()
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