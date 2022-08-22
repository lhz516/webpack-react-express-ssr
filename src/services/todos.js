import {
  buildCreateApi,
  coreModule,
  reactHooksModule,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

// This createApi is for supporting SSR
const createSsrApi = buildCreateApi(
  coreModule(),
  // Turn off sideEffectsInRender in test env and client env to avoid console warning
  reactHooksModule({ unstable__sideEffectsInRender: !__TEST__ && __SERVER__ })
)

const todos = createSsrApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/todos',
    fetchFn: global.fetch,
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
