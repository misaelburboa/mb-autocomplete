import { combineReducers } from "redux";
import issuesReducer from "./issues-reducer";

const reducers = combineReducers({
  issues: issuesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
