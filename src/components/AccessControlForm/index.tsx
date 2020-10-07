import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { create } from "../../actions/accessControlActions";
import {
  getFamiliesPartnerByCard,
  clear,
  getGuestByPartner
} from "../../actions/personActions";
import CustomSelect from "../FormElements/CustomSelect";
import { getList } from "../../actions/locationActions";
import CustomSearch from "../../components/FormElements/CustomSearch";
import moment from "moment";
import { updateModal } from "../../actions/secondModalActions";
import GuestForm from "../GuestForm";

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)"
  }
})(MuiExpansionPanelSummary);

const useStyles = makeStyles(theme => ({
  progressContainer: {
    textAlign: "center"
  },
  activeCard: {
    boxShadow: "0px 0px 20px 0px #3F51B5"
  },
  cardHeader: {
    padding: 0,
    textAlign: "center",
    fontWeight: "bold"
  },
  rootFamilyCards: {
    width: 150
  },
  media: {
    height: 150,
    width: 150
  },
  cardContent: {
    textAlign: 'center',
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  familyTitle: {
    fontSize: "10px",
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
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "30%"
  },
  suggestionButton: {
    width: "30%"
  },
  select: {
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  partnerContainer: {
    height: 230,
    overflow: 'auto',
  }
}));

type FormData = {
  status: string;
  description: string;
  location_id: string;
  share_id: string;
  people_id: string;
  guest_id: string;
};

export default function AccessControlForm() {
  const [selectedFamilies, setSelectedFamilies] = useState<
    Array<string | number>
  >([]);
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [tempIdentificationGuest, setTempIdentificationGuest] = React.useState<
    string | number
  >("");
  const [isSuggestion, SetIsSuggestion] = React.useState<boolean>(false);
  const classes = useStyles();
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();

  const {
    accessControlReducer: { loading },
    personReducer: {
      familiesPartnerCardLoading,
      familiesPartnerByCard,
      guestByPartner,
      guestByPartnerLoading
    },
    locationReducer: { listData: locationList }
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      reset();
      dispatch(clear());
    };
  }, [reset, dispatch]);

  const handleForm = async (form: object) => {
    const familyValues = getKeys(selectedFamilies);
    const family = familyValues.length > 0 ? familyValues : null;
    const created = moment().format('YYYY-MM-DD');
    const status = 1;
    const body = { ...form, family, status, created };
    await dispatch(create(body));
    setSelectedFamilies([]);
  };

  const handleSearch = async (event: any) => {
    setSelectedFamilies([]);
    const response: any = await dispatch(getFamiliesPartnerByCard(event.value));
    if (!_.isEmpty(response)) {
      setValue("people_id", response.id);
      if(response.familyMembers) {
        const family = response.familyMembers.find((e: any) => e.selectedFamily === true );
        if(family) {
          setSelectedFamilies([...selectedFamilies, family])
        }
      }
    } else {
      setValue("people_id", "");
    }
  };

  const refresh = async (identification: string) => {
    setTempIdentificationGuest("");
    SetIsSuggestion(false);
    const response: any = await dispatch(getGuestByPartner(identification));
    setValue("guest_id", response.id);
  };

  const handleSearchGuest = async (event: any) => {
    const response: any = await dispatch(getGuestByPartner(event.value));
    if (_.isEmpty(response)) {
      setValue("guest_id", "");
      if (event.value !== "") {
        SetIsSuggestion(true);
        setTempIdentificationGuest(event.value);
      } else {
        SetIsSuggestion(false);
        setTempIdentificationGuest("");
      }
    } else {
      setValue("guest_id", response.id);
      SetIsSuggestion(false);
    }
  };

  const handleExpandedPanel = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getKeys = (array: Array<string | number>) =>
    array.map((element: any) => element.id);

  const handleSelectFamily = (row: any) => {
    const families = selectedFamilies;
    const exist = _.find(families, (element: any) => element.id === row.id);
    if (exist) {
      const newArray = _.filter(families, (e: any) => e.id !== row.id);
      setSelectedFamilies(newArray);
    } else {
      setSelectedFamilies([...selectedFamilies, row]);
    }
  };

  const handleCreateGuest = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: (
            <GuestForm
              identification={tempIdentificationGuest}
              refresh={refresh}
            />
          )
        }
      })
    );
  };

  const renderGuest = () => {
    if (!_.isEmpty(guestByPartner)) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card
              className={`${classes.rootFamilyCards} ${classes.activeCard}`}
            >
              <CardHeader
                titleTypographyProps={{ variant: "subtitle1" }}
                title="Invitado"
                className={classes.cardHeader}
              />
              <CardMedia
                className={classes.media}
                image={guestByPartner.picture}
              />
              <CardContent className={classes.cardContent}>
                <Typography color="textPrimary" className={classes.familyTitle}>
                  {guestByPartner.name} {guestByPartner.last_name}
                </Typography>
                <Typography color="textPrimary" className={classes.familyTitle}>
                  {guestByPartner.primary_email}
                </Typography>
                <Typography color="textPrimary" className={classes.familyTitle}>
                  Telf: {guestByPartner.telephone1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  };

  const renderPartner = () => {
    if (!_.isEmpty(familiesPartnerByCard)) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={familiesPartnerByCard.shares ? 6 : 12}>
                <Card
                  className={`${classes.rootFamilyCards} ${classes.activeCard}`}
                >
                  <CardHeader
                    titleTypographyProps={{ variant: "subtitle1" }}
                    title="Socio"
                    className={classes.cardHeader}
                  />
                  <CardMedia
                    className={classes.media}
                    image={familiesPartnerByCard.picture}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      color="textPrimary"
                      className={classes.familyTitle}
                    >
                      <strong>
                        Carnet N° {familiesPartnerByCard.card_number}
                      </strong>
                    </Typography>
                    <Typography
                      color="textPrimary"
                      className={classes.familyTitle}
                    >
                      {familiesPartnerByCard.name}
                      {familiesPartnerByCard.last_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {familiesPartnerByCard.shares && (
                <Grid item xs={6}>
                  <CustomSelect
                    label="Accion"
                    selectionMessage="Seleccione"
                    field="share_id"
                    required
                    register={register}
                    errorsMessageField={
                      errors.share_id && errors.share_id.message
                    }
                  >
                    {familiesPartnerByCard.shares.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.share_number}
                      </option>
                    ))}
                  </CustomSelect>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              expanded={expanded === "panel-family-members"}
              onChange={handleExpandedPanel("panel-family-members")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-family-members-content"
                id="panel-family-members-header"
              >
                <Typography className={classes.heading}>Familiares</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container justify="center" direction="row" spacing={3}>
                  {familiesPartnerByCard.familyMembers.map(
                    (element: any, i: number) => {
                      const currentRow = selectedFamilies.find(
                        (e: any) => e.id === element.id
                      );
                      const active = currentRow ? classes.activeCard : "";
                      return (
                        <Grid item xs={3} key={i}>
                          <Card
                            className={`${classes.rootFamilyCards} ${active}`}
                            onClick={() => handleSelectFamily(element)}
                          >
                            <CardHeader
                              titleTypographyProps={{ variant: "subtitle1" }}
                              title={element.relationType}
                              className={classes.cardHeader}
                            />
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={element.profilePicture}
                              />
                              <CardContent className={classes.cardContent}>
                                <Typography
                                  color="textPrimary"
                                  className={classes.familyTitle}
                                >
                                  <strong>
                                    Carnet N° {element.card_number}
                                  </strong>
                                </Typography>
                                <Typography
                                  color="textPrimary"
                                  className={classes.familyTitle}
                                >
                                  {element.name} {element.last_name}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel-guest"}
              onChange={handleExpandedPanel("panel-guest")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-guest-content"
                id="panel-guest-header"
              >
                <Typography className={classes.heading}>Invitado</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CustomSearch
                      label="Cédula"
                      handleSearch={handleSearchGuest}
                    />
                    <input
                      style={{ display: "none" }}
                      name="guest_id"
                      ref={register({
                        required: false
                      })}
                    />
                  </Grid>
                  {isSuggestion && (
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="flex-start"
                      >
                        <Grid item xs={6}>
                          La Cédula {tempIdentificationGuest} no existe , desea
                          registrarlo ?
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          alignItems="center"
                          justify="flex-start"
                        >
                          <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.suggestionButton}
                            onClick={() => handleCreateGuest()}
                          >
                            Si
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {guestByPartnerLoading ? (
                      <div className={classes.progressContainer}>
                        <CircularProgress color="primary" size={40} />
                      </div>
                    ) : (
                        renderGuest()
                      )}
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Control de Acceso
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3} justify="center">
            <Grid item xs={7}>
              <CustomSelect
                label="Ubicacion"
                selectionMessage="Seleccione"
                field="location_id"
                required
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
            <Grid item xs={5}>
              <CustomSearch
                label="N° Carnet"
                handleSearch={handleSearch}
                errorsField={errors.people_id}
              />
              <input
                style={{ display: "none" }}
                name="people_id"
                ref={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12} className={classes.partnerContainer}>
              {familiesPartnerCardLoading ? (
                <div className={classes.progressContainer}>
                  <CircularProgress color="primary" size={40} />
                </div>
              ) : (
                  renderPartner()
                )}
            </Grid>
            <Grid item xs={12}>
              <div className={classes.wrapper}>
                {!_.isEmpty(familiesPartnerByCard) && (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                  >
                    Ingresar
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
