import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import Widgtet from "../../components/Widget";
import { Paper } from "@material-ui/core";
import Helper from '../../helpers/utilities';
import Loader from "../../components/common/Loader";
import { getBalance } from "../../actions/webServiceActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    widgetContainer: {
      marginBottom: "100px"
    },
    hideMobileWidget: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
    }
  })
);

export default function Home() {
  const classes = useStyles();
  const {
    webServiceReducer: {
      clientBalance,
      setBalanceLoading,
    },
    menuReducer: {
      widgetList,
    },
    loginReducer: { userRoles, user },
    parameterReducer: { listData: parameterList }
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const wsAttemps = Helper.getParameter(parameterList, "WS_INTENTOS");

  const validateWidget = (value: string) => {
    const isValid = widgetList.find((e: any) => e.slug === value);
    if (isValid) {
      return true
    }
    return false;
  }

  const hiddeMobileWidget = (value: string) => {
    const isValid = widgetList.find((e: any) => e.slug === value);
    if (isValid && isValid.show_mobile !== null && isValid.show_mobile == 0) {
      return true
    }
    return false;
  }

  useEffect(() => {
    if (parameterList.length > 0 && validateWidget('PARTNERPORTAL_saldo')) {
      dispatch(getBalance(wsAttemps.value));
    }
  }, [dispatch, widgetList, parameterList, wsAttemps.value]);


  let reservacionesLink = null;
  if (validateWidget('PARTNERPORTAL_reservaciones')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_RESERVACIONES');
    reservacionesLink = `${parameter.value}?doc_id=${user.doc_id}&token=${user.token}`
  }

  let torneosLink = null;
  if (validateWidget('PARTNERPORTAL_torneos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_TORNEOS');
    torneosLink = `${parameter.value}?doc_id=${user.doc_id}&token=${user.token}`
  }

  let reportePagosLink = null;
  if (validateWidget('PARTNERPORTAL_reporte-pagos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_REPORTE_PAGOS');
    reportePagosLink = parameter.value;
  }

  let estadoCuentaLink = null;
  if (validateWidget('PARTNERPORTAL_estado-cuenta')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_ESTADO_CUENTA');
    estadoCuentaLink = parameter.value;
  }

  let actualizacionDatosLink = null;
  if (validateWidget('PARTNERPORTAL_actualizacion-datos')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_ACTUALIZACION_DATOS');
    actualizacionDatosLink = parameter.value;
  }

  let miAccesoLink = null;
  if (validateWidget('PARTNERPORTAL_mi-acceso')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_MI_ACCESO');
    miAccesoLink = parameter.value;
  }

  let tennisLink = null;
  if (validateWidget('PARTNERPORTAL_tennis')) {
    const parameter = Helper.getParameter(parameterList, 'LINK_TENNIS');
    tennisLink = `${parameter.value}?doc_id=${user.doc_id}&token=${user.token}`
  }

  let textInfo = null;
  if (validateWidget('PARTNERPORTAL_info')) {
    const parameter = Helper.getParameter(parameterList, 'INFO');
    textInfo = parameter.value;
  }
  
  return (
    <div className="home-container">
      <Grid container spacing={3} className={classes.widgetContainer}>

      {validateWidget('PARTNERPORTAL_info') &&
          <Grid item sm={12} xs={12} md={12}>
            <Paper>
              <Widgtet
                title={textInfo}
              />
            </Paper>
          </Grid>
        }


        {validateWidget('PARTNERPORTAL_saldo') &&
          <Grid item sm={12} xs={12} md={3}>
            {setBalanceLoading ? (
              <Loader />
            ) : (
                <Paper>
                  <Widgtet
                    Icon={AccountBalanceIcon}
                    title={clientBalance.status === "1" ? 'Saldo Deudor' : 'Saldo a Favor'}
                    amount={clientBalance.saldo}
                    statusSaldo={clientBalance.status}
                    type="Saldo"
                  />
                </Paper>
              )}
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_actualizacion-datos') &&
          <Grid item sm={12} xs={12} md={3} className={`${hiddeMobileWidget('PARTNERPORTAL_actualizacion-datos') ? classes.hideMobileWidget : ''}`} >
            <Paper>
              <Widgtet
                Icon={AccountBoxIcon}
                title="Actualizacion de Datos"
                link={actualizacionDatosLink}
                internal
              />
            </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_facturas') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={CreditCardRoundedIcon}
                title="Paga tu Factura"
                link="/dashboard/unpaid-invoices"
                internal
              />
            </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_reporte-pagos') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={PlaylistAddIcon}
                title="Notifica tu Pago"
                link={reportePagosLink}
                internal
              />
            </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_pagos-reportados') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={AccountBoxIcon}
                title="Pagos Reportados"
                link="/dashboard/reported-payments"
                internal
              />
            </Paper>
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_reservaciones') &&
          <Grid item sm={12} xs={12} md={3}>
            {setBalanceLoading ? (
              <Loader />
            ) : (
                <Paper>
                  <Widgtet
                    Icon={EventAvailableIcon}
                    title="Golf"
                    type="Saldo"
                    amount={clientBalance.saldo}
                    statusSaldo={clientBalance.status}
                    link={reservacionesLink}
                    paramText="SHOW_GOLF"
                  />
                </Paper>
              )}
          </Grid>
        }

      {validateWidget('PARTNERPORTAL_tennis') &&
          <Grid item sm={12} xs={12} md={3}>
            {setBalanceLoading ? (
              <Loader />
            ) : (
                <Paper>
                  <Widgtet
                    Icon={EventAvailableIcon}
                    title="Tenis"
                    type="Saldo"
                    amount={clientBalance.saldo}
                    statusSaldo={clientBalance.status}
                    link={tennisLink}
                    paramText="SHOW_TENIS"
                  />
                </Paper>
              )}
          </Grid>
        }

        {validateWidget('PARTNERPORTAL_torneos') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={ScheduleIcon}
                title="Eventos"
                link={torneosLink}
                paramText="SHOW_TOURNAMENT"
              />
            </Paper>
          </Grid>
        }

        {/* {validateWidget('PARTNERPORTAL_estado-cuenta') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={AccountBalanceIcon}
                title="Estado de Cuenta"
                link={estadoCuentaLink}
                internal
              />
            </Paper>
          </Grid>
        } */}

        {validateWidget('PARTNERPORTAL_mi-acceso') &&
          <Grid item sm={12} xs={12} md={3}>
            <Paper>
              <Widgtet
                Icon={AccessTimeIcon}
                title="Mi QR"
                link={miAccesoLink}
                internal
              />
            </Paper>
          </Grid>
        }

      </Grid>
    </div>
  );
}
