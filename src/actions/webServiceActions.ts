import API from "../api/WebService";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";
import { ACTIONS } from "../interfaces/actionTypes/webServiceTypes";
import Message from "../helpers/message";

const attempts = window.attempts;

export const getStatusAccount = (
  conditionCount: number,
  count: number = 0,
  isCache = false
) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_STATUS_ACCOUNT_LOADING,
    payload: true,
  });
  try {
    const { data, status } = await API.getStatusAccount(isCache);
    let response = [];
    if (status === 200) {
      response = data;
      if (data.data.length === 1) {
        const value = data.data[0];
        if (value && value.saldo && value.saldo === "0.00") {
          response = [];
        }
      }
      dispatch({
        type: ACTIONS.GET_STATUS_ACCOUNT,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_STATUS_ACCOUNT_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    let counter = count + 1;
    if (
      error.response &&
      error.response.status === 500 &&
      Number(counter) <= Number(conditionCount)
    ) {
      //console.log(`${Number(counter)} <= ${Number(conditionCount)}`);
      dispatch(getStatusAccount(conditionCount, counter, false));
    } else {
      const indicator = counter - 1;
      if (
        error.response &&
        error.response.status === 500 &&
        Number(indicator) === Number(conditionCount)
      ) {
        dispatch(getStatusAccount(conditionCount, 10, true));
      }
      if (error.response && error.response.status !== 500) {
        const message = Message.exception(error);
        snackBarUpdate({
          payload: {
            message,
            status: true,
            type: "error",
          },
        })(dispatch);
      }
    }

    dispatch({
      type: ACTIONS.SET_STATUS_ACCOUNT_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getUnpaidInvoices = (
  conditionCount: number,
  count: number = 0,
  isCache: boolean = false
) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
    payload: true,
  });
  try {
    const { data, status } = await API.getUnpaidInvoices(isCache);
    let response = [];
    if (status === 200) {
      response = data;
      if (data.data.length === 1) {
        const value = data.data[0];
        if (value && value.saldo && value.saldo === "0.00") {
          response = [];
        }
      }
      dispatch({
        type: ACTIONS.GET_UNPAID_INVOICES,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_CACHE,
        payload: data.cache,
      });
      dispatch({
        type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    let counter = count + 1;
    if (
      error.response &&
      error.response.status === 500 &&
      Number(counter) <= Number(conditionCount)
    ) {
      //console.log(`${Number(counter)} <= ${Number(conditionCount)}`);
      dispatch(getUnpaidInvoices(conditionCount, counter, false));
    } else {
      const indicator = counter - 1;
      if (
        error.response &&
        error.response.status === 500 &&
        Number(indicator) === Number(conditionCount)
      ) {
        dispatch(getUnpaidInvoices(conditionCount, counter, true));
      }
      if (error.response && error.response.status !== 500) {
        const message = Message.exception(error);
        snackBarUpdate({
          payload: {
            message,
            status: true,
            type: "error",
          },
        })(dispatch);
      }
    }
    dispatch({
      type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getUnpaidInvoicesbyShare = (
  share: string,
  count: number = 0
) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
    payload: true,
  });
  try {
    const { data, status } = await API.getUnpaidInvoicesByShare(share);
    let response = [];
    if (status === 200) {
      response = data;
      if (data.data.length === 1) {
        const value = data.data[0];
        if (value && value.saldo && value.saldo === "0.00") {
          response = [];
        }
      }
      dispatch({
        type: ACTIONS.GET_UNPAID_INVOICES,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    if (error.response && error.response.status === 500 && count <= attempts) {
      let counter = count + 1;
      dispatch(getUnpaidInvoicesbyShare(share, counter));
    } else {
      const message = Message.exception(error);
      snackBarUpdate({
        payload: {
          message,
          status: true,
          type: "error",
        },
      })(dispatch);
    }
    dispatch({
      type: ACTIONS.SET_UNPAID_INVOICES_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getReportedPayments = (count: number = 0) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_REPORTED_PAYMENTS_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getReportedPayments();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_REPORTED_PAYMENTS,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_REPORTED_PAYMENTS_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    if (count <= attempts) {
      let counter = count + 1;
      dispatch(getReportedPayments(counter));
    } else {
      snackBarUpdate({
        payload: {
          message: error.message,
          status: true,
          type: "error",
        },
      })(dispatch);
    }
    dispatch({
      type: ACTIONS.SET_REPORTED_PAYMENTS_LOADING,
      payload: false,
    });
    return error;
  }
};

export const getBalance = (
  conditionCount: number,
  count: number = 0,
  isCache: boolean = false
) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_BALANCE_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getBalance(isCache);
    let response = [];
    if (status === 200) {
      if (data) {
        response = data;
      }
      dispatch({
        type: ACTIONS.GET_BALANCE,
        payload: response,
      });
      dispatch({
        type: ACTIONS.SET_BALANCE_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    let counter = count + 1;
    if (
      error.response &&
      error.response.status === 500 &&
      Number(counter) <= Number(conditionCount)
    ) {
      //console.log(`${Number(counter)} <= ${Number(conditionCount)}`);
      dispatch(getBalance(conditionCount, counter, false));
    } else {
      const indicator = counter - 1;
      if (
        error.response &&
        error.response.status === 500 &&
        Number(indicator) === Number(conditionCount)
      ) {
        dispatch(getBalance(conditionCount, counter, true));
      }
      if (error.response && error.response.status !== 500) {
        const message = Message.exception(error);
        snackBarUpdate({
          payload: {
            message,
            status: true,
            type: "error",
          },
        })(dispatch);
      }
    }
    dispatch({
      type: ACTIONS.SET_BALANCE_LOADING,
      payload: false,
    });
    return error;
  }
};

export const setOrder = (order: object) => async (dispatch: Function) => {
  dispatch(
    updateModal({
      payload: {
        isLoader: true,
      },
    })
  );
  try {
    const { data, status } = await API.setOrder(order);
    let response = [];
    if (status === 200) {
      if (data) {
        response = data;
        snackBarUpdate({
          payload: {
            message: "Su pago ha sido Procesado",
            type: "success",
            status: true,
          },
        })(dispatch);
      }
    }
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
          status: false,
          element: null,
        },
      })
    );
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

export const setInvoicePayment = (body: any) => async (dispatch: Function) => {
  try {
    const { data, status } = await API.setInvoicePayment(body);
    let response = [];
    if (status === 200) {
      if (data) {
        response = data;
        snackBarUpdate({
          payload: {
            message: "Su pago ha sido Procesado",
            type: "success",
            status: true,
          },
        })(dispatch);
        dispatch(getUnpaidInvoicesbyShare(body.share));
      }
    }
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
          status: false,
          element: null,
        },
      })
    );
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

export const getTasa = (count: number = 0) => async (
  dispatch: Function
) => {
  dispatch({
    type: ACTIONS.SET_TASA_LOADING,
    payload: true,
  });
  try {
    const {
      data: { data },
      status,
    } = await API.getTasa();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.SET_TASA,
        payload: data,
      });
      dispatch({
        type: ACTIONS.SET_TASA_LOADING,
        payload: false,
      });
    }
    return response;
  } catch (error) {
    if (count <= attempts) {
      let counter = count + 1;
      dispatch(getReportedPayments(counter));
    } else {
      snackBarUpdate({
        payload: {
          message: error.message,
          status: true,
          type: "error",
        },
      })(dispatch);
    }
    dispatch({
      type: ACTIONS.SET_TASA_LOADING,
      payload: false,
    });
    return error;
  }
};
