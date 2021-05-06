import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

export interface LoadingState {
  loading: boolean;
  networkReqCount: number;
}

const initialState: LoadingState = {
  loading: false,
  networkReqCount: 0,
};

const reducer = (state: LoadingState = initialState, action: Action) => {
  return produce(state, (draft: LoadingState) => {
    switch (action.type) {
      case ActionTypes.SET_LOADING:
        draft.loading = action.payload;
        return draft;
      case ActionTypes.SET_NETWORK_REQ_COUNT:
        draft.networkReqCount = action.payload;
        return draft;
      default:
        return draft
    }
  });
};

export default reducer;
