import { configureStore } from '@reduxjs/toolkit'
import globalSlice from '@slices/global'
import todoService from '@services/todos'

export const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      [todoService.reducerPath]: todoService.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([todoService.middleware]),
    devTools: __DEV__ && __CLIENT__,
  })
}
