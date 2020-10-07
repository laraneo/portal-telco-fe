import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/parameterTypes";

type InitState = {
  list: Array<string | number>;
  loading: boolean;
  pagination: any;
  listData: any;
  dbParameter: string;
  dbHost: string;
  api: string;
  paypalClientId: string;
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
  dbParameter: "",
  dbHost: "",
  api: "",
  paypalClientId: "",
};

const parameterReducer = (state = initialState, action: ActionTypes) => {
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
    case ACTIONS.GET_DB_PARAMETER:
      return {
        ...state,
        dbParameter: action.payload,
      };
    case ACTIONS.GET_PAYPAL_CLIENT_ID:
      return {
        ...state,
        paypalClientId: action.payload,
      };
    case ACTIONS.GET_DB_HOST:
      return {
        ...state,
        dbHost: action.payload,
      };
    case ACTIONS.GET_API:
      return {
        ...state,
        api: action.payload,
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

export default parameterReducer;
