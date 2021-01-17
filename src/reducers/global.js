export default function global(state = {}, action) {
  switch (action.type) {
    case 'ADD_FOO':
      return { ...state, foo: state.foo + 1 }
    default:
      return state
  }
}
