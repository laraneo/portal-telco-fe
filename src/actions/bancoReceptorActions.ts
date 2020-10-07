import API from "../api/BancoReceptor";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";
import { ACTIONS } from '../interfaces/actionTypes/bancoReceptor';

const attempts = window.attempts;

export const getList = (count: number = 0) => async (dispatch: Function) => {
  dispatch(updateModal({
    payload: {
      isLoader: true,
    }
  }));
  try {
    const { data: { data }, status } = await API.getList();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_LIST,
        payload: response
      });
      dispatch(updateModal({
        payload: {
          isLoader: false,
        }
      }));
    }
    return response;
  } catch (error) {
    if(count <= attempts) {
      let counter = count + 1;
      dispatch(getList(counter));
    } else {
      snackBarUpdate({
        payload: {
          message: error.message,
          status: true,
          type: "error",
        },
      })(dispatch);
    }
    dispatch(updateModal({
      payload: {
        isLoader: false,
      }
    }));
    return error;
  }
};
