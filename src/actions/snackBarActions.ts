export const ACTIONS = {
  STATUS: 'snackBar/status',
};

export default function snackBarUpdate(value: object) {
  return (dispatch: Function) => {
    dispatch({ type: ACTIONS.STATUS, ...value });
  };
}