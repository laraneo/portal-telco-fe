export const ACTIONS = {
  GET_ALL: "product/get_all",
  GET: "product/get",
  SET_LOADING: "product/set_loading"
};

interface GetProduct {
  type: typeof ACTIONS.GET
  payload: Array<string|number>
}

interface GetAllProduct {
  type: typeof ACTIONS.GET_ALL
  payload: Array<string|number>
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING
  payload: Array<string|number>
}


export type ActionTypes = GetProduct | GetAllProduct | SetLoadng