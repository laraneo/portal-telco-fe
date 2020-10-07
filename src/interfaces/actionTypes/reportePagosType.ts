export const ACTIONS = {
    GET_ALL: 'reporte-pagos/get_all',
    GET: 'reporte-pagos/get',
    GET_LIST: 'reporte-pagos/get_list',
    SET_LOADING: 'reporte-pagos/set_loading',
    SET_PAGINATION: 'reporte-pagos/set_pagination',
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