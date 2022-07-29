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
