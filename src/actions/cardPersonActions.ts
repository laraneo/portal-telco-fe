import API from "../api/CardPerson";
import snackBarUpdate from "./snackBarActions";
import { updateModal } from "./secondModalActions";
import { ACTIONS } from '../interfaces/actionTypes/cardPersonTypes';
import { getSharesByPartner } from "./shareActions";

export const getAll = (id: number) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.getAll(id);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const create = (body: any) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const response = await API.create(body);
    const { status } = response;
    let createresponse: any = [];
    if (status === 200 || status === 201) {
      createresponse = response;
      snackBarUpdate({
        payload: {
          message: "Card Type ha sido Registrado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll(body.people_id));
      dispatch(getSharesByPartner(body.share));
      dispatch(
        updateModal({
          payload: {
            status: false,
            element: null
          }
        })
      );
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return createresponse;
  } catch (error) {
    let message = 'General Error';
    if (error && error.response) {
      const { data: { message: msg } } = error.response; 
      message = msg
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const get = (id: number) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.get(id);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const update = (body: any) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data, status } = await API.update(body);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Card Type ha sido Actualizado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(
        updateModal({
          payload: {
            status: false,
            element: null
          }
        })
      );
      dispatch(getAll(body.people_id));
      dispatch(getSharesByPartner(body.share));
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    let message = 'General Error';
    if (error && error.response) {
      const { data: { message: msg } } = error.response; 
      message = msg
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const remove = (id: number, personId: any, share: number, order: number) => async (dispatch: Function) => {
  try {
    const { data, status } = await API.remove(id, share, order);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Card Type ha sido Elmiminado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll(personId));
      dispatch(getSharesByPartner(share));
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const getCardStatistics = () => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_CARD_STATISTICS_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.getCardStatistics();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_CARD_STATISTICS,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_CARD_STATISTICS_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_CARD_STATISTICS_LOADING,
      payload: false
    });
    return error;
  }
};
