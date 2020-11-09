import { ACTIONS, ActionTypes } from "../actions/processRequestActions";

type InitStates = {
  list: Array<string | number>;
  loading: boolean;
  pagination: any;
  listData: any;
  usersByManager: Array<string | number>;
};

const initialState: InitStates = {
  list: [],
  loading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0,
  },
  listData: [],
  usersByManager: [],
};

const processRequestReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        list: action.payload,
      };
    case ACTIONS.GET_LIST:
      return {
        ...state,
        listData: action.payload,
      };
      case ACTIONS.GET_USERS_BY_MANAGER:
        return {
          ...state,
          usersByManager: action.payload,
        };
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default processRequestReducer;
