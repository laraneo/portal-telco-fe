import { ACTIONS } from '../actions/snackBarActions';

type LoginInitialState = {
  status: boolean;
  message: string;
  type: string;
}

const initialState: LoginInitialState = {
  status: false,
  message: '',
  type: '',
};

const snackBarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.STATUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default snackBarReducer;