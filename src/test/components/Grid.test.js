import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '../../components/Grid.js'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

it('renders the right amount of cells', async () => {
  const width = 20
  const height = 10
  
  render(
    <Grid 
      width={width}
      height={height}
    />
  )
  
  const items = await screen.findAllByTestId('cell')
  expect(items).toHaveLength(width*height)
})