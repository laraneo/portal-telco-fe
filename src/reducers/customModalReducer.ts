import { ACTIONS } from '../actions/customModalActions';

type ModalInitialState = {
  status: boolean;
  element: any;
  isLoader: boolean;
  customSize: string;
  title: String;
}


const initialState: ModalInitialState = {
  status: false,
  element: null,
  isLoader: false,
  customSize: 'md',
  title: '',
};

const customModalReducer = (state = initialState, action: any) => {
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

export default customModalReducer;