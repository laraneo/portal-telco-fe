import {
  ACTIONS,
  ActionTypes,
} from "../interfaces/actionTypes/webServiceTypes";

type InitState = {
  list: Array<string | number>;
  loading: boolean;
  setStatusAccountLoading: boolean;
  pagination: any;
  listData: any;
  statusAccountList: Array<string | number>;
  unpaidInvoices: Array<string | number>;
  clientBalance: Array<string | number>;
  reportedPayments: any;
  setUnpaidInvoicestLoading: boolean;
  setReportedPaymentsLoading: boolean;
  setBalanceLoading: boolean;
  cache: boolean;
  tasa: object;
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
  statusAccountList: [],
  setStatusAccountLoading: false,
  unpaidInvoices: [],
  reportedPayments: [],
  setUnpaidInvoicestLoading: false,
  setReportedPaymentsLoading: false,
  setBalanceLoading: false,
  clientBalance: [],
  cache: false,
  tasa: {},
};

const webServiceReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        list: action.payload,
      };
    case ACTIONS.SET_TASA:
      return {
        ...state,
        tasa: action.payload,
      };
    case ACTIONS.SET_CACHE:
      return {
        ...state,
        cache: action.payload,
      };
    case ACTIONS.GET_BALANCE:
      return {
        ...state,
        clientBalance: action.payload,
      };
    case ACTIONS.GET_UNPAID_INVOICES:
      return {
        ...state,
        unpaidInvoices: action.payload,
      };
    case ACTIONS.GET_REPORTED_PAYMENTS:
      return {
        ...state,
        reportedPayments: action.payload,
      };
    case ACTIONS.GET_STATUS_ACCOUNT:
      return {
        ...state,
        statusAccountList: action.payload,
      };
    case ACTIONS.GET_LIST:
      return {
        ...state,
        listData: action.payload,
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
    case ACTIONS.SET_STATUS_ACCOUNT_LOADING:
      return {
        ...state,
        setStatusAccountLoading: action.payload,
      };
    case ACTIONS.SET_UNPAID_INVOICES_LOADING:
      return {
        ...state,
        setUnpaidInvoicestLoading: action.payload,
      };
    case ACTIONS.SET_REPORTED_PAYMENTS_LOADING:
      return {
        ...state,
        setReportedPaymentsLoading: action.payload,
      };
    case ACTIONS.SET_BALANCE_LOADING:
      return {
        ...state,
        setBalanceLoading: action.payload,
      };
    case ACTIONS.CLEAR_LIST:
      return {
        ...state,
        listData: initialState.listData,
      };
    default:
      return state;
  }
};

export default webServiceReducer;
