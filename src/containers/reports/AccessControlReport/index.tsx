import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import CustomTextField from '../../../components/FormElements/CustomTextField'

import { filter, filterReport } from "../../../actions/accessControlActions";
import AccessControlColumns from '../../../interfaces/AccessControlColumns';
import DataTable4 from "../../../components/DataTable4";
import PrintIcon from "@material-ui/icons/Print";
import LoadingButton from "../../../components/FormElements/LoadingButton";
import CustomSelect from "../../../components/FormElements/CustomSelect";
import RangePicker from "../../../components/FormElements/RangePicker";
import { getList as getLocationList } from '../../../actions/locationActions';

const columns: AccessControlColumns[] = [
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
    id: "location",
    label: "Ubicacion",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "share",
    label: "Accion",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.share_number}</span>
  },
  {
    id: "person",
    label: "CI",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.rif_ci}</span>
  },
  {
    id: "person",
    label: "Carnet",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.card_number}</span>
  },
  {
    id: "person",
    label: "Nombre",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.name} {value.value.last_name}</span>
  },
  {
    id: "status",
    label: "Status",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "guest",
    label: "Invitado",
    minWidth: 10,
    align: "left",
    component: (value: any) => {
      if(value.value) {
        return (
          <div>
            <div><span>{value.value.name} {value.value.last_name}</span></div>
            <div><span>CI: {value.value.rif_ci}</span></div>
          </div>
        )
      }
      return '-';
    }
  },
];

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
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
  },
  personSearchTitle: {
    lineHeight: 4
  }
}));

type FormData = {
  share: string;
  created: string;
  status: string;
  location_id: string;
  partner_name: string;
  partner_rif_ci: string;
  partner_card_number: string;
  guest_name: string;
  guest_rif_ci: string;
  created_start: string;
  created_end: string;
  created_order: string;
};


export default function AccessControlReport() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list: shareList, pagination, loading, reportLoading } = useSelector((state: any) => state.accessControlReducer);
  const { listData: locationList } = useSelector((state: any) => state.locationReducer);
  const {
    handleSubmit,
    register,
    errors,
    getValues,
    watch
  } = useForm<FormData>();

  useEffect(() => {
    dispatch(getLocationList());
  },[dispatch])

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
            <Grid item xs={6} className={classes.title}> Reporte de Control de Accesso</Grid>
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
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={1} className={classes.personSearchTitle}>Socio</Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    placeholder="Nombre"
                    field="partner_name"
                    register={register}
                    errorsField={errors.partner_name}
                    errorsMessageField={
                      errors.partner_name && errors.partner_name.message
                    }
                    Icon={SearchIcon}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    placeholder="Cedula"
                    field="partner_rif_ci"
                    register={register}
                    errorsField={errors.partner_rif_ci}
                    errorsMessageField={
                      errors.partner_rif_ci && errors.partner_rif_ci.message
                    }
                    Icon={SearchIcon}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    placeholder="Carnet"
                    field="partner_card_number"
                    register={register}
                    errorsField={errors.partner_card_number}
                    errorsMessageField={
                      errors.partner_card_number && errors.partner_card_number.message
                    }
                    Icon={SearchIcon}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={1} className={classes.personSearchTitle}>Invitado</Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    placeholder="Nombre"
                    field="guest_name"
                    register={register}
                    errorsField={errors.guest_name}
                    errorsMessageField={
                      errors.guest_name && errors.guest_name.message
                    }
                    Icon={SearchIcon}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    placeholder="Cedula"
                    field="guest_rif_ci"
                    register={register}
                    errorsField={errors.guest_rif_ci}
                    errorsMessageField={
                      errors.guest_rif_ci && errors.guest_rif_ci.message
                    }
                    Icon={SearchIcon}
                  />
                </Grid>
              </Grid>
            </Grid>
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
              <CustomSelect
                label="Ubicacion"
                selectionMessage="Seleccione"
                field="location_id"
                register={register}
                errorsMessageField={
                  errors.location_id && errors.location_id.message
                }
              >
                {locationList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
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
                <option value={1}> OK </option>
              </CustomSelect>
            </Grid>
            <Grid item xs={3}>
              <CustomSelect
                label="Orden Fecha"
                selectionMessage="Seleccione"
                field="created_order"
                register={register}
                errorsMessageField={
                  errors.created_order && errors.created_order.message
                }
              >
                <option value="asc"> ASC </option>
                <option value="desc"> DESC </option>
              </CustomSelect>
            </Grid>
            <Grid item xs={4}>
              <RangePicker
                label="Fecha"
                startField="created_start"
                endField="created_end"
                register={register}
                watch={watch}
                startMsgErr={errors.created_start && errors.created_start.message}
                endMsgErr={errors.created_end && errors.created_end.message}
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
