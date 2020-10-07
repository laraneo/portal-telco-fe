import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/relationTypeTypes';

type InitialState = {
    list: Array<string | number>;
    loading: boolean;
    dataList: Array<string | number>;
}

const initialState: InitialState = {
    list: [],
    loading: false,
    dataList: [],
};

const relationTypeReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                list: action.payload,
            };
            case ACTIONS.GET_LIST:
                return {
                  ...state,
                  dataList: action.payload,
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

export default relationTypeReducer;