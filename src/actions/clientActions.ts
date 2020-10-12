import API from "../api/Client";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";

export const ACTIONS = {
  GET_LIST: "client/get_list",
};

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

export type ActionTypes = GetList;

export const getList = () => async (dispatch: Function) => {
  dispatch(
    updateModal({
      payload: {
        isLoader: true,
      },
    })
  );
  try {
    const {
      data: { data },
      status,
    } = await API.getList();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_LIST,
        payload: response,
      });
      dispatch(
        updateModal({
          payload: {
            isLoader: false,
          },
        })
      );
    }
    return response;
  } catch (error) {
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
        },
      })
    );
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error",
      },
    })(dispatch);
    return error;
  }
};
