export const ACTIONS = {
    GET_ALL: 'status-person/get_all',
    GET: 'status-person/get',
    SET_LOADING: 'status-person/set_loading'
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