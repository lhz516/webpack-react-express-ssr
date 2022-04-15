import React from 'react'
import userEvent from '@testing-library/user-event'
import Home from './home'
import render from '@utils/test-utils'
import { act } from 'react-dom/test-utils'

describe('Home', () => {
  it('should increase foo when clicking button', () => {
    const { container } = render(<Home />, {
      state: { global: { foo: 0 } },
    })

    act(() => userEvent.click(container.querySelector('.home__add-foo')))
    expect(container.querySelector('.home__foo')).toHaveTextContent('1')
    act(() => userEvent.click(container.querySelector('.home__add-foo')))
    expect(container.querySelector('.home__foo')).toHaveTextContent('2')
  })
})
