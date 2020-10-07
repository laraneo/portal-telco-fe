export const ACTIONS = {
    GET_ALL: 'menu-item-icon/get_all',
    GET: 'menu-item-icon/get',
    GET_LIST: 'menu-item-icon/get_list',
    SET_LOADING: 'menu-item-icon/set_loading',
    SET_PAGINATION: 'menu-item-icon/set_pagination',
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