import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/shareTypes";

type BanksInitialState = {
  list: Array<string | number>;
  sharesByPartner: Array<string | number>;
  shareToAssignList: Array<string | number>;
  shareToAssignLoading: boolean;
  loading: boolean;
  reportLoading: boolean;
  pagination: any;
  selectedShare: any;
};

const initialState: BanksInitialState = {
  list: [],
  shareToAssignList: [],
  loading: false,
  reportLoading: false,
  shareToAssignLoading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  selectedShare: {},
  sharesByPartner: []
};

const shareReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        list: action.payload
      };
    case ACTIONS.GET_SHARES_BY_PARTNER:
      return {
        ...state,
        sharesByPartner: action.payload
      };
    case ACTIONS.GET_SHARE_TO_ASSIGN:
      return {
        ...state,
        shareToAssignList: action.payload
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
      case ACTIONS.SET_REPORT_LOADING:
        return {
          ...state,
          reportLoading: action.payload
        };
    case ACTIONS.SET_SHARE_TO_ASSIGN_LOADING:
      return {
        ...state,
        shareToAssignLoading: action.payload
      };
    case ACTIONS.SET_SELECTED_SHARE:
      return {
        ...state,
        selectedShare: action.payload
      };

    case ACTIONS.RESET:
      return {
        ...state,
        shareToAssignList: initialState.shareToAssignList,
        selectedShare: initialState.selectedShare,
        sharesByPartner: initialState.sharesByPartner,
        list: initialState.list
      };
    default:
      return state;
  }
};

export default shareReducer;
