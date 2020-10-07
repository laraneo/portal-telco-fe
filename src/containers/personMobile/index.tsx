import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import {
  makeStyles,
  Theme,
  useTheme,
  withStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import './index.sass';
import { getAll } from "../../actions/personActions";
import { updateModal } from "../../actions/modalActions";
import PersonFormMobile from "../../components/PersonFormMobile";
import DataTable4 from '../../components/DataTable4';
import PersonColumn from '../../interfaces/PersonColumn';
import { setForcedLogin } from "../../actions/loginActions";
import { Chip, Grid } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabsContainer: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: window.innerWidth - 50,
      width: window.innerWidth - 50,
    },
  },
  personContent: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function PersonMobile() {
  const [tabValue, setTabValue] = useState(0);
  const [disableTab, setDisableTab] = useState<boolean>(true);
  const [element, setElement] = useState<any>(null);
  const dispatch = useDispatch();
  const { persons, loading } = useSelector((state: any) => state.personReducer);
  const { user } = useSelector((state: any) => state.loginReducer);
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();

  const handleEdit = (row: any) => {
    setElement(<PersonFormMobile id={row.id} />)
    setTabValue(1);
    setDisableTab(false);
  };

  const getRow = (row: any) => persons.find((element: any) => element.id == row);

  const columns: PersonColumn[] = [
    {
      id: "relation",
      label: "Parentesco",
      minWidth: 20,
      align: "left",
      component: (value: any) => {
        return (
          <Chip
            label={value.value}
            style={{
              backgroundColor: value.value === 'SOCIO' ? "#2ecc71" : "#f1c40f",
              color: "white",
              fontWeight: "bold",
              fontSize: "10px"
            }}
            size="small"
          />
        )
      }
    },
    {
      id: "id",
      label: "Nombre",
      minWidth: 20,
      align: "left",
      component: (value: any) => {
        const row = getRow(value.value);
        if(row) return <span>{row.name} <br /> {row.last_name}</span>
        return <span></span>
      },
    },
  ];

  const handleChange = (event: React.ChangeEvent<{}>, tabValue: number) => {
    setTabValue(tabValue);
    if(tabValue == 0) {
      setDisableTab(true);
      setElement(null)
    }
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
    if(index == 0) {
      setDisableTab(true);
      setElement(null)
    }
  };

  useEffect(() => {
    async function fetchData() {
      const values = queryString.parse(location.search);
      if (!_.isEmpty(values) && values.socio && values.token) {
        await dispatch(setForcedLogin(values.socio, values.token));
        dispatch(getAll(values.socio));
      } else {
        dispatch(getAll(user.username));
      }
    }

    fetchData();
  }, [dispatch]);

  //replace(/[0-9]/g, "X")
  // var str = "1234123412341234";
  // var res = `${str.substring(0, 12).replace(/[0-9]/g, "x")}${str.substring(12, 16)}`;
  return (
    <Grid container spacing={3}>
      <Grid item sm={12} xs={12} md={4}>
          <AppBar position="static" color="default"  className={classes.tabsContainer}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Lista" />
              <Tab label="Detalle" disabled={disableTab} />
            </Tabs>
          </AppBar>
      </Grid>
      <Grid item sm={12} xs={12} md={12}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
          className={classes.tabsContainer}
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <DataTable4
              rows={persons}
              columns={columns}
              loading={loading}
              handleRowEdit={handleEdit}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            {element && element}
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
