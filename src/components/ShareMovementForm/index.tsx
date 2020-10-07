import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import moment from 'moment';

import CustomTextField from "../FormElements/CustomTextField";
import { create } from "../../actions/shareMovementActions";
import { searchToAssign, reset as resetShare } from "../../actions/shareActions";

import {
  searchPartnersToAssign,
  searchTitularToAssign
} from "../../actions/personActions";
import SearchAutoComplete from "../SearchAutoComplete";
import CustomSelect from "../FormElements/CustomSelect";

const useStyles = makeStyles(theme => ({
  rootShareMovementForm: {
    flexGrow: 1
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
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  select: {
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px"
  }
}));

type FormData = {
  description: string;
  rate: string;
  share_id: string;
  people_id: string;
  id_titular_persona: string;
  transaction_type_id: string;
  number_sale_price: string;
  currency_rate_id: string;
  currency_sale_price_id: string;
};

type ShareMovementFormProps = {
  id?: number;
};

const ShareMovementForm: FunctionComponent<ShareMovementFormProps> = ({
  id
}) => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues,
    watch
  } = useForm<FormData>();
  const [ selectedTypeTransaction, setSelectedTypeTransaction ] = useState<any>(null);
  const { shareToAssignList, shareToAssignLoading } = useSelector(
    (state: any) => state.shareReducer
  );
  const {
    partnersToAssign,
    titularToAssign,
    setPartnersLoading,
    setTitularLoading
  } = useSelector((state: any) => state.personReducer);
  const loading = useSelector(
    (state: any) => state.shareMovementReducer.loading
  );
  const { listData: transactionTypeList } = useSelector(
    (state: any) => state.transactionTypeReducer
  );

  const { listData: currencyList } = useSelector(
    (state: any) => state.currencyReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      reset();
      dispatch(resetShare());
    };
  }, [reset, dispatch]);

  useEffect(() => {
    const transaction = watch('transaction_type_id');
    if (transaction !== "") {
      const selectedTransaction = transactionTypeList.find((e: any) => e.id.toString() === transaction);
      if (selectedTransaction) {
        setSelectedTypeTransaction(selectedTransaction);
        setValue('rate',selectedTransaction.rate);
        setValue('currency_rate_id',selectedTransaction.currency_id);
      }
    } 
  }, [watch, setValue, transactionTypeList])

  const handleForm = (form: object) => {
    const created = moment().format('YYYY-MM-DD');
    dispatch(create({...form, number_procesed: 1 , created }));
  };

  const handleSearchShares = _.debounce((term: any) => {
    dispatch(searchToAssign(term));
  }, 1000);

  const handleSearchPartners = _.debounce((term: any) => {
    dispatch(searchPartnersToAssign(term));
  }, 1000);

  const handleSearchOwner = _.debounce((term: any) => {
    dispatch(searchTitularToAssign(term));
  }, 1000);

  const handleSelectShare = (option: any) => {
    setValue("share_id", option.id);
  };

  const handleSelectPartner = (option: any) => {
    setValue("people_id", option.id);
  };

  const handleSelectOwner = (option: any) => {
    setValue("id_titular_persona", option.id);
  };

  const getOptionLabelShare = (option: any) => option.share_number;

  const getOptionLabelPerson = (option: any) =>
    `${option.name} ${option.last_name}`;

  const selectDefaultOwner = () => {
    const { people_id } = getValues();
    if (people_id === "") {
      return false;
    }
    const partner = partnersToAssign.find(
      (e: any) => e.id.toString() === people_id
    );
    return partner;
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Movimiento Accion
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className={classes.rootShareMovementForm}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <SearchAutoComplete
                  label="Accion"
                  options={shareToAssignList}
                  loading={shareToAssignLoading}
                  handleSearch={handleSearchShares}
                  handleSelect={handleSelectShare}
                  required
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
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  label="Tipo de Transacion"
                  selectionMessage="Seleccione"
                  field="transaction_type_id"
                  required
                  register={register}
                  errorsMessageField={
                    errors.transaction_type_id &&
                    errors.transaction_type_id.message
                  }
                >
                  {transactionTypeList.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={6}>
                <SearchAutoComplete
                  label="Socio"
                  options={partnersToAssign}
                  loading={setPartnersLoading}
                  handleSearch={handleSearchPartners}
                  handleSelect={handleSelectPartner}
                  required
                  errorsField={errors.people_id}
                  getOptionLabel={getOptionLabelPerson}
                  errorsMessageField={
                    errors.people_id && errors.people_id.message
                  }
                />
                <input
                  style={{ display: "none" }}
                  name="people_id"
                  ref={register({
                    required: true
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <SearchAutoComplete
                  label="Titular"
                  options={titularToAssign}
                  loading={setTitularLoading}
                  handleSearch={handleSearchOwner}
                  handleSelect={handleSelectOwner}
                  errorsField={errors.id_titular_persona}
                  getOptionLabel={getOptionLabelPerson}
                  selecDefault={selectDefaultOwner}
                  errorsMessageField={
                    errors.id_titular_persona &&
                    errors.id_titular_persona.message
                  }
                />
                <input
                  style={{ display: "none" }}
                  name="id_titular_persona"
                  ref={register({
                    required: true
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  placeholder="Description"
                  field="description"
                  required
                  register={register}
                  errorsField={errors.description}
                  errorsMessageField={
                    errors.description && errors.description.message
                  }
                />
              </Grid>
              <Grid item xs={6}>
              <Grid container spacing={1}>
              <Grid item xs={5} style={{ paddingTop: '8px' }}>
              <CustomSelect
                  label="Moneda"
                  selectionMessage="Seleccione"
                  field="currency_sale_price_id"
                  required
                  register={register}
                  errorsMessageField={
                    errors.currency_sale_price_id &&
                    errors.currency_sale_price_id.message
                  }
                >
                  {currencyList.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={7}>
              <CustomTextField
                  placeholder="Precio Venta"
                  field="number_sale_price"
                  required
                  register={register}
                  errorsField={errors.number_sale_price}
                  errorsMessageField={
                    errors.number_sale_price && errors.number_sale_price.message
                  }
                />
              </Grid>
              </Grid>
              </Grid>
              { selectedTypeTransaction && (
                 <Grid item xs={6}>
                 Tarifa: { selectedTypeTransaction.rate } <br />
                 Moneda: { selectedTypeTransaction.currency.description }
               </Grid>
              )
              }
              <Grid item xs={12}>
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                  >
                    {id ? "Actualizar" : "Crear"}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
                <input
                  style={{ display: "none" }}
                  name="currency_rate_id"
                  ref={register({
                    required: true
                  })}
                />
                                <input
                  style={{ display: "none" }}
                  name="rate"
                  ref={register({
                    required: true
                  })}
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ShareMovementForm;
