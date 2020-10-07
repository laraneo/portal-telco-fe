import Category from "../api/Category";
import snackBarUpdate from '../actions/snackBarActions';
import { updateModal } from '../actions/modalActions';
import { ACTIONS } from '../interfaces/actionTypes/categoryTypes';

  export const getAll = () => async (dispatch: Function) => {
    try {
        const {
            data,
            status
        } = await Category.getAll();
        let getAllCategories = [];
        if (status === 200) {
            getAllCategories = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllCategories
            });
        }
        return getAllCategories;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                status: true,
                type: 'error',
            },
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
      const response = await Category.create(body);
      const { status } = response
      let createCategoryResponse: any = [];
      if (status === 200 || status === 201) {
          createCategoryResponse = response;
          snackBarUpdate({
              payload: {
                  message: 'Category ha sido Registrado!',
                  type: 'success',
                  status: true,
              },
          })(dispatch);
          dispatch(getAll())
          dispatch(updateModal({
              payload: {
                  status: false,
                  element: null
              }
          }))
          dispatch({
              type: ACTIONS.SET_LOADING,
              payload: false
          });
      }
      return createCategoryResponse;
  } catch (error) {
      snackBarUpdate({
          payload: {
              message: error.message,
              type: 'error',
              status: true,
          },
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
      const {
          data,
          status
      } = await Category.get(id);
      let categoryResponse: any = [];
      if (status === 200) {
          categoryResponse = data;
      }
      return categoryResponse;
  } catch (error) {
      snackBarUpdate({
          payload: {
              message: error.message,
              type: 'error',
              status: true,
          },
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
      const {
          data,
          status
      } = await Category.update(body);
      let categoryResponse: any = [];
      if (status === 200) {
          categoryResponse = {
              data,
              status
          };
          snackBarUpdate({
              payload: {
                  message: 'Category ha sido Actualizado!',
                  type: 'success',
                  status: true,
              },
          })(dispatch);
          dispatch(getAll())
          dispatch({
              type: ACTIONS.SET_LOADING,
              payload: false
          });
      }
      return categoryResponse;
  } catch (error) {
      snackBarUpdate({
          payload: {
              message: error.message,
              type: 'error',
              status: true,
          },
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
      const {
          data,
          status
      } = await Category.remove(id);
      let categoryResponse: any = [];
      if (status === 200) {
          categoryResponse = {
              data,
              status
          };
          snackBarUpdate({
              payload: {
                  message: 'Category ha sido Elmiminado!',
                  type: 'success',
                  status: true,
              },
          })(dispatch);
          dispatch(getAll())
      }
      return categoryResponse;
  } catch (error) {
      snackBarUpdate({
          payload: {
              message: error.message,
              type: 'error',
              status: true,
          },
      })(dispatch);
      return error;
  }
};