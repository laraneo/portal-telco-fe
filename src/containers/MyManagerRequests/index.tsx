import { Grid, Chip, IconButton, Button } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

import { getAll, getAllByManager } from "../../actions/processRequestActions";
import DataTable4 from "../../components/DataTable4";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect";
import { getList as getProcessList } from "../../actions/processActions";
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
    | "descriptcion"
    | "user";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  component?: any;
}

type FormData = {
  process_id: number;
  nStatus: string;
  created_start: string;
  created_end: string;
};

const useStyles = Styles;

export default function MyManagerRequests() {
  const {
    processRequestReducer: { list: processRequestList, loading },
    processReducer: { listData: processList },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { handleSubmit, register, errors, watch } = useForm<FormData>();

  useEffect(() => {
    dispatch(getProcessList());
    dispatch(getAllByManager());
  }, [dispatch]);

  const getRow = (row: any) =>
    processRequestList.find((element: any) => element.id == row);

  const columns: Columns[] = [
    {
      id: "id",
      label: "Nro",
      minWidth: 10,
      align: "left",
      component: (value: any) => <span>{value.value}</span>,
    },
    {
      id: "user",
      label: "Usuario",
      minWidth: 10,
      align: "left",
      component: (value: any) => <span><strong>{value.value && value.value.username}</strong></span>,
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
        if (row.sSourceFile) {
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
        if (row.sTargetFile && row.nStatus === "1") {
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
        if (row.sLogFile) {
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

  return (
    <Grid container spacing={3}>
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className={classes.form}
      >
        <Grid item xs={12} style={{ fontWeight: 'bold' }} >
        Solicitudes de mi Grupo
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          style={{ marginTop: 20, marginBottom: 30 }}
        >
          <Grid container spacing={3}>
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
            <Grid item sm={2} xs={2} md={2}>
              <CustomSelect
                label="Tipo de Solicitud"
                selectionMessage="Seleccione"
                field="process_id"
                register={register}
                errorsMessageField={
                  errors.process_id && errors.process_id.message
                }
              >
                {processList.map((item: any, i: number) => (
                  <option key={i} value={item.id}>
                    {item.sName}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item sm={2} xs={2} md={2}>
              <CustomSelect
                label="Status"
                selectionMessage="Seleccione"
                field="nStatus"
                register={register}
                errorsMessageField={errors.nStatus && errors.nStatus.message}
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
