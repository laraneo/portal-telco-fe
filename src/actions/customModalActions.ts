export const ACTIONS = {
    STATUS: 'custom-modal/status',
  };
  
  export const updateModal = (value: object) => ({ type: ACTIONS.STATUS, ...value });
  