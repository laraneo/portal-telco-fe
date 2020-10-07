import React, { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from "@material-ui/core/Fab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import "./index.sass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    fabProgress: {
      color: '#2980b9',
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  }),
);

type FormComponentProps = {
  title: string;
  handleClick: any;
};

const WidgtetReport: FunctionComponent<FormComponentProps> = ({
  title,
  handleClick,
}) => {
  const classes = useStyles();
  return (
    <Card className="widget-report-container__card">
        <div className="widget-report-container__detail">
          <div className="widget-report-container__detail-title">{title}</div>
          <div className="widget-report-container__detail-sub-title">
          <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          onClick={handleClick}
        >
          <VisibilityIcon />
        </Fab>
      </div>
          </div>
      </div>
    </Card>
  );
};

export default WidgtetReport;
