import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import "./index.sass";
import DataTable4 from "../../components/DataTable4";
import Columns from "../../interfaces/StatusAccountColumns";
import { getStatusAccount } from "../../actions/webServiceActions";
import { Grid } from "@material-ui/core";
import { setForcedLogin } from "../../actions/loginActions";
import Helper from "../../helpers/utilities";

const columns: Columns[] = [
  {
    id: "fact_num",
    label: "Nro",
    minWidth: 20,
    align: "center",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "fec_emis",
    label: "Emision",
    minWidth: 20,
    component: (value: any) => (
      <span>{moment(value.value).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    id: "descrip",
    label: "Description",
    minWidth: 20,
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "tipo",
    label: "Tipo",
    minWidth: 20,
    align: "center",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "total_fac",
    label: "Debe",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "saldo",
    label: "Haber",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "acumulado",
    label: "Acumulado",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
];

export default function StatusAccount() {
  const dispatch = useDispatch();
  const {
    webServiceReducer: { statusAccountList, setStatusAccountLoading },
    parameterReducer: { listData: parameterList },
  } = useSelector((state: any) => state);
  const { client } = useSelector((state: any) => state.personReducer);
  const location = useLocation();
  const wsAttemps = Helper.getParameter(parameterList, "WS_INTENTOS");

  useEffect(() => {
    async function fetchData() {
      const values = queryString.parse(location.search);
      if (!_.isEmpty(values) && values.socio && values.token) {
        await dispatch(setForcedLogin(values.socio, values.token));
        if (parameterList.length > 0) {
          dispatch(getStatusAccount(wsAttemps.value));
        }
      } else {
        if (parameterList.length > 0) {
          dispatch(getStatusAccount(wsAttemps.value));
        }
      }
    }
    fetchData();
  }, [dispatch, parameterList]);

  //replace(/[0-9]/g, "X")
  // var str = "1234123412341234";
  // var res = `${str.substring(0, 12).replace(/[0-9]/g, "x")}${str.substring(12, 16)}`;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        Estado de Cuenta
      </Grid>
      <Grid item xs={12}>
        {!_.isEmpty(client) && (
          <div>
            <div>{client.cli_des}</div>
            <div>{client.co_cli}</div>
          </div>
        )}
      </Grid>
      <Grid item xs={12}>
        <DataTable4
          rows={statusAccountList.data}
          columns={columns}
          loading={setStatusAccountLoading}
          aditionalColumn={statusAccountList.total}
          aditionalColumnLabel="Total"
        />
      </Grid>
    </Grid>
  );
}
