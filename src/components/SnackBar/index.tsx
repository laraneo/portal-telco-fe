import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import parse from 'react-html-parser';

import snackBarUpdate from '../../actions/snackBarActions'

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function SnackBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, message, type } = useSelector((state: any) => state.snackBarReducer);

  const handleClose = () => {
    dispatch(
      snackBarUpdate({
        payload: {
          message: "",
          status: false,
          type: ""
        }
      })
    );
  };

  return (
    <div className={classes.root}>
      <Snackbar open={status} autoHideDuration={20000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {parse(message)}
        </Alert>
      </Snackbar>
    </div>
  );
}
