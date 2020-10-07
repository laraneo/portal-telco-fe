import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/bankTypes";

type BanksInitialState = {
  banks: Array<string | number>;
  loading: boolean;
  pagination: any;
  listData: any;
};

const initialState: BanksInitialState = {
  banks: [],
  loading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  listData: []
};

const bankReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        banks: action.payload
      };
    case ACTIONS.GET_LIST:
      return {
        ...state,
        listData: action.payload
      };
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload
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

export default bankReducer;
