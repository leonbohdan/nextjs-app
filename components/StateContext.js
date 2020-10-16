import React, { useReducer } from "react";

const initialState = {
  coordinates: {
    lat: null,
    lng: null,
  },
  address: '',
  startDate: '',
  endDate: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'coordinates':
      return {
        ...state,
        coordinates: action.payload,
      };
    
    case 'address':
      return {
        ...state,
        address: action.payload,
      };
    
    case 'startDate':
      return {
        ...state,
        startDate: [...state.startDate, action.payload],
      };
    
    case 'endDate':
      return {
        ...state,
        endDate: [...state.endDate, action.payload],
      };
  
    default:
      return state;
  }
};

export const DispatchContext = React.createContext(() => {});
export const StateContext = React.createContext(initialState);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};
