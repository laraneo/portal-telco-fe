import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { getReportedPayments } from "../../actions/webServiceActions";
import DataTable4 from '../../components/DataTable4'
import Columns from '../../interfaces/reportePagosColumns';
import moment from "moment";
import { Chip } from "@material-ui/core";

function formatNumber(num: any) {
  num = "" + Math.floor(num * 100.0 + 0.5) / 100.0;

  var i = num.indexOf(".");

  if (i < 0) num += ",00";
  else {
    num = num.substring(0, i) + "," + num.substring(i + 1);
    var nDec = (num.length - i) - 1;
    if (nDec == 0) num += "00";
    else if (nDec == 1) num += "0";
    else if (nDec > 2) num = num.substring(0, i + 3);
  }

  return num;
}

const columns: Columns[] = [
  {
      id: "dFechaPago",
      label: "Fecha",
      minWidth: 30,
      component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
  },
  {
      id: "NroReferencia",
      label: "Referencia",
      minWidth: 20,
      align: "center",
      component: (value: any) => <span>{value.value}</span>
  },
  {
      id: "sDescripcion",
      label: "Descripcion",
      minWidth: 10,
      component: (value: any) => <span>{value.value}</span>
  },
  {
      id: "Destino",
      label: "Cuenta",
      minWidth: 10,
      component: (value: any) => <span> {value.value} </span>
  },
    {
      id: "Moneda",
      label: "Moneda",
      minWidth: 30,
      align: "right",
      component: (value: any) => <span>{value.value}</span>
  },
  {
      id: "nMonto",
      label: "Monto",
      minWidth: 30,
      align: "right",
      component: (value: any) => <span>{value.value}</span>
  },
  {
      id: "status",
      label: "Status",
      minWidth: 30,
      align: "center",
      component: (value: any) => {
          let status = '';
          let backgroundColor = '';
          if(value.value == "0") {
            status = "En Proceso";
            backgroundColor = '#2980b9';
          }
          if(value.value == "1") {
            status = "Procesado";
            backgroundColor = '#2ecc71';
          }
          if(value.value == "-1") {
            status = "Rechazado";
            backgroundColor = '#e74c3c';
          }
          return (
            <Chip
              label={status}
              style={{
                backgroundColor,
                color: "white",
                fontWeight: "bold",
                fontSize: "10px"
              }}
              size="small"
            />
          )
        }
  },
];

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '18px',
  },
  searchContainer: {
    paddingBottom: '2%'
  },
  tableContainer: {
    marginTop: 20,
  }
}))

export default function ReportedPayments() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    reportedPayments, setReportedPaymentsLoading
  } = useSelector((state: any) => state.webServiceReducer);
  useEffect(() => {
    async function fetchData() {
      dispatch(getReportedPayments());
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.headerTitle}>Pagos Reportados</div>
      </div>
      <div className={classes.tableContainer}>
        <DataTable4
          rows={reportedPayments}
          columns={columns}
          loading={setReportedPaymentsLoading}
        />
      </div>
    </div>
  );
}
