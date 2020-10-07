import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/recordTypes';

type InitState = {
    list: Array<string | number>;
    recordsByPerson: Array<string | number>;
    recordStatistics: Array<string | number>;
    loading: boolean;
    recordStatisticsLoading: boolean;
    pagination: any;
    listData: any;
}

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
    recordsByPerson: [],
    recordStatistics: [],
    recordStatisticsLoading: false,
};

const recordReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                list: action.payload,
            };
            case ACTIONS.GET_RECORD_STATISTICS:
                return {
                    ...state,
                    recordStatistics: action.payload,
                };
            case ACTIONS.GET_RECORDS_BY_PERSON:
                return {
                    ...state,
                    recordsByPerson: action.payload,
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
            case ACTIONS.SET_RECORD_STATISTICS_LOADING:
                return {
                    ...state,
                    recordStatisticsLoading: action.payload,
                };    
        default:
            return state;
    }
};

export default recordReducer;