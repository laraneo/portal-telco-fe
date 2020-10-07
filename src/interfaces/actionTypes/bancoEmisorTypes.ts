export const ACTIONS = {
    GET_ALL: 'banco-emisor/get_all',
    GET: 'banco-emisor/get',
    GET_LIST: 'banco-emisor/get_list',
    SET_LOADING: 'banco-emisor/set_loading',
    SET_PAGINATION: 'banco-emisor/set_pagination',
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }

  interface GetList {
    type: typeof ACTIONS.GET_LIST
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }

  interface SetPagination {
    type: typeof ACTIONS.SET_PAGINATION
    payload: Array<string|number>
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList