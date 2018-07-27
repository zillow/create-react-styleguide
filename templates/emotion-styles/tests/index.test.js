import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Button from '../src/'
import ThemeWrapper from '../src/styleguidist/components/ThemeWrapper'

describe('Themed Button', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a button with requested text', () => {
      render(<ThemeWrapper><Button>Click Me!</Button></ThemeWrapper>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })

  it('displays a secondary button with requested text', () => {
      render(<ThemeWrapper><Button type="secondary">⊙_ʘ</Button></ThemeWrapper>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })
})
