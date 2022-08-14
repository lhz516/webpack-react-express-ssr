import React from 'react'
import userEvent from '@testing-library/user-event'
import Home from './home'
import { createMockedApi, renderWithProvider } from '@utils/test-utils'
import { act } from 'react-dom/test-utils'

describe('Home', () => {
  it('should increase foo when clicking button', async () => {
    const { container } = renderWithProvider(<Home />, {
      state: {
        global: { foo: 0 },
        todos: createMockedApi('todos', {
          'getAllTodos(undefined)': {
            data: [{ id: 1, text: 'sample todo' }],
            fulfilledTimeStamp: new Date().getTime(),
          },
        }),
      },
    })

    expect(container.querySelector('.home__ssr')).toHaveTextContent(
      'Dynamic SSR example: sample todo'
    )

    await act(() => userEvent.click(container.querySelector('.home__add-foo')))
    expect(container.querySelector('.home__foo')).toHaveTextContent('1')
    await act(() => userEvent.click(container.querySelector('.home__add-foo')))
    expect(container.querySelector('.home__foo')).toHaveTextContent('2')
  })
})
