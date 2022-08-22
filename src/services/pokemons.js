import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const pokemons = createApi({
  reducerPath: 'pokemons',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/pokemons',
  }),
  endpoints: (builder) => ({
    getPokemonsByCount: builder.query({
      query: ({ count }) => ({
        url: `?count=${count}`,
      }),
    }),
  }),
})

export default pokemons
export const { useGetPokemonsByCountQuery } = pokemons
