import GameControl from '../game/GameControl.js'

class HtmlApp {
  constructor() {
    this.gameControl = this.initializeGameControl()
    this.intervalTime = 1000
  }

  onLoad() {
    this.initMap()
    this.renderLexicon()
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
    this.gameControl.stop()
    this.gameControl.isActive ? this.gameControl.reset(this.gameControl.history[0]) : this.gameControl.reset(this.setInitialGameMap())
    this.updateMap()
    this.renderGenerationCount()
  }

  onClear() {
    this.gameControl.stop()
    this.gameControl.reset(this.emptyGameMap())
    this.updateMap()
    this.renderGenerationCount()
  }

  onSpeedChange() {
    const newSpeed = document.getElementById('speed').value
    this.intervalTime = newSpeed
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
    const map = Array.from(Array(30), _ => Array(50).fill(0))
    map[3][3] = map[2][3] = map[3][2] = map[2][1] = map[1][3] = 1
    return map
  }

  emptyGameMap() {
    const map = Array.from(Array(30), _ => Array(50).fill(0))
    return map
  }

  renderLexicon() {
    const data = this.lexiconMetaData()
    const body = document.getElementById('lexicon')
  
    data.forEach((data, i) => {
      const card = document.createElement('div')
      card.classList.add('card', 'lexicon-item', 'd-flex', 'flex-column', 'card-body')
      card.onclick = () => {
        const myModalEl = document.getElementById('lexicon-modal')
        const modal = bootstrap.Modal.getInstance(myModalEl) 
        this.gameControl.reset(data.map)
        this.updateMap()
        this.renderGenerationCount()
        modal.hide()
      }
      const title = document.createElement('p')
      title.classList.add('h3')
      title.innerHTML = data.title
      const desc = document.createElement('p')
      desc.innerHTML = data.desc
      const image = document.createElement('img')
      image.width = '128'
      image.height = '128'
      image.classList.add('align-self-center')
      image.src = data.src
      body.append(card)
      card.append(title)
      card.append(desc)
      card.append(image)
    })
  }

  lexiconMetaData() {
    return [
      {
        title: "1-2-3-4",
        desc: "Description goes here",
        src: "../assets/lexicon/1-2-3-4.png",
        map: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ],
      },
    ]
  }
}

window.app = new HtmlApp()
