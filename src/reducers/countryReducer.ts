import {  ACTIONS, CountryActionTypes } from '../interfaces/actionTypes/countryTypes';

type CountryInitialState = {
    countries: Array<string | number>;
    loading: boolean;
}

const initialState: CountryInitialState = {
    countries: [],
    loading: false
};

const countryReducer = (state = initialState, action: CountryActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                countries: action.payload,
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

export default countryReducer;