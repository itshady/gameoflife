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

it('gives a live cell with no surrounding live cells, expect dead cell', () => {
  const expectedWidth = 5
  const expectedHeight = 5
  const game = new GameOfLife(expectedWidth, expectedHeight)
  const map = game.mapData
  map[3][3] = 1
  expect(map[3][3]).toEqual(1)
  game.NextGeneration()

  const actualValue = game.map[3][3]
  expect(actualValue).toEqual(0)
})
