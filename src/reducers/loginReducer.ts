import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/loginTypes';
import SecureStorage from "../config/SecureStorage";

type LoginInitialState = {
  user: any;
  userRoles: Array<string | number>
  status: boolean;
  loading: boolean;
}

const initialState: LoginInitialState = {
  user: {},
  userRoles: [],
  status: false,
  loading: false
};

const userReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: true
      };
      case ACTIONS.SET_ROLES:
        return {
          ...state,
          userRoles: action.payload,
        };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
