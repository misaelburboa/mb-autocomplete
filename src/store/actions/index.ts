import { ActionTypes } from "../action-types";

interface ReactIssueLabel {
  name: string
}

export interface ReactIssue {
  url: string
  repository_url: string
  title: string
  labels: ReactIssueLabel[]
}

export interface LoadIssuesAction {
  type: ActionTypes.LOAD_ISSUES
  payload: ReactIssue[];
}

export interface SetLoadingAction {
  type: ActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetNetworkReqCountAction {
  type: ActionTypes.SET_NETWORK_REQ_COUNT;
  payload: number;
}

export type Action =
  | LoadIssuesAction
  | SetLoadingAction
  | SetNetworkReqCountAction;