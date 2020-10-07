export const ACTIONS = {
    STATUS: 'loader/main_loading_status',
  };
  
  export const mainStatusLoading = status => ({ type: ACTIONS.STATUS, payload: status });
  