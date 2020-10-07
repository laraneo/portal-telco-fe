import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import Chip from "@material-ui/core/Chip";
import CustomTextField from '../../../components/FormElements/CustomTextField'

import { filter, filterReport, reset as resetShare } from "../../../actions/shareActions";
import ShareColumns from '../../../interfaces/ShareColumns';
import ShareMovementColumns from '../../../interfaces/ShareMovementColumns';
import DataTable4 from "../../../components/DataTable4";
import SimpleTable from "../../../components/SimpleTable";
import PrintIcon from "@material-ui/icons/Print";
import LoadingButton from "../../../components/FormElements/LoadingButton";
import { getList } from '../../../actions/shareMovementActions';
import CustomSelect from "../../../components/FormElements/CustomSelect";

const shareMovementColumns: ShareMovementColumns[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "created",
    label: "Fecha",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "transaction",
    label: "Tipo",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "description",
    label: "Description",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "rate_currency",
    label: "Moneda",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "rate",
    label: "Tarifa",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "sale_currency",
    label: "Moneda",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "number_sale_price",
    label: "Precio Venta",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "partner",
    label: "Socio",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value.name} {value.value.last_name}</span>
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value.name} {value.value.last_name}</span>
  },
  {
    id: "number_procesed",
    label: "Procesado",
    minWidth: 10,
    align: "left",

    component: (value: any) => <span>{value.value === 1 ? 'SI' : 'NO'}</span>
  },
];

const columns: ShareColumns[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "share_number",
    label: "Accion",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "father_share",
    label: "N° Accion Padre",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.share_number}</span>)
      }
      return (<Chip
        label="Principal"
        style={{
          fontWeight: "bold",
          fontSize: "11px"
        }}
        size="small"
        color="primary"
      />)
    }
  },
  {
    id: "status",
    label: "Status",
    minWidth: 20,
    align: "right",
    component: (value: any) => <Chip
      label={value.value === 1 ? 'Activo' : 'Inactivo'}
      style={{
        fontWeight: "bold",
        fontSize: "11px"
      }}
      size="small"
      color={value.value === 1 ? 'primary' : 'secondary'}
    />,
  },
  {
    id: "payment_method",
    label: "Metodo de Pago",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value.description}</span>,
  },
  {
    id: "share_type",
    label: "Tipo",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.code}</span>)
      }
      return (<span>Asignada como Padre</span>)
    }
  },
  {
    id: "partner",
    label: "Socio",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.name} {value.value.last_name}</span>)
      }
      return (<span>N/A</span>)
    }
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.name} {value.value.last_name}</span>)
      }
      return (<span>N/A</span>)
    }
  },
  {
    id: "facturador",
    label: "Facturador",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.name} {value.value.last_name}</span>)
      }
      return (<span>N/A</span>)
    }
  },
  {
    id: "fiador",
    label: "Fiador",
    minWidth: 20,
    align: "left",
    component: (value: any) => {
      if (value.value) {
        return (<span>{value.value.name} {value.value.last_name}</span>)
      }
      return (<span>N/A</span>)
    }
  },
]

const useStyles = makeStyles(theme => ({
  printButtonContainer: {
    textAlign: "right",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  rangleTitle: {
    lineHeight: 3,
    fontWeight: 'bold'
  },
  filtersContainer: {
    marginBottom: 10
  },
  subtitleRow: {
    textAlign: 'center',
  }
}));

type FormData = {
  share: string;
  father_share : string;
  status: string;
  payment_method_id: string;
  persona: string;
  titular: string;
  facturador: string;
  fiador: string;
  share_type: string;
};


export default function SharesReport() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list: shareList, pagination, loading, reportLoading } = useSelector((state: any) => state.shareReducer);
  const { listData: shareMovementList, loading: shareMovementLoading } = useSelector((state: any) => state.shareMovementReducer);
  const { list: paymentMethodList } = useSelector((state: any) => state.paymentMethodReducer);
  const {
    handleSubmit,
    register,
    errors,
    getValues,
    watch,
    reset
  } = useForm<FormData>();

  useEffect(() => {
    dispatch(getList())
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetShare());
      reset();
    };
  }, [reset, dispatch]);

  const handleForm = async (form: FormData) => {
    dispatch(filter(form));
  };

  const handleChangePage = (newPage: number) => {
    const form = getValues();
    const page = pagination.currentPage === 1 ? 2 : newPage;
    dispatch(filter(form, page, pagination.perPage))
  };

  const handlePerPage = (page: number, perPage: number) => {
    const form = getValues();
    dispatch(filter(form, page, perPage))
  }

  const getReport = () => {
    const form = getValues();
    dispatch(filterReport(form))
  }
  const renderShareMovements = (rows: object) => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.subtitleRow}>
        <Chip label="Movimientos" color="primary" variant="outlined"/>
          </Grid>
        <Grid item xs={12}><SimpleTable
          rows={rows}
          columns={shareMovementColumns}
          loading={shareMovementLoading}
          fontSize="10px"
        /></Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className={classes.form}
      >
        <Grid item xs={12} >
          <Grid container spacing={3} direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item xs={6}> Reporte de Acciones</Grid>
            <Grid item xs={6} className={classes.printButtonContainer} >
              <LoadingButton
                Icon={PrintIcon}
                loading={reportLoading}
                handleClick={() => getReport()}
              /></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} >
          <Grid container spacing={3} direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.filtersContainer}
          >
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Accion"
                field="share"
                register={register}
                errorsField={errors.share}
                errorsMessageField={
                  errors.share && errors.share.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Accion Padre"
                field="father_share"
                register={register}
                errorsField={errors.father_share }
                errorsMessageField={
                  errors.father_share  && errors.father_share .message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomSelect
                label="Status"
                selectionMessage="Seleccione"
                field="status"
                register={register}
                errorsMessageField={
                  errors.status && errors.status.message
                }
              >
                <option value={1}> Activo </option>
                <option value={0}> Inactivo </option>
              </CustomSelect>
            </Grid>
            <Grid item xs={3}>
              <CustomSelect
                label="Metodo de Pago"
                selectionMessage="Seleccione"
                field="payment_method_id"
                register={register}
                errorsMessageField={
                  errors.payment_method_id && errors.payment_method_id.message
                }
              >
                {paymentMethodList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Socio"
                field="persona"
                register={register}
                errorsField={errors.persona}
                errorsMessageField={
                  errors.persona && errors.persona.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Titular"
                field="titular"
                register={register}
                errorsField={errors.titular}
                errorsMessageField={
                  errors.titular && errors.titular.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Facturacion"
                field="facturador"
                register={register}
                errorsField={errors.facturador}
                errorsMessageField={
                  errors.facturador && errors.facturador.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField
                placeholder="Fiador"
                field="fiador"
                register={register}
                errorsField={errors.fiador}
                errorsMessageField={
                  errors.fiador && errors.fiador.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit">
                Buscar
          </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DataTable4
              rows={shareList}
              pagination={pagination}
              columns={columns}
              loading={loading}
              onChangePage={handleChangePage}
              onChangePerPage={handlePerPage}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
