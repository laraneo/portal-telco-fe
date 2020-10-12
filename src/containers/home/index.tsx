import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

import Widgtet from "../../components/Widget";
import { Paper } from "@material-ui/core";
import Helper from "../../helpers/utilities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    widgetContainer: {
      marginBottom: "100px",
    },
    hideMobileWidget: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const {
    menuReducer: { widgetList },
    parameterReducer: { listData: parameterList },
  } = useSelector((state: any) => state);

  const validateWidget = (value: string) => {
    const isValid = widgetList.find((e: any) => e.slug === value);
    if (isValid) {
      return true;
    }
    return false;
  };

  let textInfo = null;
  if (validateWidget("PARTNERPORTAL_info")) {
    const parameter = Helper.getParameter(parameterList, "INFO");
    textInfo = parameter.value;
  }

  return (
    <div className="home-container">
      <Grid container spacing={3} className={classes.widgetContainer}>
        {validateWidget("PARTNERPORTAL_info") && (
          <Grid item sm={12} xs={12} md={12}>
            <Paper>
              <Widgtet title={textInfo} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
