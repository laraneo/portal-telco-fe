import { ACTIONS } from '../actions/secondModalActions';

type Initial = {
  status: boolean;
  element: any;
  isLoader: boolean;
  customSize: string;
  title: String;
}


const initialState: Initial = {
  status: false,
  element: null,
  isLoader: false,
  customSize: '',
  title: '',
};

const secondModalReducer = (state = initialState, action: any) => {
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

export default secondModalReducer;