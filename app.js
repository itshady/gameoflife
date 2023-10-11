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
    const gameInit = new GameControl(map, document.getElementById('species').length, ()=>{}, ()=>{}, this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameLoop.bind(this.gameUI), this.gameUI.onGameOver.bind(this.gameUI))
    return gameInit
  }

  setInitialGameMap() {
    const map = Array.from(Array(30), _ => Array(80).fill(0))
    // map[3][3] = map[2][3] = map[3][2] = map[2][1] = map[1][3] = 1
    // map[3][3+7] = map[2][3+7] = map[3][2+7] = map[2][1+7] = map[1][3+7] = 2
    // map[3][3+7*2] = map[2][3+7*2] = map[3][2+7*2] = map[2][1+7*2] = map[1][3+7*2] = 3
    // map[3][3+7*3] = map[2][3+7*3] = map[3][2+7*3] = map[2][1+7*3] = map[1][3+7*3] = 4

    // map[20][20] = map[21][21] = map[20][21] = map[21][20] = 2

    // Define the coordinates and sizes for the blobs
    const blob1StartX = 18, blob1StartY = 5, blob1Width = 10, blob1Height = 10;
    const blob2StartX = 50, blob2StartY = 5, blob2Width = 10, blob2Height = 10;
    const blob3StartX = 35, blob3StartY = 18, blob3Width = 10, blob3Height = 10;
    const blob4StartX = 35, blob4StartY = 5, blob4Width = 10, blob4Height = 10;

    // Set values for the first blob (1)
    for (let i = blob1StartY; i < blob1StartY + blob1Height; i++) {
      for (let j = blob1StartX; j < blob1StartX + blob1Width; j++) {
        if (Math.random() < 0.5) map[i][j] = 1;
      }
    }

    // Set values for the second blob (2)
    for (let i = blob2StartY; i < blob2StartY + blob2Height; i++) {
      for (let j = blob2StartX; j < blob2StartX + blob2Width; j++) {
        if (Math.random() < 0.5) map[i][j] = 2;
      }
    }

    // Set values for the third blob (3)
    for (let i = blob3StartY; i < blob3StartY + blob3Height; i++) {
      for (let j = blob3StartX; j < blob3StartX + blob3Width; j++) {
        if (Math.random() < 0.5) map[i][j] = 3;
      }
    }

    // Set values for the fourth blob (4)
    for (let i = blob4StartY; i < blob4StartY + blob4Height; i++) {
      for (let j = blob4StartX; j < blob4StartX + blob4Width; j++) {
        if (Math.random() < 0.5) map[i][j] = 4;
      }
    }

    return map
  }
}

window.app = new HtmlApp()
