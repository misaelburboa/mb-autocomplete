import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

export const loadIssues = () => {
  return async (dispatch: Dispatch<Action>) => {
    // TODO: uncomment this, when you consume the backend api
    // try {
    //   const {
    //     data,
    //   } = await CategoriesApiProvider.getInstance().getCategories();

    dispatch({
      type: ActionTypes.LOAD_ISSUES,
      payload: [],
    });
    // } catch (err) {
    //   console.log(err);
    //   dispatch({
    //     type: ActionTypes.SET_LOADING,
    //     payload: false,
    //   });
    // }
  };
};

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
