import {
  buildCreateApi,
  coreModule,
  reactHooksModule,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

const createApi = buildCreateApi(
  coreModule(),
  // Turn off sideEffectsInRender in test env to avoid console warning
  reactHooksModule({ unstable__sideEffectsInRender: !__TEST__ })
)

let fetch
if (__TEST__) {
  fetch = () => {}
} else if (__CLIENT__) {
  fetch = window.fetch
} else {
  fetch = await import('isomorphic-fetch').then((mod) => mod.default)
}

const todos = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/todos',
    fetchFn: fetch,
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => ({
        url: '/',
      }),
    }),
  }),
})

export default todos
export const { useGetAllTodosQuery } = todos
