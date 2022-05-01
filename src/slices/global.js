import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    foo: 0,
  },
  reducers: {
    increment(state) {
      return {
        ...state,
        foo: state.foo + 1,
      }
    },
  },
})

export const { increment } = globalSlice.actions
export default globalSlice
