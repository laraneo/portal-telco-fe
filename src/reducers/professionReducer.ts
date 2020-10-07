import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/professionTypes';

type InitialState = {
    professions: Array<string | number>;
    loading: boolean;
}

const initialState: InitialState = {
    professions: [],
    loading: false
};

const professionReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                professions: action.payload,
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

export default professionReducer;