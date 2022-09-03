const MINSPEED = 2000

class GameUI {
  constructor(gameControl) {
    this.gameControl = gameControl
    this.intervalTime = 1000
    this.startWidth = 100
    this.startHeight = 100
  }

  handleKeyDown(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      // up arrow
      if (this.startHeight > 0) this.startHeight -= 1
    }
    else if (e.keyCode == '40') {
      // down arrow
      if (this.startHeight < this.gameHeight - this.height) this.startHeight += 1
    }
    else if (e.keyCode == '37') {
      // left arrow
      if (this.startWidth > 0) this.startWidth -= 1
      
    }
    else if (e.keyCode == '39') {
      // right arrow
      if (this.startWidth < this.gameWidth - this.width) this.startWidth += 1
    }
    e.preventDefault()
    this.initMap()
  }

  initMap() {
    this.saveStartMap(this.gameControl.mapData)
    const table = document.getElementById('grid').getElementsByTagName('tbody')[0]
    table.innerHTML = ''

    this.width = Math.min(Math.floor(window.innerWidth / 13) - 4, this.gameWidth)
    this.height = Math.min(Math.floor(window.innerHeight / 13) - 20, this.gameHeight)
    let x = 0
    for (let i=this.startHeight; i < this.height + this.startHeight; i+=1) {
      const newRow = table.insertRow(x)
      x += 1
      newRow.id = i
      let y = 0
      for (let j=this.startWidth; j < this.width + this.startWidth; j+=1) {
        const newCell = newRow.insertCell(y)
        y += 1
        newCell.id = `${i}-${j}`
        newCell.className = `cell ${this.gameControl.mapData[i][j] ? `alive-${this.gameControl.mapData[i][j]}` : 'dead'}`
        newCell.onclick = (e) => {
          let speciesId = e.shiftKey ? 2 : 1

          const newValue = this.gameControl.mapData[i][j] ? 0 : speciesId
          this.gameControl.mapData[i][j] = newValue
          newCell.className = `cell ${this.gameControl.mapData[i][j] ? `alive-${newValue}` : 'dead'}`
        }
      }  
    }
  }

  updateMap() {
    const updateCell = (cellData, i, j) => {
      const cell = document.getElementById(`${i}-${j}`)
      cell.className = `cell ${cellData ? `alive-${cellData}` : 'dead'}`
    }

    for (let i=this.startHeight; i < this.height + this.startHeight; i+=1) {
      for (let j=this.startWidth; j < this.width + this.startWidth; j+=1) {
        updateCell(this.gameControl.mapData[i][j], i, j)
      }  
    }
  }

  onGameOver() {
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
    document.getElementById('game-over').classList.remove("game-over")
    document.getElementById('btn-start').classList.remove("disabled")
    document.getElementById('btn-stop').classList.remove("disabled")
    document.getElementById('btn-next').classList.remove("disabled")
  }

  addGameOverUI() {
    document.getElementById('game-over').classList.add("game-over")
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