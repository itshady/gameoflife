import '@testing-library/jest-dom/extend-expect'
import GameOfLife from '../../game/GameOfLife.js'

it('upon creation, initial state should match size and all dead', () => {
  const expectedWidth = 2
  const expectedHeight = 3
  const game = new GameOfLife(expectedWidth, expectedHeight)
  const map = game.mapData

  expect(map[0]).toHaveLength(expectedWidth)
  expect(map).toHaveLength(expectedHeight)

  const twoDsum = map.reduce((r, x) => r + x.reduce((s, y) => s + y, 0), 0)
  expect(twoDsum).toEqual(0)
})

it('a live cell with no surrounding live cells should have 0 neighbours', () => {
  const row = 2
  const col = 2
  const game = new GameOfLife(5, 5)
  const map = game.mapData
  map[row][col] = 1
  expect(game.mapData[row][col]).toEqual(1)

  expect(game.countNeighbours(row, col)).toEqual(0)
})

it('a middle cell with all surrounding live cells, should have 8 neighbours', () => {
  const game = new GameOfLife(3, 3)
  const map = game.mapData
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[0].length; j += 1) {
      map[i][j] = 1
    }
  }

  expect(game.countNeighbours(1, 1)).toEqual(8)
})

it('given the top left corner is the only live cell, should have 0 neighbours', () => {
  const row = 0
  const col = 0
  const game = new GameOfLife(5, 5)
  const map = game.mapData
  map[row][col] = 1
  expect(game.mapData[row][col]).toEqual(1)

  expect(game.countNeighbours(row, col)).toEqual(0)
})

it('given the bottom right corner is the only live cell, should have 0 neighbours', () => {
  const row = 3
  const col = 4
  const game = new GameOfLife(5, 4)
  const map = game.mapData
  map[row][col] = 1
  expect(game.mapData[row][col]).toEqual(1)

  expect(game.countNeighbours(row, col)).toEqual(0)
})

it('gives a live cell with no surrounding live cells, expect dead cell', () => {
  const expectedWidth = 5
  const expectedHeight = 5
  const game = new GameOfLife(expectedWidth, expectedHeight)
  const map = game.mapData
  map[2][2] = 1
  game.nextGeneration()

  const actualValue = game.mapData[2][2]
  expect(actualValue).toEqual(0)
})
