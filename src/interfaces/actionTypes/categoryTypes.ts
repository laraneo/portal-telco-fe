export const ACTIONS = {
    GET_ALL: 'category/get_all',
    GET: 'category/get',
    SET_LOADING: 'category/set_loading'
};
  
  interface GetCategory {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAllCategories {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoadng {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetCategory | GetAllCategories | SetLoadng