import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import issuesReducer from "./reducers/issues-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  issuesReducer,
  {
    loading: false,
    networkReqCount: 0
  },
  composeEnhancers(applyMiddleware(thunk))
);
