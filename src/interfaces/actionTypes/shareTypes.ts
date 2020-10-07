export const ACTIONS = {
  GET_ALL: "share/get_all",
  GET_SHARE_TO_ASSIGN: "share/get_share_to_assign",
  GET: "share/get",
  SET_LOADING: "share/set_loading",
  SET_REPORT_LOADING: "share/set_report_loading",
  SET_SHARE_TO_ASSIGN_LOADING: "share/set_search_to_assign_loading",
  SET_PAGINATION: "share/set_pagination",
  SET_SELECTED_SHARE: "share/set_selected_share",
  GET_SHARES_BY_PARTNER: "share/get_shares_by_partner",
  RESET: "share/reset",
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetShareToAssign {
  type: typeof ACTIONS.GET_SHARE_TO_ASSIGN;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetReportLoading {
  type: typeof ACTIONS.SET_REPORT_LOADING;
  payload: boolean;
}

interface SetShareToAssignLoading {
  type: typeof ACTIONS.SET_SHARE_TO_ASSIGN_LOADING;
  payload: boolean;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION;
  payload: Array<string | number>;
}

interface SetSelectedShare {
  type: typeof ACTIONS.SET_SELECTED_SHARE;
  payload: Array<string | number>;
}

interface Reset {
  type: typeof ACTIONS.RESET;
  payload: Array<string | number>;
}

interface GetSharesByPartner {
  type: typeof ACTIONS.GET_SHARES_BY_PARTNER;
  payload: Array<string | number>;
}

export type ActionTypes =
  | Get
  | GetShareToAssign
  | GetAll
  | SetLoading
  | SetPagination
  | SetSelectedShare
  | SetShareToAssignLoading
  | Reset
  | GetSharesByPartner
  | SetReportLoading;
