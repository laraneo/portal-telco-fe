export const ACTIONS = {
    STATUS: 'second-modal/status',
  };
  
  export const updateModal = (value: object) => ({ type: ACTIONS.STATUS, ...value });