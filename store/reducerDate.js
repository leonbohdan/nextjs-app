const initialState = {
  counter: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'reducerDate/setCounter':
      return {
        ...state,
        counter: action.payload
      }
    
    default:
      return state
  }
}