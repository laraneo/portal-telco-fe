export const ACTIONS = {
    GET_ALL: 'sport/get_all',
    GET: 'sport/get',
    SET_LOADING: 'sport/set_loading'
};
  
  interface GetSport {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAllSports {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetSport | GetAllSports | SetLoading