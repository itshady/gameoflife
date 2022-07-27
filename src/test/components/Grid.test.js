import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '../../components/Grid.js'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { scenario1 } from '../fixtures/mapData'

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

it('renders 3 alive cells based on map data', async () => {
  const width = 20
  const height = 10
  
  const {container} = render(
    <Grid 
      width={width}
      height={height}
      mapData={scenario1}
    />
  )
  
  const items = container.getElementsByClassName('alive')
  expect(items).toHaveLength(3)
})