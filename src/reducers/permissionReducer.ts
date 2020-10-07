import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/PermissionTypes';

type InitialState = {
    list: Array<string | number>;
    loading: boolean;
}

const initialState: InitialState = {
    list: [],
    loading: false
};

const permissionReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                list: action.payload,
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

export default permissionReducer;