import { combineReducers, createStore } from "redux";
import reducerDate from './reducerDate';
import reducerCoords from './reducerCoords';

export default (preloadState, options) => {
  
  return createStore(
    combineReducers({
      reducerDate,
      reducerCoords,
    }),
    preloadState,
  );
}
