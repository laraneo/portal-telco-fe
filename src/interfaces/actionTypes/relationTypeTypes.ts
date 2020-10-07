export const ACTIONS = {
    GET_ALL: 'relation_type/get_all',
    GET: 'relation_type/get',
    GET_LIST: 'relation_type/get_list',
    SET_LOADING: 'relation_type/set_loading'
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }

  interface GetList {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | GetList;