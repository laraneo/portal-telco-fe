import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Theme,
  useTheme,
  withStyles
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PrintIcon from "@material-ui/icons/Print";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import _ from "lodash";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import moment from 'moment';

import CustomSelect from "../FormElements/CustomSelect";
import CustomTextField from "../FormElements/CustomTextField";
import {
  update,
  create,
  get,
  searchPersonToAssignFamily,
  searchFamilyByPerson,
  removeRelation,
  getReportsByPartner,
  updateRelation,
  getLockersByLocation,
  getLockersByPartner,
  clearPersonLockersByLocation,
  clear
} from "../../actions/personActions";

import { getByLocation, clearList } from "../../actions/lockerActions";
import {
  getAll as getCardPerson,
  remove as removeCardPerson
} from "../../actions/cardPersonActions";
import {
  getSharesByPartner,
  get as getShare,
  reset as resetShare
} from "../../actions/shareActions";
import { updateModal } from "../../actions/secondModalActions";
import TransferList from "../TransferList";
import CardPersonColumns from "../../interfaces/CardPersonColumns";
import FamilyPersonColumns from "../../interfaces/FamilyPersonColumns";
import RecordColumns from "../../interfaces/RecordColumns";
import NoteColumns from "../../interfaces/NoteColumns";
import DataTable2 from "../DataTable2";
import DataTable3 from "../DataTable3";
import DataTable4 from "../DataTable4";
import LoadingButton from "../FormElements/LoadingButton";
import CardPersonForm from "../CardPersonForm";
import Loader from "../common/Loader";
import {
  getRecordsByPerson,
} from "../../actions/recordActions";
import {
  getNotesByPerson,
} from "../../actions/noteActions";
import { getLastMovement, updateLastMovement } from "../../actions/shareMovementActions";
import SearchAutoComplete from "../SearchAutoComplete";

import FamilyForm from "../FamilyForm";
import Helper from '../../helpers/utilities';

const formatCreditCard = (card: string) => card.replace(/.(?=.{4})/g, 'x');

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)"
  }
})(MuiExpansionPanelSummary);
const cardPersonColumns: CardPersonColumns[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 5,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "ci",
    label: "Cedula",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "card_number",
    label: "Numero",
    minWidth: 15,
    align: "left",
    component: (value: any) => <span>{formatCreditCard(value.value)}</span>
  },
  {
    id: "sec_code",
    label: "CVC",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.replace(/[0-9]/g, "x")}</span>
  },
  {
    id: "expiration_date",
    label: "Vence",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "card",
    label: "Tipo",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "bank",
    label: "Banco",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "orderDetail",
    label: "Orden",
    minWidth: 10,
    align: "left",
    component: (value: any) => (
      <Chip
        label={value.value}
        style={{
          fontSize: "10px"
        }}
        size="small"
        color="primary"
      />
    )
  }
];

const FamilysColumns: FamilyPersonColumns[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "rif_ci",
    label: "RIF/CI",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "description",
    label: "Parentesco",
    minWidth: 30,
    align: "right",
    component: (value: any) => (<Chip
      label={value.value}
      style={{
        backgroundColor: "#f1c40f",
        color: "white",
        fontWeight: "bold",
        fontSize: "10px"
      }}
      size="small"
    />
    )
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "status",
    label: "",
    minWidth: 30,
    align: "right",
    component: (value: any) => (
      <Chip
        label={value.value === "1" ? "Activo" : "Inactivo"}
        style={{
          backgroundColor: value.value == "1" ? "#2ecc71" : "#e74c3c",
          color: "white",
          fontWeight: "bold",
          fontSize: "10px"
        }}
        size="small"
      />
    )
  }
];

const recordColumns: RecordColumns[] = [
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
    id: "description",
    label: "Descripcion",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "type",
    label: "Motivo",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "blocked",
    label: "Bloqueado",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value === 1 ? "SI" : "NO"}</span>
  }
];

function getParsePerson(data: any, classes: any) {
  const {
    name,
    last_name,
    telephone1,
    rif_ci,
    address,
    primary_email,
    type_person
  } = data;
  return (
    <Grid container spacing={1} className={classes.parsedPersonContainer}>
      <Grid item xs={4} className={classes.parsedPersonContainerTitle}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Tipo Persona:</strong>
          {type_person == 1 ? "Natural" : "Empresa"}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Cedula/RIF:</strong> {rif_ci}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Nombre:</strong> {name} {last_name}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Direccion:</strong> {address}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Telefono:</strong> {telephone1}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Correo:</strong> {primary_email}
        </Paper>
      </Grid>
    </Grid>
  );
}

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
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  personContent: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    textAlign: "center"
  },
  actionButtonContainer: {
    margin: theme.spacing(1),
    position: "relative",
    textAlign: "right"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "10%"
  },
  select: {
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px",
    "&:focus": {
      outline: 0
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  pictureContainer: {
    maxWidth: 185
  },
  media: {
    height: 200
  },
  formContainer: {
    maxWidth: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  swipeableViewsContainer: {
  },
  reportButtonContainer: {
    textAlign: "right"
  },
  profileName: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#3f51b5",
    fontSize: "20px"
  },
  profileSubTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#c0392b",
    fontSize: "18px"
  },
  profileShareTitle: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#3f51b5",
    fontSize: "16px"
  },
  profileMovement: {
    textAlign: "left",
    fontSize: "14px"
  },
  cardPersonButtonContainer: {
    textAlign: "right"
  },
  cardPersonButton: {
    width: "15%",
    fontSize: "12px"
  },
  parsedPersonContainer: {
    fontSize: "12px"
  },
  parsedPersonContainerDetail: {
    textAlign: "left",
    padding: "4px"
  },
  personLockersTitle: {
    color: "#3f51b5",
    fontWeight: "bold"
  },
  personRecordTitle: {
    textAlign: "right"
  },
  transferListContainer: {
    textAlign: 'center',
    justifyContent: 'center !important'
  }
}));

type FormData = {
  name: string;
  last_name: string;
  name2: string;
  last_name2: string;
  rif_ci: string;
  primary_email: string;
  secondary_email: string;
  passport: string;
  card_number: string;
  birth_date: Date;
  expiration_date: Date;
  gender_id: number;
  representante: string;
  picture: string;
  id_card_picture: string;
  address: string;
  telephone1: string;
  telephone2: string;
  phone_mobile1: string;
  phone_mobile2: string;
  fax: string;
  city: string;
  state: string;
  type_person: number;
  postal_code: string;
  status_person_id: number;
  marital_statuses_id: number;
  countries_id: number;
  profession_list: any;
  share_list: number;
  person: string;
  payment_method_id: number;
  card_people1: number;
  card_people2: number;
  card_people3: number;
  country_list: any;
  sport_list: any;
  locker_list: any;
  locker_location_id: string;
  branch_company_id: number,
  company: string;
};

type PersonFormProps = {
  id?: number;
};

interface Item {
  id: number;
  description: string;
}

interface SelectedItems {
  itemsToAdd: Array<string | number>;
  itemsToRemove: Array<string | number>;
}

const initialSelectedItems = {
  itemsToAdd: [],
  itemsToRemove: []
};

const PersonForm: FunctionComponent<PersonFormProps> = ({ id }) => {
  /* States */
  const [tempPersonId, setTempPersonId] = useState(0);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageField, setImageField] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [selectedProff, setSelectedProff] = useState<any>(null);
  const [isFamily, setIsFamily] = useState<boolean>(false);
  const [selectedCountries, setSelectedCountries] = useState<
    Array<string | number>
  >([]);
  const [ relation, setRelation ] = useState<string>("") 
  const [selectedSports, setSelectedSports] = useState<Array<string | number>>(
    []
  );
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  /* Form */

  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues,
  } = useForm<FormData>();
  const { picture, name, last_name } = getValues();

  /* Redux */
  const dispatch = useDispatch();

  const {
    loading,
    relationLoading,
    reportByPartnerLoading,
    familyByPerson,
    personLockersLoading,
    personLockers,
  } = useSelector((state: any) => state.personReducer);
  const { list: statusPersonList } = useSelector(
    (state: any) => state.statusPersonReducer
  );

  const { list: maritalStatusList } = useSelector(
    (state: any) => state.maritalStatusReducer
  );
  const { countries: countryList } = useSelector(
    (state: any) => state.countryReducer
  );
  const { list: genderList } = useSelector((state: any) => state.genderReducer);

  const { sports: sportList } = useSelector((state: any) => state.sportReducer);

  const { listData: parameterList } = useSelector((state: any) => state.parameterReducer);

  const { professions: professionList } = useSelector(
    (state: any) => state.professionReducer
  );

  const { sharesByPartner, selectedShare } = useSelector(
    (state: any) => state.shareReducer
  );
  const { loading: cardPersonLoading } = useSelector(
    (state: any) => state.cardPersonReducer
  );
  const { listData: branchCompanyList } = useSelector(
    (state: any) => state.branchCompanyReducer
  );

  const { user, userRoles } = useSelector(
    (state: any) => state.loginReducer
  );

  const { lastMovement, lastMovementLoading } = useSelector(
    (state: any) => state.shareMovementReducer
  );


  const {
    recordsByPerson,
    loading: recordsByPersonLoading,
    pagination: recordPagination
  } = useSelector((state: any) => state.recordReducer);



  const disableTabs = tempPersonId > 0 ? false : true;
  let hideTabs = false;
  if (Helper.getRole(userRoles, 'socio')) {
    hideTabs = true;
  }

  /* Styles */

  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, tabValue: number) => {
    setTabValue(tabValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const handleExpandedPanel = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setSelectedProff([]);
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        dispatch(searchFamilyByPerson(id));
        dispatch(getCardPerson(id));
        dispatch(getLockersByPartner(id));
        dispatch(getRecordsByPerson({ id }));
        // dispatch(getNotesByPerson({ id }));
        const {
          name,
          last_name,
          name2,
          last_name2,
          rif_ci,
          primary_email,
          secondary_email,
          passport,
          card_number,
          birth_date,
          expiration_date,
          gender_id,
          representante,
          picture,
          id_card_picture,
          address,
          telephone1,
          telephone2,
          phone_mobile1,
          phone_mobile2,
          fax,
          city,
          state,
          type_person,
          postal_code,
          status_person_id,
          marital_statuses_id,
          countries_id,
          professions,
          countries,
          sports,
          lockers,
          isPartner,
          company_person,
          relation,
          branch_company_id,
          company
        } = response;
        if (isPartner === "1") {
          const shareResponse: any = await dispatch(getSharesByPartner(id));
          if (shareResponse.length > 0) {
            const currentShare = shareResponse.find((e: any, i: any) => i === 0);
            setValue("payment_method_id", currentShare.payment_method_id);
          }
        }
        setValue("name", name);
        setValue("last_name", last_name);
        setValue("name2", name2);
        setValue("last_name2", last_name2);
        setValue("rif_ci", rif_ci);
        setValue("primary_email", primary_email);
        setValue("secondary_email", secondary_email);
        setValue("passport", passport);
        setValue("card_number", card_number);
        setValue("birth_date", birth_date);
        setValue("expiration_date", expiration_date);
        setValue("gender_id", gender_id);
        setValue("representante", representante);
        setValue("picture", picture);
        setValue("id_card_picture", id_card_picture);
        setValue("address", address);
        setValue("telephone1", telephone1);
        setValue("telephone2", telephone2);
        setValue("phone_mobile1", phone_mobile1);
        setValue("phone_mobile2", phone_mobile2);
        setValue("fax", fax);
        setValue("city", city);
        setValue("state", state);
        setValue("postal_code", postal_code);
        setValue("type_person", type_person);
        setValue("status_person_id", status_person_id);
        setValue("marital_statuses_id", marital_statuses_id);
        setValue("countries_id", countries_id);
        setValue("branch_company_id", branch_company_id);
        setValue("company", company);
        setImage({ ...image, preview: picture });
        setRelation(relation);
        if (company_person) {
          setSelectedCompany(company_person);
        }
        if (isPartner === "2") {
          setIsFamily(true);
        } else {
          setIsFamily(false);
        }
        if (countries.length > 0) {
          const list = countries.map((element: any) => element.id);
          setValue("country_list", JSON.stringify(list));
          setSelectedCountries(countries);
        } else {
          setSelectedCountries([]);
        }
        if (sports.length > 0) {
          const list = sports.map((element: any) => element.id);
          setValue("sport_list", JSON.stringify(list));
          setSelectedSports(sports);
        } else {
          setSelectedSports([]);
        }
        if (professions) {
          const list = professions.map((element: any) => element.id);
          setValue("profession_list", JSON.stringify(list));
          setSelectedProff(professions);
        } else {
          setSelectedProff([]);
        }
        // if (lockers.length > 0) {
        //   const list = lockers.map((element: any) => element.id);
        //   setValue("locker_list", JSON.stringify(list));
        //   setSelectedLockers(lockers);
        // }
        setTempPersonId(id);
      }
    }
    fetch();
  }, [id, dispatch, setValue, user, setRelation]);


  useEffect(() => {
    if (!_.isEmpty(sharesByPartner)) {
      const share: any = _.first(sharesByPartner);
      dispatch(getLastMovement(share.share_number));
    }
  }, [dispatch, sharesByPartner]);

  useEffect(() => {
    return () => {
      reset();
      dispatch(resetShare());
      dispatch(clear());
      dispatch(clearPersonLockersByLocation());
      dispatch(clearList());
    };
  }, [reset, dispatch]);

  const handleForm = async (form: object) => {
    const data = {
      lockers: initialSelectedItems,
      id_card_picture: null,
      user: user.username,
      date: moment().format('YYYY-MM-DD'),
    };
    if (tempPersonId > 0) {
      await dispatch(update({ id: tempPersonId, ...form, ...data }));
      dispatch(getLockersByPartner(tempPersonId));
      dispatch(searchFamilyByPerson(tempPersonId));
    } else {
      const response: any = await dispatch(
        create({ ...form, id_card_picture: null })
      );
      setTempPersonId(response.id);
      dispatch(searchPersonToAssignFamily(response.id));
    }
  };

  const triggerClick = (input: any) => {
    if (input) {
      setImageField(input);
    }
  };

  const handleImage = () => {
    imageField.click();
    setImageField(imageField);
  };

  const loadImage = (e: any) => {
    const ObjecUrlImage = window.URL.createObjectURL(e.target.files[0]);
    setImage({
      preview: ObjecUrlImage,
      raw: e.target.files[0]
    });
    const reader: any = new FileReader();
    reader.onload = () => {
      setValue("picture", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onProfessionsChange = (event: any) => {
    setValue("profession_list", JSON.stringify(event));
  };

  const onCountriesChange = (event: any) => {
    setValue("country_list", JSON.stringify(event));
  };

  const onSportsChange = (event: any) => {
    setValue("sport_list", JSON.stringify(event));
  };

  const handleReportByPartner = () => {
    dispatch(getReportsByPartner(id));
  };

  const handleShareSelect = (event: any) => {
    dispatch(getShare(event.target.value));
    const share: any = sharesByPartner.find((e: any) => e.id === event.target.value);
    if (share) {
      dispatch(getLastMovement(share.share_number));
    } else {
      dispatch(updateLastMovement());
    }
  };

  const handleRecordChangePage = (newPage: number) => {
    const page = recordPagination.currentPage === 1 ? 2 : newPage;
    // dispatch(getAll(page, recordPagination.perPage))
  };

  const handleFamilyCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <FamilyForm id={id} />
        }
      })
    );
  };

  const handleRecordPerPage = (page: number, perPage: number) => {
    // dispatch(getAll(page, perPage))
  };

  const renderMainData = () => {
    const { expiration_date, card_number } = getValues();
    const promotor = userRoles.length > 0 && userRoles.find((e: any) => e.slug === 'promotor');
    let disableField = false;
    if (!_.isEmpty(promotor)) {
      disableField = true;
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomSelect
            label="Tipo Persona"
            selectionMessage="Seleccione"
            field="type_person"
            register={register}
            errorsMessageField={
              errors.type_person && errors.type_person.message
            }
            disabled
          >
            <option value={1}> Natural </option>
            <option value={2}> Empresa </option>
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Cedula / Rif"
            field="rif_ci"
            required
            register={register}
            errorsField={errors.rif_ci}
            errorsMessageField={errors.rif_ci && errors.rif_ci.message}
            disable
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Estatus"
            selectionMessage="Seleccione"
            field="status_person_id"
            register={register}
            errorsMessageField={
              errors.status_person_id && errors.status_person_id.message
            }
            disabled
          >
            {statusPersonList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Nombre"
            field="name"
            required
            register={register}
            errorsField={errors.name}
            errorsMessageField={errors.name && errors.name.message}
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Segundo Nombre"
            field="name2"
            register={register}
            errorsField={errors.name2}
            errorsMessageField={errors.name2 && errors.name2.message}
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Apellido"
            field="last_name"
            required
            register={register}
            errorsField={errors.last_name}
            errorsMessageField={errors.last_name && errors.last_name.message}
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Segundo Apellido"
            field="last_name2"
            register={register}
            errorsField={errors.last_name2}
            errorsMessageField={errors.last_name2 && errors.last_name2.message}
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Fecha de Nacimiento"
            field="birth_date"
            required
            register={register}
            errorsField={errors.birth_date}
            errorsMessageField={errors.birth_date && errors.birth_date.message}
            type="date"
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Pasaporte"
            field="passport"
            register={register}
            errorsField={errors.passport}
            errorsMessageField={errors.passport && errors.passport.message}
            disable={disableField}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Estado Civil"
            selectionMessage="Seleccione"
            field="marital_statuses_id"
            required
            register={register}
            errorsMessageField={
              errors.marital_statuses_id && errors.marital_statuses_id.message
            }
            disabled={disableField}
          >
            {maritalStatusList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Sexo"
            field="gender_id"
            required
            register={register}
            errorsMessageField={errors.gender_id && errors.gender_id.message}
            selectionMessage="Seleccione"
            disabled={disableField}
          >
            {genderList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3} style={{ lineHeight: 2.5 }}>
          <Paper className={classes.parsedPersonContainerDetail}>
            <strong>N° Carnet</strong> {card_number && card_number}
          </Paper>
          <input
            style={{ display: "none" }}
            name="card_number"
            ref={register}
          />
          {/* <CustomTextField
            placeholder="N° Carnet"
            field="card_number"
            register={register}
            errorsField={errors.card_number}
            errorsMessageField={
              errors.card_number && errors.card_number.message
            }
            inputType="number"
            disable={disableField}
          /> */}
        </Grid>
        <Grid item xs={3} style={{ lineHeight: 2.5 }}>
          <Paper className={classes.parsedPersonContainerDetail}>
            <strong>Vencimiento</strong> {expiration_date && moment(expiration_date).format('DD-MM-YYYY')}
          </Paper>
          <input
            style={{ display: "none" }}
            name="expiration_date"
            ref={register}
          />
          {/* <CustomTextField
            placeholder="Fecha de Vencimiento"
            field="expiration_date"
            register={register}
            errorsField={errors.expiration_date}
            errorsMessageField={
              errors.expiration_date && errors.expiration_date.message
            }
            type="date"
            disable
          /> */}
        </Grid>
      </Grid>
    );
  };

  const renderAddressData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <CustomTextField
                placeholder="Direccion"
                field="address"
                register={register}
                errorsField={errors.address}
                errorsMessageField={errors.address && errors.address.message}
                multiline
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Pais"
            selectionMessage="Seleccione"
            field="countries_id"
            register={register}
            errorsMessageField={
              errors.countries_id && errors.countries_id.message
            }
          >
            {countryList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Estado"
            field="state"
            register={register}
            errorsField={errors.state}
            errorsMessageField={errors.state && errors.state.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Ciudad"
            field="city"
            register={register}
            errorsField={errors.city}
            errorsMessageField={errors.city && errors.city.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Codigo Postal"
            field="postal_code"
            register={register}
            errorsField={errors.postal_code}
            errorsMessageField={
              errors.postal_code && errors.postal_code.message
            }
          />
        </Grid>
      </Grid>
    );
  };

  const renderContactsData = () => {
    const gridPartner = Helper.getRole(userRoles, 'socio') ? 12 : 6;
    return (
      <Grid container spacing={2}>
        <Grid item xs={gridPartner}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Correo Primario"
                field="primary_email"
                register={register}
                errorsField={errors.primary_email}
                errorsMessageField={
                  errors.primary_email && errors.primary_email.message
                }
                inputType="email"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Correo Secundario"
                field="secondary_email"
                register={register}
                errorsField={errors.secondary_email}
                errorsMessageField={
                  errors.secondary_email && errors.secondary_email.message
                }
                inputType="email"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Telefono 1"
                field="telephone1"
                register={register}
                errorsField={errors.telephone1}
                errorsMessageField={errors.telephone1 && errors.telephone1.message}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Telefono 2"
                field="telephone2"
                register={register}
                errorsField={errors.telephone2}
                errorsMessageField={errors.telephone2 && errors.telephone2.message}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Celular 1"
                field="phone_mobile1"
                register={register}
                errorsField={errors.phone_mobile1}
                errorsMessageField={
                  errors.phone_mobile1 && errors.phone_mobile1.message
                }
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Celular 2"
                field="phone_mobile2"
                register={register}
                errorsField={errors.phone_mobile2}
                errorsMessageField={
                  errors.phone_mobile2 && errors.phone_mobile2.message
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={gridPartner} style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Grid
            container spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
          { Helper.getRole(userRoles, 'promotor') &&
            (
              <Grid item xs={6}>
              <CustomTextField
                placeholder="Fax"
                field="fax"
                register={register}
                errorsField={errors.fax}
                errorsMessageField={errors.fax && errors.fax.message}
              />
            </Grid>
            )
          }
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderPaymentMethod = () => {
    const { share_number, tarjeta_primaria, tarjeta_secundaria, tarjeta_terciaria, payment_method } = selectedShare;
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Accion
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Forma de Pago
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Primaria
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Secundaria
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Terciaria
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {share_number}
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {payment_method && payment_method.description}
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {tarjeta_primaria && formatCreditCard(tarjeta_primaria.card_number)}
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {tarjeta_secundaria && formatCreditCard(tarjeta_secundaria.card_number)}
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {tarjeta_terciaria && formatCreditCard(tarjeta_terciaria.card_number)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderCardPersonData = () => {
    const {
      tarjeta_primaria,
      tarjeta_secundaria,
      tarjeta_terciaria
    } = selectedShare;
    const cardList = [];
    const dataList = [];

    if (tarjeta_primaria) {
      dataList.push({ ...tarjeta_primaria, orderDetail: "Primario", order: 1 });
      cardList.push({ ...tarjeta_primaria });
    }

    if (tarjeta_secundaria) {
      dataList.push({
        ...tarjeta_secundaria,
        orderDetail: "Secundario",
        order: 2
      });
      cardList.push({ ...tarjeta_secundaria });
    }

    if (tarjeta_terciaria) {
      dataList.push({
        ...tarjeta_terciaria,
        orderDetail: "Terciario",
        order: 3
      });
      cardList.push({ ...tarjeta_terciaria });
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className="card-person-data-table">
          <DataTable3
            data={dataList}
            columns={cardPersonColumns}
            loading={cardPersonLoading}
            fontSize="12px"
          />
        </Grid>
      </Grid>
    );
  };

  const renderRecords = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Expedientes
        </Grid>
        <Grid item xs={12}>
          <DataTable4
            rows={recordsByPerson}
            pagination={recordPagination}
            columns={recordColumns}
            loading={recordsByPersonLoading}
            onChangePage={handleRecordChangePage}
            onChangePerPage={handleRecordPerPage}
          />
        </Grid>
      </Grid>
    );
  };

  const renderWork = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomTextField
            placeholder="Cargo"
            field="representante"
            register={register}
            errorsField={errors.representante}
            errorsMessageField={
              errors.representante && errors.representante.message
            }
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            placeholder="Compañia"
            field="company"
            register={register}
            errorsField={errors.company}
            errorsMessageField={
              errors.company && errors.company.message
            }
          />
        </Grid>
        <Grid item xs={6}>
        <CustomSelect
            label="Ramo"
            selectionMessage="Seleccione"
            field="branch_company_id"
            register={register}
            errorsMessageField={
              errors.branch_company_id && errors.branch_company_id.message
            }
          >
            {branchCompanyList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        {
          selectedCompany && (
            <React.Fragment>
              <Grid item xs={12}>Actual Compania:</Grid>
              <Grid item xs={12}>{getParsePerson(selectedCompany, classes)}</Grid>
            </React.Fragment>
          )
        }
      </Grid>
    )
  }

  const getNacionalityLabel = (row: any) => row.citizenship;

  const renderShareProfile = () => {
    const promotor = userRoles.length > 0 && userRoles.find((e: any) => e.slug === 'promotor');
    const socio = userRoles.length > 0 && userRoles.find((e: any) => e.slug === 'socio');
    if (!_.isEmpty(promotor)) {
      return (
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.profileShareTitle}>Acciones</Grid>
          <div className="custom-select-container">
            <select
              name="relation"
              onChange={handleShareSelect}
              style={{ fontSize: "13px" }}
            >
              {sharesByPartner.map((item: any, i: number) => (
                <option value={item.id}>{item.share_number}</option>
              ))}
            </select>
          </div>
        </Grid>
      )
    }
    if (!_.isEmpty(socio)) {
      return (
        <Grid item xs={12} className={classes.profileMovement}>
          <Grid item xs={12} className={classes.profileShareTitle}>Accion N° {user.username}</Grid>
        </Grid>
      )
    }
  }

  const renderLastMovement = () => {
    if (lastMovementLoading) {
      return <Loader />
    }
    return !_.isEmpty(lastMovement) &&
      (
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.profileMovement}>{lastMovement.created}</Grid>
          <Grid item xs={12} className={classes.profileMovement}>{lastMovement.description}</Grid>
          <Grid item xs={12} className={classes.profileMovement}>{lastMovement.transaction.description}</Grid>
        </Grid>
      )
  }

  const rendeWork = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {/* <SearchAutoComplete
            label="Accion"
            options={shareToAssignList}
            loading={shareToAssignLoading}
            handleSearch={handleSearchShares}
            handleSelect={handleSelectShare}
            errorsField={errors.share_id}
            getOptionLabel={getOptionLabelShare}
            errorsMessageField={
              errors.share_id && errors.share_id.message
            }
          />
          <input
            style={{ display: "none" }}
            name="share_id"
            ref={register({
              required: true
            })}
          /> */}
        </Grid>
      </Grid>
    )
  }

  const renderName = () => {
    if(Helper.getRole(userRoles, 'socio')) {
      return relation;
    }
    if(Helper.getRole(userRoles, 'promotor')) {
      return isFamily ? 'Familiar' : 'Socio';
    }
  }

  let imagePreview = picture;
  if (image.preview) imagePreview = image.preview;
  return (
    <Container component="main" className={classes.formContainer}>
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card className={classes.pictureContainer}>
                    <CardActionArea onClick={() => handleImage()}>
                      <CardMedia
                        className={classes.media}
                        image={imagePreview}
                      />
                    </CardActionArea>
                  </Card>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="load_image"
                    accept="image/*"
                    ref={triggerClick}
                    onChange={loadImage}
                  />
                  <input
                    style={{ display: "none" }}
                    name="picture"
                    ref={register}
                  />
                </Grid>
                <Grid item xs={12} className={classes.profileName}>
                  {name} {last_name}
                </Grid>
                <Grid item xs={12} className={classes.profileSubTitle}>
                  {renderName()}
                </Grid>
                {renderShareProfile()}
                {renderLastMovement()}
              </Grid>
            </Grid>

            <Grid item xs={10}>
              <Grid container spacing={2}>
                <div className={classes.personContent}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label="Datos" />
                      <Tab label="Familiares" />
                      { !hideTabs && <Tab label="Pagos" disabled={disableTabs} /> }
                      { !hideTabs && <Tab label="Expedientes" disabled={disableTabs} /> }
                      { !hideTabs && <Tab label="Lockers" disabled={disableTabs} /> }
                    </Tabs>
                  </AppBar>
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={tabValue}
                    onChangeIndex={handleChangeIndex}
                    className={classes.swipeableViewsContainer}
                  >
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                      <div className={classes.root}>
                        <ExpansionPanel
                          expanded={expanded === "panel1"}
                          onChange={handleExpandedPanel("panel1")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Datos Principales
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderMainData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel2"}
                          onChange={handleExpandedPanel("panel2")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Direccion
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderAddressData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel3"}
                          onChange={handleExpandedPanel("panel3")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Contactos
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderContactsData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel4"}
                          onChange={handleExpandedPanel("panel4")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Profesiones
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={3} className={classes.transferListContainer}>
                              <Grid item xs={12}  >
                                {professionList.length > 0 && selectedProff && (
                                  <TransferList
                                    data={professionList}
                                    selectedData={selectedProff}
                                    leftTitle="Profesiones"
                                    onSelectedList={onProfessionsChange}
                                  />
                                )}
                                <input
                                  style={{ display: "none" }}
                                  name="profession_list"
                                  ref={register}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel5"}
                          onChange={handleExpandedPanel("panel5")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Nacionalidades
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={3} justify="flex-start" >
                              <Grid item xs={12}>
                                {countryList.length > 0 && (
                                  <TransferList
                                    data={countryList}
                                    selectedData={selectedCountries}
                                    leftTitle="Nacionalidades"
                                    onSelectedList={onCountriesChange}
                                    getLabel={getNacionalityLabel}
                                  />
                                )}
                                <input
                                  style={{ display: "none" }}
                                  name="country_list"
                                  ref={register}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel6"}
                          onChange={handleExpandedPanel("panel6")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Deportes
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={3} justify="flex-start" >
                              <Grid item xs={12}>
                                {sportList.length > 0 && (
                                  <TransferList
                                    data={sportList}
                                    selectedData={selectedSports}
                                    leftTitle="Deportes"
                                    onSelectedList={onSportsChange}
                                  />
                                )}
                                <input
                                  style={{ display: "none" }}
                                  name="sport_list"
                                  ref={register}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel7"}
                          onChange={handleExpandedPanel("panel7")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Trabajo
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderWork()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1} dir={theme.direction}>
                      <div className={classes.root}>
                        <Grid container spacing={3} style={{ marginBottom: 10 }}>
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={3}
                              direction="row"
                              justify="space-around"
                              alignItems="center"
                            >
                              <Grid item xs={6}>
                                Familiares
                              </Grid>
                              <Grid item xs={6}>
                                <Grid container direction="row"
                                  justify="flex-end" spacing={3}>
                                  {
                                    Helper.checkParameter(parameterList, "PARTNER_ALLOW_ADD") && (
                                      <Grid
                                        item
                                        xs={2}
                                        onClick={() => handleFamilyCreate()}
                                        style={{ textAlign: 'right' }}
                                      >
                                        <Fab size="small" color="primary" aria-label="add">
                                          <AddIcon />
                                        </Fab>
                                      </Grid>
                                    )
                                  }
                                  <Grid
                                    item
                                    xs={2}
                                    onClick={() => handleReportByPartner()}
                                    style={{ textAlign: 'right' }}
                                  >
                                    <div>
                                      <Fab size="small" color="primary" aria-label="report">
                                        <PrintIcon />
                                      </Fab>
                                    </div>
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>
                          </Grid>
                        </Grid>
                        <ExpansionPanel
                          expanded={expanded === "panel-familiars"}
                          onChange={handleExpandedPanel("panel-familiars")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-familiarsa-content"
                            id="panel-familiarsa-header"
                          >
                            <Typography className={classes.heading}>
                              Familiares Asignados
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <DataTable2
                                  data={familyByPerson}
                                  columns={FamilysColumns}
                                  loading={relationLoading}
                                  fontSize="12px"
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2} dir={theme.direction}>
                      {!_.isEmpty(selectedShare) && (
                        <div className={classes.root}>
                          <ExpansionPanel
                            expanded={expanded === "panel-invoice-person"}
                            onChange={handleExpandedPanel(
                              "panel-invoice-person"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-invoice-person-content"
                              id="panel-invoice-person-header"
                            >
                              <Typography className={classes.heading}>
                                Facturar a nombre de
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {selectedShare.facturador && getParsePerson(
                                selectedShare.facturador,
                                classes
                              )}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-titular-persona"}
                            onChange={handleExpandedPanel(
                              "panel-titular-persona"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-titular-persona-content"
                              id="panel-titular-persona-header"
                            >
                              <Typography className={classes.heading}>
                                Titular
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {selectedShare.titular && getParsePerson(selectedShare.titular, classes)}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-fiador-persona"}
                            onChange={handleExpandedPanel(
                              "panel-fiador-persona"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-fiador-persona-content"
                              id="panel-fiador-persona-header"
                            >
                              <Typography className={classes.heading}>
                                Fiador
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {selectedShare.fiador && getParsePerson(selectedShare.fiador, classes)}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-credit-card"}
                            onChange={handleExpandedPanel("panel-credit-card")}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-credit-card-content"
                              id="panel-credit-card-header"
                            >
                              <Typography className={classes.heading}>
                                Tarjetas de Credito
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {renderCardPersonData()}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-payment-method"}
                            onChange={handleExpandedPanel(
                              "panel-payment-method"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-payment-method-content"
                              id="panel-payment-method-header"
                            >
                              <Typography className={classes.heading}>
                                Forma de Pago
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  {renderPaymentMethod()}
                                </Grid>
                              </Grid>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={3} dir={theme.direction}>
                      <div className={classes.root}>
                        {renderRecords()}
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={4} dir={theme.direction}>
                      <div className={classes.root}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Grid container spacing={3}>
                              <Grid
                                item
                                xs={12}
                                className={classes.personLockersTitle}
                              >
                                Mis Lockers
                            </Grid>
                              {personLockersLoading ? (
                                <Loader />
                              ) : (
                                  personLockers.map((e: any, i: number) => (
                                    <Grid item xs={12} key={i}>
                                      {e.location.description} - {e.description}
                                    </Grid>
                                  ))
                                )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </TabPanel>
                  </SwipeableViews>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {tabValue !== 2 && (
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                {tempPersonId > 0 ? "Actualizar" : "Crear"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default PersonForm;
