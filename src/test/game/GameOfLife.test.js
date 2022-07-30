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

// it('gives a live cell with no surrounding live cells, expect dead cell', () => {
//   const expectedWidth = 5
//   const expectedHeight = 5
//   const game = new GameOfLife(expectedWidth, expectedHeight)
//   const map = game.mapData
//   map[2][2] = 1
//   expect(game.mapData[2][2]).toEqual(1)
//   //game.nextGeneration()
//   console.debug(game.nextGeneration())
//   const actualValue = game.mapData[2][2]
//   expect(actualValue).toEqual(0)
// })

it('a live cell with no surrounding live cells should have 0 neighbours', () => {
  const game = new GameOfLife(5, 5)
  const map = game.mapData
  map[2][2] = 1
  expect(game.mapData[2][2]).toEqual(1)

  expect(game.countNeighbours(2, 2)).toEqual(0)
})

it('given the top left corner is the only live cell, should have 0 neighbours', () => {
  const game = new GameOfLife(5, 5)
  const map = game.mapData
  map[0][0] = 1
  expect(game.mapData[0][0]).toEqual(1)

  expect(game.countNeighbours(0, 0)).toEqual(0)
})
