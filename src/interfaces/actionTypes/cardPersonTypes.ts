export const ACTIONS = {
  GET_ALL: "card-person/get_all",
  GET: "card-person/get",
  GET_CARD_STATISTICS: "card-person/get_card_statistics",
  SET_LOADING: "card-person/set_loading",
  SET_CARD_STATISTICS_LOADING: "card-person/set_card__statistics_loading",
  SET_PAGINATION: "card-person/set_pagination"
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetCardStatistics {
  type: typeof ACTIONS.GET_CARD_STATISTICS;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetCardStatisticLoading {
  type: typeof ACTIONS.SET_CARD_STATISTICS_LOADING;
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
  | GetCardStatistics
  | SetCardStatisticLoading;
