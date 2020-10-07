import { ACTIONS, ActionTypes } from '../interfaces/actionTypes/productTypes';

type ProductInitialState = {
    products: Array<string | number>;
    loading: boolean;
}

const initialState: ProductInitialState = {
    products: [],
    loading: false
};

const productReducer = (state = initialState, action: ActionTypes)  => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                products: action.payload,
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

export default productReducer;