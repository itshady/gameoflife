import GameControl from './game/GameControl.js'
import StorageUI from './components/storageUI.js'
import LexiconUI from './components/lexiconUI.js'
import GameUI from './components/gameUI.js'

class HtmlApp {
  constructor() {
    this.gameUI = new GameUI()
    this.gameControl = this.initializeGameControl()
    this.gameUI.gameControl = this.gameControl
    this.storageUI = new StorageUI(this.gameControl)
    this.storageUI.onPatternLoad = (map) => {
      this.gameUI.handleReset(map)
    }
    this.lexiconUI = new LexiconUI()
    this.lexiconUI.onSelect = (map) => {
      this.gameUI.handleReset(map)
    }
  }

  onLoad() {
    this.gameUI.initMap()
    this.lexiconUI.renderLexicon()
    this.storageUI.renderPatterns()
    window.onresize = () => this.gameUI.initMap()
  }

  initializeGameControl() {
    const map = this.setInitialGameMap()
    const gameInit = new GameControl(map, ()=>{}, ()=>{}, this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameOver.bind(this.gameUI))
    return gameInit
  }

  setInitialGameMap() {
    const map = Array.from(Array(200), _ => Array(200).fill(0))
    const shiftY = 10
    const shiftX = 30
    map[3+shiftY][3+shiftX] = map[2+shiftY][3+shiftX] = map[3+shiftY][2+shiftX] = map[2+shiftY][1+shiftX] = map[1+shiftY][3+shiftX] = 1
    map[10+shiftY][10+shiftX] = map[11+shiftY][11+shiftX] = map[8+shiftY][11+shiftX] = map[9+shiftY][8+shiftX] = map[8+shiftY][10+shiftX] = map[9+shiftY][10+shiftX] = 2

    map[20+shiftY][20+shiftX] = map[21+shiftY][21+shiftX] = map[20+shiftY][21+shiftX] = map[21+shiftY][20+shiftX] = 2
    return map
  }
}

window.app = new HtmlApp()
