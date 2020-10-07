import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/menuItemTypes";

type InitState = {
  list: Array<string | number>;
  parents: Array<string | number>;
  loading: boolean;
  setParentsLoading: boolean;
  pagination: any;
  listData: any;
};

const initialState: InitState = {
  list: [],
  loading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0,
  },
  listData: [],
  parents: [],
  setParentsLoading: false,
};

const menuItemReducer = (state = initialState, action: ActionTypes) => {
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
    case ACTIONS.GET_PARENTS:
      return {
        ...state,
        parents: action.payload,
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
    case ACTIONS.SET_PARENTS_LOADING:
      return {
        ...state,
        setParentsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default menuItemReducer;
