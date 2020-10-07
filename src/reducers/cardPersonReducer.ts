import {
  ACTIONS,
  ActionTypes
} from "../interfaces/actionTypes/cardPersonTypes";

type BanksInitialState = {
  list: Array<string | number>;
  cardStatistics: Array<string | number>;
  loading: boolean;
  cardStatisticsLoading: boolean;
  pagination: any;
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
  cardStatistics: [],
  cardStatisticsLoading: false
};

const cardPersonReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        list: action.payload
      };
    case ACTIONS.GET_CARD_STATISTICS:
      return {
        ...state,
        cardStatistics: action.payload
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
    case ACTIONS.SET_CARD_STATISTICS_LOADING:
      return {
        ...state,
        cardStatisticsLoading: action.payload
      };
    default:
      return state;
  }
};

export default cardPersonReducer;
