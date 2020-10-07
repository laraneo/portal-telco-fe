import Product from "../api/Product";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";
import { ACTIONS } from '../interfaces/actionTypes/productTypes';

export const getAll = () => async (dispatch: Function) => {
  try {
    const { data, status } = await Product.getAll();
    let getAllProducts = [];
    if (status === 200) {
      getAllProducts = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: getAllProducts
      });
    }
    return getAllProducts;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    return error;
  }
};

export const create = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const response = await Product.create(body);
    const { status } = response;
    let createProductResponse: any = [];
    if (status === 200 || status === 201) {
      createProductResponse = response;
      snackBarUpdate({
        payload: {
          message: "Product ha sido Registrado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
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
    return createProductResponse;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
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
  try {
    const { data, status } = await Product.get(id);
    let productResponse = [];
    if (status === 200) {
      productResponse = data;
    }
    return productResponse;
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

export const update = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data, status } = await Product.update(body);
    let productResponse: any = [];
    if (status === 200) {
      productResponse = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Product ha sido Actualizado!",
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
      dispatch(getAll());
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return productResponse;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
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

export const remove = (id: number) => async (dispatch: Function) => {
  try {
    const { data, status } = await Product.remove(id);
    let productResponse: any = [];
    if (status === 200) {
      productResponse = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Product ha sido Elmiminado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
    }
    return productResponse;
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
