export const ACTIONS = {
  STATUS: 'modal/status',
};

export const updateModal = (value: object) => ({ type: ACTIONS.STATUS, ...value });
