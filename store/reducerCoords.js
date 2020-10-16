const initialState = {
  justAList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'reducerCoords/addToList':
      return {
        ...state,
        justAList: [ ...state.justAList, action.payload ]
      }
    
    default:
      return state
  }
}