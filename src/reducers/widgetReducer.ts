import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/widgetTypes';

type InitState = {
    list: Array<string | number>;
    loading: boolean;
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
};

const widgetReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                list: action.payload,
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
        default:
            return state;
    }
};

export default widgetReducer;