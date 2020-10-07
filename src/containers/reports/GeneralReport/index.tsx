import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import Chip from "@material-ui/core/Chip";

import { getAll, filter, filterReport, clearPersons } from "../../../actions/personActions";
import PersonColumn from '../../../interfaces/PersonColumn';
import DataTable4 from "../../../components/DataTable4";
import PrintIcon from "@material-ui/icons/Print";
import LoadingButton from "../../../components/FormElements/LoadingButton";
import CustomTextField from '../../../components/FormElements/CustomTextField'
import CustomSelect from "../../../components/FormElements/CustomSelect";
import RangePicker from "../../../components/FormElements/RangePicker";
import RangeAge from "../../../components/FormElements/RangeAge";
import { getAll as getProfessions } from "../../../actions/professionActions";
import { getAll as getSports} from "../../../actions/sportActions";

const columns: PersonColumn[] = [
  {
    id: "id",
    label: "Id", minWidth: 10,
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "shares",
    label: "Accion",
    minWidth: 10,
    align: "right",
    component: (value: any) => value.value ?
      value.value.map((e: any, i: number) =>
        (<div >
          <Chip
            label={e.share_number}
            style={{
              fontSize: "10px",
              marginTop: 2,
              paddingBottom: 2,
            }}
            size="small"
            color="primary"
          />
          <br />
        </div>)
      )
      : '',
  },
  {
    id: "relationship",
    label: "Parentesco",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value ? value.value.relation_type.description : ''}</span>,
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "rif_ci",
    label: "Cedula",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "passport",
    label: "Pasaporte",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "card_number",
    label: "N Carnet",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "telephone1",
    label: "Telf",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "phone_mobile1",
    label: "Cel",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  // {
  //   id: "birth_date",
  //   label: "Edad",
  //   minWidth: 10,
  //   align: "right",
  //   component: (value: any) => <span>{moment(value.value, "YYYY/MM/DD").fromNow().split(" ")[0]}</span>,
  // },
  {
    id: "primary_email",
    label: "Correo",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "gender",
    label: "Sexo",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value.description}</span>,
  },
  {
    id: "status_person",
    label: "Status",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value.description}</span>,
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
  }
}));

type FormData = {
  name: string;
  rif_ci: string;
  card_number: string;
  passport: string;
  expiration_date: string;
  type_person: string;
  birth_date: string;
  gender_id: string;
  status_person_id: string;
  primary_email: string;
  telephone1: string;
  phone_mobile1: string;
  relation_type_id: string;
  expiration_start: string;
  expiration_end: string;
  birth_start: string;
  birth_end: string;
  age_start: string;
  age_end: string;
  profession_id: string;
  sport_id: string;
  isPartner: string;
};


export default function GeneralReport() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { persons, pagination, loading } = useSelector((state: any) => state.personReducer);
  const {
    handleSubmit,
    register,
    errors,
    getValues,
    watch,
    reset
  } = useForm<FormData>();

  const { list: statusPersonList } = useSelector(
    (state: any) => state.statusPersonReducer
  );

  const { list: genderList } = useSelector((state: any) => state.genderReducer);
  const { sports } = useSelector((state: any) => state.sportReducer);
  const { professions } = useSelector((state: any) => state.professionReducer);
  const { list: relationTypeList } = useSelector((state: any) => state.relationTypeReducer);

  useEffect(() => {
    dispatch(getProfessions());
    dispatch(getSports());
  },[dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearPersons());
      reset();
    };
  }, [reset, dispatch]);

  const handleForm = async (form: FormData) => {
    dispatch(filter(form))
  };

  const handleChangePage = (newPage: number) => {
    const form = getValues();
    const page = pagination.currentPage === 1 ? 2 : newPage;
    dispatch(filter(form,page, pagination.perPage))
  };

  const handlePerPage = (page: number, perPage: number) => {
    const form = getValues();
    dispatch(filter(form,page, perPage))
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
            <Grid item xs={6}> Reporte General</Grid>
            <Grid item xs={6} className={classes.printButtonContainer} >
              <LoadingButton
                Icon={PrintIcon}
                loading={loading}
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
          <Grid item xs={2}>
              <CustomSelect
                label="Condicion"
                selectionMessage="Seleccione Tipo"
                field="isPartner"
                register={register}
                errorsMessageField={
                  errors.isPartner && errors.isPartner.message
                }
              >
                <option value={1}> Socios </option>
                <option value={2}> Familiares </option>
                <option value={3}> Invitados </option>
              </CustomSelect>
            </Grid>

            <Grid item xs={2}>
              <CustomTextField
                placeholder="Nombre/Apellido"
                field="name"
                register={register}
                errorsField={errors.name}
                errorsMessageField={
                  errors.name && errors.name.message
                }
                Icon={SearchIcon}
              />
            </Grid>

            <Grid item xs={2}>
              <CustomTextField
                placeholder="Cedula"
                field="rif_ci"
                register={register}
                errorsField={errors.rif_ci}
                errorsMessageField={
                  errors.rif_ci && errors.rif_ci.message
                }
                Icon={SearchIcon}
              />
            </Grid>

            <Grid item xs={2}>
              <CustomTextField
                placeholder="Pasaporte"
                field="passport"
                register={register}
                errorsField={errors.passport}
                errorsMessageField={
                  errors.passport && errors.passport.message
                }
                Icon={SearchIcon}
              />
            </Grid>

            <Grid item xs={2}>
              <CustomTextField
                placeholder="N Carnet"
                field="card_number"
                register={register}
                errorsField={errors.card_number}
                errorsMessageField={
                  errors.card_number && errors.card_number.message
                }
                Icon={SearchIcon}
              />
            </Grid>
            <Grid item xs={4}>
              <RangePicker
                label="Vencimiento"
                startField="expiration_start"
                endField="expiration_end"
                register={register}
                watch={watch}
                startMsgErr={errors.expiration_start && errors.expiration_start.message}
                endMsgErr={errors.expiration_end && errors.expiration_end.message}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Tipo"
                selectionMessage="Seleccione Tipo"
                field="type_person"
                register={register}
                errorsMessageField={
                  errors.type_person && errors.type_person.message
                }
              >
                <option value={1}> Natural </option>
                <option value={2}> Empresa </option>
              </CustomSelect>
            </Grid>
            <Grid item xs={4}>
              <RangePicker
                label="Nacimiento"
                startField="birth_start"
                endField="birth_end"
                register={register}
                watch={watch}
                startMsgErr={errors.birth_start && errors.birth_start.message}
                endMsgErr={errors.birth_end && errors.birth_end.message}
              />
            </Grid>
            <Grid item xs={4}>
            <RangeAge
                label="Edad"
                startField="age_start"
                endField="age_end"
                register={register}
                watch={watch}
                startMsgErr={errors.age_start && errors.age_start.message}
                endMsgErr={errors.age_end && errors.age_end.message}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Sexo"
                field="gender_id"
                register={register}
                errorsMessageField={errors.gender_id && errors.gender_id.message}
                selectionMessage="Seleccione"
              >
                {genderList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Estatus"
                selectionMessage="Seleccione Estatus"
                field="status_person_id"
                register={register}
                errorsMessageField={
                  errors.status_person_id && errors.status_person_id.message
                }
              >
                {statusPersonList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                placeholder="Correo"
                field="primary_email"
                register={register}
                errorsField={errors.primary_email}
                errorsMessageField={
                  errors.primary_email && errors.primary_email.message
                }
                inputType="email"
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                placeholder="Telefono 1"
                field="telephone1"
                register={register}
                errorsField={errors.telephone1}
                errorsMessageField={errors.telephone1 && errors.telephone1.message}
                inputType="number"
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                placeholder="Celular"
                field="phone_mobile1"
                register={register}
                errorsField={errors.phone_mobile1}
                errorsMessageField={
                  errors.phone_mobile1 && errors.phone_mobile1.message
                }
                inputType="number"
              />
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Parentesco"
                field="relation_type_id"
                register={register}
                errorsMessageField={errors.relation_type_id && errors.relation_type_id.message}
                selectionMessage="Seleccione"
              >
                {relationTypeList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Profesion"
                selectionMessage="Seleccione"
                field="profession_id"
                register={register}
                errorsMessageField={
                  errors.profession_id && errors.profession_id.message
                }
              >
               {professions.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={2}>
              <CustomSelect
                label="Deportes"
                selectionMessage="Seleccione"
                field="sport_id"
                register={register}
                errorsMessageField={
                  errors.sport_id && errors.sport_id.message
                }
              >
               {sports.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit">
                Buscar
          </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DataTable4
              rows={persons}
              pagination={pagination}
              columns={columns}
              loading={loading}
              onChangePage={handleChangePage}
              onChangePerPage={handlePerPage}
              fontSize="12px"
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
