import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/categoryTypes';

type CategoryInitialState = {
    categories: Array<string | number>;
    loading: boolean;
}

const initialState: CategoryInitialState = {
    categories: [],
    loading: false
};

const categoryReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                categories: action.payload,
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

export default categoryReducer;