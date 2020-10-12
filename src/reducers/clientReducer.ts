import { ACTIONS, ActionTypes } from "../actions/clientActions";

type InitStates = {
  listData: Array<string | number>;
};

const initialState: InitStates = {
  listData: [],
};

const clientReducer = (state = initialState, action: ActionTypes) => {
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

export default clientReducer;
