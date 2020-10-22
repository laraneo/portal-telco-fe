import { ACTIONS, ActionTypes } from "../actions/processCategoryActions";

type InitStates = {
  listData: Array<string | number>;
};

const initialState: InitStates = {
  listData: [],
};

const processCategoryReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_LIST:
      return {
        ...state,
        listData: action.payload,
      };
    default:
      return state;
  }
};

export default processCategoryReducer;
