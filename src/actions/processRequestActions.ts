import API from "../api/ProcessRequest";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";

export const ACTIONS = {
  GET_ALL: "process-request/get_all",
  GET: "process-request/get",
  GET_LIST: "process-request/get_list",
  GET_USERS_BY_MANAGER: "process-request/get_users_by_manager",
  SET_LOADING: "process-request/set_loading",
  SET_PAGINATION: "process-request/set_pagination",
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetUsersByManager {
  type: typeof ACTIONS.GET_USERS_BY_MANAGER;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION;
  payload: Array<string | number>;
}

export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList | GetUsersByManager;

export const getAll = (queryParams: any = {}) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getAll(queryParams);
    let response = [];
    console.log('data ', data);
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getAllByManager = (queryParams: any = {}) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getAllByManager(queryParams);
    let response = [];
    console.log('data ', data);
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getUsersByManager = (queryParams: any = {}) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getUsersByManager(queryParams);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_USERS_BY_MANAGER,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return error;
  }
};

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

export const search = (term: string, perPage: number = 8) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.search(term, perPage);
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
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagination,
      });
    }
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return error;
  }
};

export const create = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const response = await API.create(body);
    const { status } = response;
    let createresponse: any = [];
    if (status === 200 || status === 201) {
      createresponse = response;
      snackBarUpdate({
        payload: {
          message: "Solicitud ha sido Registrada!",
          type: "success",
          status: true,
        },
      })(dispatch);
      dispatch(getAll());
      dispatch(
        updateModal({
          payload: {
            status: false,
            element: null,
          },
        })
      );
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
    }
    return createresponse;
  } catch (error) {
    let message = "General Error";
    if (error && error.response) {
      const {
        data: { message: msg },
      } = error.response;
      message = msg;
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true,
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
    });
    return error;
  }
};

export const get = (id: number) => async (dispatch: Function) => {
  try {
    const {
      data: { data },
      status,
    } = await API.get(id);
    let response = [];
    if (status === 200) {
      response = data;
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true,
      },
    })(dispatch);
    return error;
  }
};

export const update = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true,
  });
  try {
    const { data, status } = await API.update(body);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status,
      };
      snackBarUpdate({
        payload: {
          message: "Cargar solcitud ha sido Actualizado!",
          type: "success",
          status: true,
        },
      })(dispatch);
      dispatch(
        updateModal({
          payload: {
            status: false,
            element: null,
          },
        })
      );
      dispatch(getAll());
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    let message = "General Error";
    if (error && error.response) {
      const {
        data: { message: msg },
      } = error.response;
      message = msg;
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true,
      },
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false,
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
        status,
      };
      snackBarUpdate({
        payload: {
          message: "Cargar solcitud ha sido Elmiminado!",
          type: "success",
          status: true,
        },
      })(dispatch);
      dispatch(getAll());
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true,
      },
    })(dispatch);
    return error;
  }
};
