import API from "../api/Share";
import snackBarUpdate from "./snackBarActions";
import { updateModal } from "./modalActions";
import { ACTIONS } from '../interfaces/actionTypes/shareTypes';
import Axios from '../config/Axios';
import Prefix from '../config/ApiPrefix';
import headers from '../helpers/headers';

export const getAll = (page: number = 1, perPage: number = 8) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.getAll(page, perPage);
    let response = [];
    if (status === 200) {
      const pagination = {
        total: data.total,
        perPage: data.per_page,
        prevPageUrl: data.prev_page_url,
        currentPage: data.current_page,
        from: data.from,
        to: data.to,
      };
      response = data.data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagination
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

export const search = (term: string, perPage: number = 8) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.search(term, perPage);
    let response = [];
    if (status === 200) {
      response = data;
      const pagination = {
        total: data.total,
        perPage: data.per_page,
        prevPageUrl: data.prev_page_url,
        currentPage: data.current_page,
        from: data.from,
        to: data.to,
      };
      response = data.data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagination
      });
    }
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
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

export const create = (body: object) => async (dispatch: Function) => {
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
      dispatch(
        updateModal({
          payload: {
            status: false,
            element: null,
          }
        })
      );
      snackBarUpdate({
        payload: {
          message: "Share ha sido Registrado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
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
  dispatch(
    updateModal({
      payload: {
        isLoader: true,
      }
    })
  );
  dispatch({
    type: ACTIONS.SET_SELECTED_SHARE,
    payload: {}
  });
  try {
    const { data: { data }, status } = await API.get(id);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.SET_SELECTED_SHARE,
        payload: data
      });
      dispatch(
        updateModal({
          payload: {
            isLoader: false,
          }
        })
      );
    }
    return response;
  } catch (error) {
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
        }
      })
    );
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
    const { data, status } = await API.update(body);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Share ha sido Actualizado!",
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

export const remove = (id: number) => async (dispatch: Function) => {
  try {
    const { data, status } = await API.remove(id);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Share ha sido Elmiminado!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
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


export const getSharesByPartner = (id: number) => async (dispatch: Function) => {
  try {
    const { data: { data }, status } = await API.getByPartner(id);
    let response = [];
    if (status === 200) {
      response = data;
      const share = data.find((e: any, i: any) => i === 0);
      dispatch({
        type: ACTIONS.GET_SHARES_BY_PARTNER,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_SELECTED_SHARE,
        payload: share
      });
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

export const searchToAssign = (term: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_SHARE_TO_ASSIGN_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.searchToAssign(term);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_SHARE_TO_ASSIGN,
        payload: response
      });
    }
    dispatch({
      type: ACTIONS.SET_SHARE_TO_ASSIGN_LOADING,
      payload: false
    });
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
      type: ACTIONS.SET_SHARE_TO_ASSIGN_LOADING,
      payload: false
    });
    return error;
  }
};

export const reset = () => ({ type: ACTIONS.RESET});

export const filter = (form: object, page: number = 1, perPage: number = 8) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await API.filter(form, page, perPage);
    let response = [];
    if (status === 200) {
      const pagination = {
        total: data.total,
        perPage: data.per_page,
        prevPageUrl: data.prev_page_url,
        currentPage: data.current_page,
        from: data.from,
        to: data.to,
      };
      response = data.data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagination
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

export const filterReport  = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_REPORT_LOADING,
    payload: true
  });
  Axios({
    url: `${Prefix.api}/share-filter-report`,
    method: 'GET',
    responseType: 'blob', // important
    params: { ...body },
    headers: headers(),
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sharesReport.pdf');
    document.body.appendChild(link);
    link.click();
    dispatch({
      type: ACTIONS.SET_REPORT_LOADING,
      payload: false
    });
  });
};