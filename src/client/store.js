import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '@slices'

export default configureStore({
  reducer,
  preloadedState: window.__PRELOADED_STATE__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: __DEV__,
})
