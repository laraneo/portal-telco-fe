import React, { useEffect, useState } from "react";
import _ from "lodash";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { getUnpaidInvoices } from "../../actions/webServiceActions";
import { updateModal } from "../../actions/modalActions";
import LockerForm from "../../components/LockerForm";
import DataTable4 from "../../components/DataTable4";
import UnpaidInvoicesColumns from "../../interfaces/UnpaidInvoicesColumns";
import CustomSearch from "../../components/FormElements/CustomSearch";
import moment from "moment";
import Paypal from "../../components/Paypal";
import Helper from "../../helpers/utilities";
import logo from "../../styles/images/paypal-small-logo.jpeg";
import mercantilLogo from "../../styles/images/mercantil-small-logo.jpeg";

function formatNumber(num: any) {
  num = "" + Math.floor(num * 100.0 + 0.5) / 100.0;

  var i = num.indexOf(".");

  if (i < 0) num += ",00";
  else {
    num = num.substring(0, i) + "," + num.substring(i + 1);
    var nDec = num.length - i - 1;
    if (nDec == 0) num += "00";
    else if (nDec == 1) num += "0";
    else if (nDec > 2) num = num.substring(0, i + 3);
  }

  return num;
}

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: "18px",
  },
  searchContainer: {
    paddingBottom: "2%",
  },
  tableContainer: {
    marginTop: 20,
  },
}));

export default function UnpaidInvoices() {
  const [isCache, setIsCache] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    parameterReducer: { listData: parameterList },
    loginReducer: { user },
    webServiceReducer: { unpaidInvoices, setUnpaidInvoicestLoading, cache, tasa },
  } = useSelector((state: any) => state);

  const moneda = Helper.getParameter(parameterList, "MONEDA_DEFAULT");

  const paypalParameter = Helper.getParameter(
    parameterList,
    "PAYPAL_CLIENT_ID"
  );
  const habilitarPagoParameter = Helper.getParameter(
    parameterList,
    "HABILITAR_PAGO"
  );
  const linkMercantil = Helper.getParameter(
    parameterList,
    "LINK_PORTAL_MERCANTIL"
  );
  const wsAttemps = Helper.getParameter(parameterList, "WS_INTENTOS");
  const enablePaymentsCache = Helper.checkParameter(
    parameterList,
    "ENABLE_PAYMENTS_CACHE"
  );

  const paypalClientId =
    !_.isEmpty(paypalParameter) &&
    habilitarPagoParameter.value == 1 &&
    !_.isEmpty(paypalParameter) &&
    paypalParameter.value !== ""
      ? paypalParameter.value
      : null;

  const handlePayment = (row: any) => {
    const monto = Number(row.saldo);
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: (
            <Paypal
              description={row.descrip}
              invoiceId={row.fact_num}
              customId={user.username}
              amountDetail={monto.toFixed(2)}
              amount={monto.toFixed(2)}
              client={paypalClientId}
              attemps={wsAttemps.value}
            />
          ),
        },
      })
    );
  };

  const renderPaypalButton = (row: any) => {
    const current = unpaidInvoices.data.find((e: any) => e.fact_num == row);
    if (current && current.originalAmount !== "0") {
      return (
        <div onClick={() => handlePayment(current)}>
          <img src={logo} alt="example image" style={{ cursor: "pointer" }} />
        </div>
      );
    }
  };

  const renderMercantilButton = () => {
    if (!_.isEmpty(linkMercantil) && linkMercantil.value !== null) {
      return (
        <div
          onClick={() => window.open(linkMercantil.value, "_blank")}
          style={{ marginLeft: 10 }}
        >
          <img
            src={mercantilLogo}
            alt="mercantil image"
            style={{ cursor: "pointer" }}
          />
        </div>
      );
    }
    return <div />;
  };

  const columns: UnpaidInvoicesColumns[] = [
    {
      id: "fact_num",
      label: "Nro",
      minWidth: 10,
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "fec_emis",
      label: "Emision",
      minWidth: 10,
      component: (value: any) => (
        <span>{moment(value.value).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      id: "fec_venc",
      label: "Vencimiento",
      minWidth: 10,
      component: (value: any) => (
        <span>{moment(value.value).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      id: "descrip",
      label: "Descripcion",
      minWidth: 10,
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "descrip",
      label: "Moneda",
      minWidth: 10,
      component: (value: any) => <span>{moneda.value}</span>,
    },
    {
      id: "saldo",
      label: "Saldo",
      minWidth: 10,
      align: "right",
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "saldo",
      label: "Monto Sugerido",
      minWidth: 10,
      align: "right",
      component: (value: any) => <span>{value.value * tasa.tasa}</span>,
    },
    {
      id: "fact_num",
      label: "",
      minWidth: 10,
      align: "right",
      component: (value: any) => {
        if (cache && !enablePaymentsCache) {
          return ( <div />);
        }
        return (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {paypalClientId && renderPaypalButton(value.value)}
            {renderMercantilButton()}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (cache) {
      setIsCache(true);
    }
  }, [cache, setIsCache]);

  useEffect(() => {
    if (parameterList.length > 0) {
      dispatch(getUnpaidInvoices(wsAttemps.value));
    }

  }, [dispatch, parameterList, wsAttemps]);

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.headerTitle}>Facturas</div>
      </div>
      <div className={classes.tableContainer}>
        <DataTable4
          rows={unpaidInvoices.data}
          columns={columns}
          loading={setUnpaidInvoicestLoading}
          aditionalColumn={
            unpaidInvoices.total && unpaidInvoices.total > 0
              ? formatNumber(unpaidInvoices.total)
              : null
          }
          aditionalColumnLabel={
            unpaidInvoices.total && unpaidInvoices.total > 0 ? "Total" : null
          }
        />
      </div>
    </div>
  );
}
