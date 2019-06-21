import { combineReducers, applyMiddleware, createStore } from 'redux'
import middleware from 'redux-thunk'

import combinedReducer from './reducers.js'

/*
 *  Export a function that takes the props and returns a Redux store
 *  This is used so that 2 components can have the same store.
 */
export default (props, railsContext) => {
  // spread railsContext to get its props into the store hydration data?
  const newProps = { ...props, ...railsContext };
  return applyMiddleware(middleware)(createStore)(combinedReducer, newProps);
};
