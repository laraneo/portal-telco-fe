export const ACTIONS = {
  GET_ALL: "menu-item/get_all",
  GET: "menu-item/get",
  GET_LIST: "menu-item/get_list",
  GET_PARENTS: "menu-item/get_parents",
  SET_LOADING: "menu-item/set_loading",
  SET_PARENTS_LOADING: "menu-item/set_parents_loading",
  SET_PAGINATION: "menu-item/set_pagination",
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetpParents {
  type: typeof ACTIONS.GET_PARENTS;
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

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetParentsLoading {
  type: typeof ACTIONS.SET_PARENTS_LOADING;
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
  | GetpParents
  | SetParentsLoading;
