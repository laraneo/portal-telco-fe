export const ACTIONS = {
    SET_USER: 'login/set_user',
    SET_ROLES: 'login/set_roles',
    LOGOUT: 'login/logout',
    SET_LOADING: 'login/set_loading',
};
  
  interface SetUser {
    type: typeof ACTIONS.SET_USER
    payload: Array<string|number>
  }

  interface SetRoles {
    type: typeof ACTIONS.SET_ROLES
    payload: Array<string|number>
  }
  
  interface Logout {
    type: typeof ACTIONS.LOGOUT
    payload: any
  }
  
  interface SetLoadng {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = SetUser | Logout | SetLoadng | SetRoles;