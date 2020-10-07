import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/sportTypes';

type InitialState = {
    sports: Array<string | number>;
    loading: boolean;
}

const initialState: InitialState = {
    sports: [],
    loading: false
};

const sportReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                sports: action.payload,
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

export default sportReducer;