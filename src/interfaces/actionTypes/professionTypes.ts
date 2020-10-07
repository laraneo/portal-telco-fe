export const ACTIONS = {
    GET_ALL: 'profession/get_all',
    GET: 'profession/get',
    SET_LOADING: 'profession/set_loading'
};
  
  interface GetProfession {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAllProfessions {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetProfession | GetAllProfessions | SetLoading