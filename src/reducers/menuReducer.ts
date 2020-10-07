import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/menuTypes";

type InitState = {
  list: Array<string | number>;
  loading: boolean;
  pagination: any;
  listData: any;
  widgetList: Array<string | number>;
  setWidgetLoading: boolean;
  menuList: Array<string | number>;
};

const initialState: InitState = {
  list: [],
  loading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  listData: [],
  widgetList: [],
  setWidgetLoading: false,
  menuList: []
};

const menuReducer = (state = initialState, action: ActionTypes) => {
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
      case ACTIONS.GET_MENU_LIST:
        return {
          ...state,
          menuList: action.payload
        };
    case ACTIONS.GET_WIDGET_LIST:
      return {
        ...state,
        widgetList: action.payload
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
    case ACTIONS.SET_WIDGET_LOADING:
      return {
        ...state,
        setWidgetLoading: action.payload
      };
    default:
      return state;
  }
};

export default menuReducer;
