import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { reducer } from '@slices'
import { HelmetProvider } from 'react-helmet-async'
import { configureStore } from '@reduxjs/toolkit'

/**
 * Render function that renders an element inside Redux Provider
 *
 * @param {ReactElement} element
 * @param {Object} options
 */
function render(
  element,
  {
    state = {},
    store = configureStore({
      reducer,
      preloadedState: state,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    }),
    ...renderOptions
  } = {}
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

export default render
