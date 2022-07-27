import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '../../components/Grid.js'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { allDead, scenario1 } from '../fixtures/mapData'

it('renders the right amount of cells', async () => {
  const width = scenario1[0].length
  const height = scenario1.length
  
  render(
    <Grid 
      mapData={scenario1}
    />
  )
  
  const items = await screen.findAllByTestId('cell')
  expect(items).toHaveLength(width*height)
})

it('render without map data contains all dead cells', async () => {
  const width = scenario1[0].length
  const height = scenario1.length
  
  const {container} = render(
    <Grid 
      mapData={allDead}
    />
  )
  
  const items = container.getElementsByClassName('dead')
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