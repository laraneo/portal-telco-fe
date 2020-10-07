export const ACTIONS = {
    GET_ALL: 'role/get_all',
    GET: 'role/get',
    SET_LOADING: 'role/set_loading'
};
  
  interface Get {
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
  
  
  export type ActionTypes = Get | GetAll | SetLoading