import { configureStore } from '@reduxjs/toolkit'
import globalSlice from '@slices/global'
import todoService from '@services/todos'
import pokemonService from '@services/pokemons'

export const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      [todoService.reducerPath]: todoService.reducer,
      [pokemonService.reducerPath]: pokemonService.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        todoService.middleware,
        pokemonService.middleware
      ),
    devTools: __DEV__ && __CLIENT__ && !__TEST__,
  })
}
