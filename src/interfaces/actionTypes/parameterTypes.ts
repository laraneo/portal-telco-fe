export const ACTIONS = {
  GET_ALL: "parameter/get_all",
  GET: "parameter/get",
  GET_DB_PARAMETER: "parameter/get_db_parameter",
  GET_DB_HOST: "parameter/get_db_host",
  GET_API: "parameter/get_api",
  GET_PAYPAL_CLIENT_ID: "parameter/get_paypal_client_id",
  GET_LIST: "parameter/get_list",
  SET_LOADING: "parameter/set_loading",
  SET_PAGINATION: "parameter/set_pagination",
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetApi {
  type: typeof ACTIONS.GET_API;
  payload: Array<string | number>;
}

interface GetPaypalClientId {
  type: typeof ACTIONS.GET_PAYPAL_CLIENT_ID;
  payload: Array<string | number>;
}

interface GetDbParameter {
  type: typeof ACTIONS.GET_DB_PARAMETER;
  payload: Array<string | number>;
}

interface GetDbHost {
  type: typeof ACTIONS.GET_DB_HOST;
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
  | GetDbParameter
  | GetDbHost
  | GetApi
  | GetPaypalClientId;