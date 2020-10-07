export const ACTIONS = {
  GET_ALL: "locker/get_all",
  GET: "locker/get",
  GET_LIST: "locker/get_list",
  SET_LOADING: "locker/set_loading",
  SET_PAGINATION: "locker/set_pagination",
  CLEAR_LIST: "locker/clear_list"
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface ClearList {
  type: typeof ACTIONS.CLEAR_LIST;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION;
  payload: Array<string | number>;
}

export type ActionTypes =
  | Get
  | GetAll
  | SetLoading
  | SetPagination
  | GetList
  | ClearList;
