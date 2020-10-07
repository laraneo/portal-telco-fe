export const ACTIONS = {
  GET_ALL: "access-control/get_all",
  GET: "access-control/get",
  GET_LIST: "access-control/get_list",
  GET_PARTNER_FAMILY_STATISTICS: "access-control/get_partner_family_statistics",
  GET_GUEST_STATISTICS: "access-control/get_guest_statistics",
  SET_LOADING: "access-control/set_loading",
  SET_REPORT_LOADING: "access-control/set_report_loading",
  SET_PARTNER_FAMILY_STATISTICS_LOADING:
    "access-control/set_partner_family_statistics_loading",
  SET_GUEST_STATISTICS_LOADING: "access-control/set_guest_statistics_loading",
  SET_PAGINATION: "access-control/set_pagination"
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetPartnerFamilyStatistics {
  type: typeof ACTIONS.GET_PARTNER_FAMILY_STATISTICS;
  payload: Array<string | number>;
}

interface GetGuestStatistics {
  type: typeof ACTIONS.GET_GUEST_STATISTICS;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetPartnerFamilyStatisticsLoading {
  type: typeof ACTIONS.SET_PARTNER_FAMILY_STATISTICS_LOADING;
  payload: boolean;
}

interface SetGuestStatisticsLoading {
  type: typeof ACTIONS.SET_GUEST_STATISTICS_LOADING;
  payload: boolean;
}

interface SetReportLoading {
  type: typeof ACTIONS.SET_REPORT_LOADING;
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
  | SetReportLoading
  | GetPartnerFamilyStatistics
  | SetPartnerFamilyStatisticsLoading
  | GetGuestStatistics
  | SetGuestStatisticsLoading;
