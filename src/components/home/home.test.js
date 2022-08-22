import React from 'react'
import userEvent from '@testing-library/user-event'
import Home from './home'
import { createMockedApi, renderWithProvider } from '@utils/test-utils'
import { act } from 'react-dom/test-utils'
import { screen } from '@testing-library/react'

describe('Home', () => {
  const renderComponent = () => {
    return renderWithProvider(<Home />, {
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
  }
  it('should display initial SSR state and following CSR', async () => {
    renderComponent()

    expect(screen.getByTestId('home__ssr')).toHaveTextContent(
      'Dynamic SSR fetch example: sample todo'
    )

    expect(screen.getByTestId('home__csr')).toHaveTextContent(
      'Client side fetch example: Loading...'
    )

    expect(await screen.findByText(/total count is 3/i)).toBeVisible()
  })

  it('should increase foo when clicking the button', async () => {
    renderComponent()

    expect(screen.getByTestId('home__foo')).toHaveTextContent('0')

    await act(
      async () => await userEvent.click(screen.getByTestId('home__add-foo'))
    )
    expect(screen.getByTestId('home__foo')).toHaveTextContent('1')

    await act(
      async () => await userEvent.click(screen.getByTestId('home__add-foo'))
    )
    expect(screen.getByTestId('home__foo')).toHaveTextContent('2')
  })
})
