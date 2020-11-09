import { Grid, Chip, IconButton, Button } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

import { getAll } from "../../actions/processRequestActions";
import { getList as GetAllCategories } from "../../actions/processCategoryActions";
import DataTable4 from "../../components/DataTable4";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect";
import { getProcessByCategory } from "../../actions/processActions";
import Styles from "./style";
import RangePicker from "../../components/FormElements/RangePicker";

interface Columns {
  id:
    | "id"
    | "dDate"
    | "process_id"
    | "nStatus"
    | "sSourceFile"
    | "sTargetFile"
    | "sLogFile"
    | "dDateProcessed"
    | "type"
    | "reference"
    | "descriptcion";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  component?: any;
}

type FormData = {
  category: number;
  process_id: number;
  nStatus: string;
  created_start: string;
  created_end: string;
};

const useStyles = Styles;

export default function MyRequests() {
  const [disableProcess, setDisableProcess] = useState<boolean>(true);
  const {
    processRequestReducer: { list: processRequestList, loading },
    processReducer: { listData: processList },
    processCategoryReducer: { listData: processCategoryList },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { handleSubmit, register, errors, watch } = useForm<FormData>();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAll());
    dispatch(GetAllCategories());
  }, [dispatch]);

  const getRow = (row: any) =>
    processRequestList.find((element: any) => element.id == row);

  const checkFiles = (file: string, status: string) => {

    if(status === '0' && file === 'fuente') {
      return true;
    }
    if(status === '-1' && (file === 'fuente' || file === 'log')) {
      return true;
    }
    if(status === '1' && (file === 'fuente' || file === 'procesado' || file === 'log')) {
      return true;
    }
    return false;
  }

  const columns: Columns[] = [
    {
      id: "id",
      label: "Nro",
      minWidth: 10,
      align: "left",
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "dDate",
      label: "Fecha",
      minWidth: 10,
      align: "left",
      component: (value: any) => (
        <span>{moment(value.value).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      id: "type",
      label: "Tipo de Solicitud",
      minWidth: 10,
      align: "left",
      component: (value: any) => (
        <span>{value.value && value.value.sName}</span>
      ),
    },
    {
      id: "reference",
      label: "Referencia",
      minWidth: 10,
      align: "left",
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "id",
      label: "Archivo Fuente",
      minWidth: 10,
      align: "left",
      component: (value: any) => {
        const row = getRow(value.value);
        const check = checkFiles('fuente', row.nStatus);
        if (row.sSourceFile && check) {
          return (
            <div
              style={{
                width: 150,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <a
                target="_blank"
                href={row.sSourceFileDownload}
                title="comprobante"
              >
                {row.sSourceFile}
              </a>
            </div>
          );
        }
        return <div />;
      },
    },
    {
      id: "id",
      label: "Archivo Procesado",
      minWidth: 10,
      align: "left",
      component: (value: any) => {
        const row = getRow(value.value);
        const check = checkFiles('procesado', row.nStatus);
        if (row.sTargetFile && check) {
          return (
            <div
              style={{
                width: 150,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <a
                target="_blank"
                href={row.sTargetFileDownload}
                title="comprobante"
              >
                {row.sTargetFile}
              </a>
            </div>
          );
        }
        return <div />;
      },
    },
    {
      id: "id",
      label: "Log",
      minWidth: 10,
      align: "left",
      component: (value: any) => {
        const row = getRow(value.value);
        const check = checkFiles('log', row.nStatus);
        if (row.sLogFile && check) {
          return (
            <div
              style={{
                width: 150,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <a
                target="_blank"
                href={row.sLogFileDownload}
                title="comprobante"
              >
                {row.sLogFile}
              </a>
            </div>
          );
        }
        return <div />;
      },
    },
    {
      id: "nStatus",
      label: "Status",
      minWidth: 10,
      align: "left",
      component: (value: any) => {
        let status = "";
        let backgroundColor = "";
        if (value.value === "0") {
          status = "Pendiente";
          backgroundColor = "#3498db";
        }
        if (value.value === "-1") {
          status = "Rechazado";
          backgroundColor = "#c0392b";
        }
        if (value.value === "1") {
          status = "Procesado";
          backgroundColor = "#27ae60";
        }
        return (
          <Chip
            label={status}
            style={{
              backgroundColor,
              color: "white",
              fontWeight: "bold",
              fontSize: "10px",
            }}
            size="small"
          />
        );
      },
    },
  ];

  const handleForm = async (form: FormData) => {
    dispatch(getAll(form));
  };

  const handleLoadRequest = () => {
    history.push("/dashboard/load-request");
  };

  const handleCategory = (event: any) => {
    setDisableProcess(true);
    getProcessByCategory(event.target.value)(dispatch).then(() => {
      setDisableProcess(false);
    });
  };

  return (
    <Grid container spacing={3}>
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className={classes.form}
      >
        <Grid item xs={12} style={{ fontWeight: "bold" }}>
          Mis Solicitudes
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          style={{ marginTop: 20, marginBottom: 30 }}
        >
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item sm={4} xs={4} md={4}>
                  <RangePicker
                    label="Fecha"
                    startField="created_start"
                    endField="created_end"
                    register={register}
                    watch={watch}
                    startMsgErr={
                      errors.created_start && errors.created_start.message
                    }
                    endMsgErr={errors.created_end && errors.created_end.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2} xs={2} md={2}>
              <CustomSelect
                label="Categoria"
                selectionMessage="Seleccione"
                field="category"
                register={register}
                errorsMessageField={errors.category && errors.category.message}
                onChange={handleCategory}
              >
                {processCategoryList.map((item: any, i: number) => (
                  <option key={i} value={item.id}>
                    {item.sName}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item sm={2} xs={2} md={2}>
              <CustomSelect
                label="Tipo de Solicitud"
                selectionMessage="Seleccione"
                field="process_id"
                register={register}
                errorsMessageField={
                  errors.process_id && errors.process_id.message
                }
                disabled={disableProcess}
              >
                {processList.map((item: any, i: number) => (
                  <option key={i} value={item.id}>
                    {item.sName}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={2} xs={2} md={2}>
                  <CustomSelect
                    label="Status"
                    selectionMessage="Seleccione"
                    field="nStatus"
                    register={register}
                    errorsMessageField={
                      errors.nStatus && errors.nStatus.message
                    }
                  >
                    <option value="0">Pendiente</option>
                    <option value="-1">Rechazado</option>
                    <option value="1">Procesado</option>
                  </CustomSelect>
                </Grid>
                <Grid item sm={3} xs={3} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: 15 }}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: "right", paddingRight: 10, marginBottom: 20 }}
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={handleLoadRequest}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <DataTable4
            rows={processRequestList}
            columns={columns}
            loading={loading}
          />
        </Grid>
      </form>
    </Grid>
  );
}
