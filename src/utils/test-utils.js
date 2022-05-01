import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '@reducers/index.js'
import { HelmetProvider } from 'react-helmet-async'

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
    store = createStore(
      reducers,
      state,
      compose(applyMiddleware(thunk.withExtraArgument()))
    ),
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
