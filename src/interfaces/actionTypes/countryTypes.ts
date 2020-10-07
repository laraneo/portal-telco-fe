export const ACTIONS = {
    GET_ALL: 'country/get_all',
    GET: 'country/get',
    SET_LOADING: 'country/set_loading'
};
  
  interface GetCountry {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAllCountries {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type CountryActionTypes = GetCountry | GetAllCountries | SetLoading