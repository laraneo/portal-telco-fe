import {
  ACTIONS,
  ActionTypes
} from "../interfaces/actionTypes/shareMovementTypes";

type BanksInitialState = {
  list: Array<string | number>;
  lastMovement: Array<string | number>;
  loading: boolean;
  lastMovementloading: boolean;
  pagination: any;
  listData: Array<string | number>;
};

const initialState: BanksInitialState = {
  list: [],
  loading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  listData: [],
  lastMovement: [],
  lastMovementloading: false
};

const transactionTypeReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        list: action.payload
      };
    case ACTIONS.GET_LIST:
      return {
        ...state,
        listData: action.payload
      };
    case ACTIONS.GET_LAST_MOVEMENT:
      return {
        ...state,
        lastMovement: action.payload
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
    case ACTIONS.SET_LAST_MOVEMENT_LOADING:
      return {
        ...state,
        lastMovementloading: action.payload
      };
    default:
      return state;
  }
};

export default transactionTypeReducer;
