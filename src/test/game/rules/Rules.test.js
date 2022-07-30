import '@testing-library/jest-dom/extend-expect'
import GameOfLife from '../../../game/GameOfLife.js'

it('gives a live cell with no surrounding live cells, expect dead cell', () => {
  const startRow = 2
  const startCol = 2
  const game = new GameOfLife(5, 5)
  const map = game.mapData
  map[startRow][startCol] = 1
  game.nextGeneration()

  const actualValue = game.mapData[startRow][startCol]
  expect(actualValue).toEqual(0)
})

it('Any live cell with one live neighbours dies', () => {
  const startRow = 1
  const startCol = 1
  const game = new GameOfLife(3, 3)
  const map = game.mapData
  map[startRow][startCol] = 1
  map[1][0] = 1
  game.nextGeneration()

  const actualValue = game.mapData[startRow][startRow]
  expect(actualValue).toEqual(0)
})

it('Any live cell with 2 live neighbours lives', () => {
  const startRow = 1
  const startCol = 1
  const game = new GameOfLife(3, 3)
  const map = game.mapData
  map[startRow][startCol] = 1
  map[startRow][startCol - 1] = 1
  map[startRow - 1][startCol] = 1
  game.nextGeneration()

  const actualValue = game.mapData[startRow][startCol]
  expect(actualValue).toEqual(1)
})

it('Any live cell with 3 live neighbours lives', () => {
  const startRow = 1
  const startCol = 1
  const game = new GameOfLife(3, 3)
  const map = game.mapData
  map[startRow][startCol] = 1
  map[startRow][startCol - 1] = 1
  map[startRow - 1][startCol] = 1
  map[startRow - 1][startCol - 1] = 1
  game.nextGeneration()

  const actualValue = game.mapData[startRow][startCol]
  expect(actualValue).toEqual(1)
})

it('Any live cell with more than 3 live neighbours dies', () => {
  const startRow = 1
  const startCol = 1
  const game = new GameOfLife(3, 3)
  const map = game.mapData
  map[startRow][startCol] = 1
  map[startRow][startCol - 1] = 1
  map[startRow - 1][startCol] = 1
  map[startRow - 1][startCol - 1] = 1
  map[startRow - 1][startCol + 1] = 1
  game.nextGeneration()

  const actualValue = game.mapData[startRow][startCol]
  expect(actualValue).toEqual(0)
})
