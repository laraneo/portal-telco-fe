export const ACTIONS = {
  GET_ALL: "share-movement/get_all",
  GET_LIST: "share-movement/get_list",
  GET_LAST_MOVEMENT: "share-movement/get_last_movement",
  GET: "share-movement/get",
  SET_LOADING: "share-movement/set_loading",
  SET_LAST_MOVEMENT_LOADING: "share-movement/set_last_movement",
  SET_PAGINATION: "share-movement/set_pagination"
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetLastMovement {
  type: typeof ACTIONS.GET_LAST_MOVEMENT;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetLastMovementLoading {
  type: typeof ACTIONS.SET_LAST_MOVEMENT_LOADING;
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
  | GetLastMovement
  | SetLastMovementLoading;
