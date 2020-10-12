import { ACTIONS, ActionTypes } from "../actions/processActions";

type InitStates = {
  listData: Array<string | number>;
};

const initialState: InitStates = {
  listData: [],
};

const processReducer = (state = initialState, action: ActionTypes) => {
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

export default processReducer;
