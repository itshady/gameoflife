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
  }

  initializeGameControl() {
    const map = this.setInitialGameMap()
    const gameInit = new GameControl(map, ()=>{}, ()=>{}, this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameOver.bind(this.gameUI))
    return gameInit
  }

  setInitialGameMap() {
    const map = Array.from(Array(30), _ => Array(80).fill(0))
    map[3][3] = map[2][3] = map[3][2] = map[2][1] = map[1][3] = 1
    return map
  }
}

window.app = new HtmlApp()
