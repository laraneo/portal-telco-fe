import React, { FunctionComponent } from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    fabProgress: {
      color: "#2980b9",
      position: "absolute",
      top: -6,
      right: -6,
      zIndex: 1
    }
  })
);

type FormComponentProps = {
  Icon: any;
  handleClick: any;
  loading: boolean;
};

const LoadingButton: FunctionComponent<FormComponentProps> = ({
  handleClick,
  loading,
  Icon,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Fab aria-label="save" color="primary" onClick={handleClick}>
        <Icon />
      </Fab>
      {loading && (
        <CircularProgress size={68} className={classes.fabProgress} />
      )}
    </div>
  );
};

export default LoadingButton;
