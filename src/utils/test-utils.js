import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { createStore } from './redux'

export function createMockedApi(reducerPath, queries) {
  return {
    queries,
    config: {
      reducerPath,
    },
  }
}

/**
 * Render function that renders an element inside Redux Provider
 *
 * @param {ReactElement} element
 * @param {Object} options
 */
export function renderWithProvider(
  element,
  { state = {}, store = createStore(state), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <HelmetProvider>
        <Provider store={store}>{children}</Provider>
      </HelmetProvider>
    )
  }
  return rtlRender(element, { wrapper: Wrapper, ...renderOptions })
}
