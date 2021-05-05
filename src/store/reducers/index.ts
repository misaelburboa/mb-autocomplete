import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action, ReactIssue } from "../actions";

export interface ReduxState {
  issues: ReactIssue[];
  loading: boolean;
  networkReqCount: number;
}

const initialState: ReduxState = {
  issues: [],
  loading: false,
  networkReqCount: 0,
};

const reducer = (state: ReduxState = initialState, action: Action) => {
  return produce(state, (draft: ReduxState) => {
    switch (action.type) {
      case ActionTypes.LOAD_ISSUES:
        draft.issues = action.payload;
        return draft;
      case ActionTypes.SET_LOADING:
        draft.loading = action.payload;
        return draft;
      case ActionTypes.SET_NETWORK_REQ_COUNT:
        draft.networkReqCount = action.payload;
        return draft;
      default:
        break;
    }
  });
};

export default reducer;
