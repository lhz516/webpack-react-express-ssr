import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '@reducers/index.js'

/**
 * Render function for testing
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
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(element, { wrapper: Wrapper, ...renderOptions })
}

export default render
