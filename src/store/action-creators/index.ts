import { ActionTypes } from "../action-types";

export const setLoading = (loading: boolean) => {
  return {
    type: ActionTypes.SET_LOADING,
    payload: loading,
  };
};

export const setNetworkRequestCount = (loading: boolean) => {
  return {
    type: ActionTypes.SET_NETWORK_REQ_COUNT,
    payload: loading,
  };
};
