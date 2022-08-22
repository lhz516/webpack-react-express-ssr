import React from 'react'
import userEvent from '@testing-library/user-event'
import Home from './home'
import { createMockedApi, renderWithProvider } from '@utils/test-utils'
import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  rest.get('http://localhost:3000/api/pokemons', (req, res, ctx) => {
    return res(ctx.json({ text: 'sample returned text, total count is 3' }))
  }),
  rest.get('http://localhost:3000/api/todos', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, text: 'sample todo' }]), ctx.delay(10))
  }),
]

const server = setupServer(...handlers)

describe('Home', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen())

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers())

  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

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

    await userEvent.click(screen.getByTestId('home__add-foo'))
    expect(screen.getByTestId('home__foo')).toHaveTextContent('1')

    await userEvent.click(screen.getByTestId('home__add-foo'))
    expect(screen.getByTestId('home__foo')).toHaveTextContent('2')
  })
})
