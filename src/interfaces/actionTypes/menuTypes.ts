export const ACTIONS = {
  GET_ALL: "menu/get_all",
  GET: "menu/get",
  GET_LIST: "menu/get_list",
  GET_MENU_LIST: "menu/get_menu_list",
  GET_WIDGET_LIST: "menu/get_widget_list",
  SET_LOADING: "menu/set_loading",
  SET_WIDGET_LOADING: "menu/set_widget_loading",
  SET_PAGINATION: "menu/set_pagination",
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetMenuList {
  type: typeof ACTIONS.GET_MENU_LIST;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface GetWidgetList {
  type: typeof ACTIONS.GET_WIDGET_LIST;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetWidgetLoading {
  type: typeof ACTIONS.SET_WIDGET_LOADING;
  payload: boolean;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION;
  payload: Array<string | number>;
}

export type ActionTypes =
  | Get
  | GetAll
  | SetLoading
  | SetPagination
  | GetList
  | GetWidgetList
  | SetWidgetLoading
  | GetMenuList;
