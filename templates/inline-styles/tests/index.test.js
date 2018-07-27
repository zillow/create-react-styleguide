import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Button from '../src/'

describe('Button', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a primary button', () => {
      render(<Button>Click Me!</Button>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })

  it('displays a primary button with outline', () => {
      render(<Button outline>Click Me!</Button>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })

  it('displays a secondary button', () => {
      render(<Button type="secondary">⊙_ʘ</Button>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })

  it('displays a secondary button with outline', () => {
      render(<Button type="secondary" outline>⊙_ʘ</Button>, node, () => {
      expect(node).toMatchSnapshot()
    })
  })
})
