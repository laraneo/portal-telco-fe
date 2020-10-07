import React, { useEffect, FunctionComponent, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CustomTextField from "../FormElements/CustomTextField";
import CustomSelect from "../FormElements/CustomSelect";
import {
  update,
  create,
  get,
} from "../../actions/cardPersonActions";
import { getAll as getCardTypes } from "../../actions/cardTypeActions";
import { getList as getBanks } from "../../actions/bankActions";

const options = [
  { id: 1, hidden: false, description: "Primaria" },
  { id: 2, hidden: false, description: "Secundaria" },
  { id: 3, hidden: false, description: "Terciaria" }
];

const useStyles = makeStyles(theme => ({
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
  people_id: string;
  titular: string;
  ci: string;
  card_number: string;
  sec_code: string;
  expiration_date: string;
  card_type_id: number;
  bank_id: number;
  order: number;
};

type CardPersonFormProps = {
  id?: number;
  personId: any;
  share: any;
};

const CardPersonForm: FunctionComponent<CardPersonFormProps> = ({
  id,
  personId,
  share
}) => {
  const [cardOptions, setCardOptions] = useState(options);

  const classes = useStyles();
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: any) => state.cardPersonReducer
  );
  const { listData: banks } = useSelector((state: any) => state.bankReducer);
  const { list: cardTypeList } = useSelector(
    (state: any) => state.cardTypeReducer
  );

  useEffect(() => {
    dispatch(getCardTypes());
    dispatch(getBanks());
    async function fetch() {
      cardOptions.map((element: any) => {
        if (share.tarjeta_primaria && element.id === 1) element.hidden = true;
        if (share.tarjeta_secundaria && element.id === 2) element.hidden = true;
        if (share.tarjeta_terciaria && element.id === 3) element.hidden = true;
        return element
      });
      if (id) {
        const response: any = await dispatch(get(id));
        // const { titular, ci, card_number, sec_code, expiration_date, card_type_id, bank_id } = response;
        setValue("titular", response.titular);
        setValue("ci", response.ci);
        setValue("card_number", response.card_number);
        setValue("sec_code", response.sec_code);
        setValue("expiration_date", response.expiration_date);
        setValue("card_type_id", response.card_type_id);
        setValue("bank_id", response.bank_id);
        cardOptions.map((element: any) => {
          if (share.tarjeta_primaria && share.tarjeta_primaria.id === id && element.id === 1) {
            element.hidden = false;
            setValue("order", element.id);
          }
          if (share.tarjeta_secundaria && share.tarjeta_secundaria.id === id && element.id === 2) {
            element.hidden = false;
            setValue("order", element.id);
          }
          if (share.tarjeta_terciaria && share.tarjeta_terciaria.id === id && element.id === 3) {
            element.hidden = false;
            setValue("order", element.id);
          }
          return element
        });;
      }
    }
    fetch();
  }, [id, dispatch, setValue, personId, share, cardOptions]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = (form: object) => {
    if (id) {
      dispatch(update({ id, ...form, people_id: personId, share: share.id }));
    } else {
      dispatch(create({ ...form, people_id: personId, share: share.id }));
    }
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Tarjeta de Credito
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Titular"
                field="titular"
                required
                register={register}
                errorsField={errors.titular}
                errorsMessageField={errors.titular && errors.titular.message}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Cedula"
                field="ci"
                required
                register={register}
                errorsField={errors.ci}
                errorsMessageField={errors.ci && errors.ci.message}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Numero"
                field="card_number"
                required
                register={register}
                errorsField={errors.card_number}
                errorsMessageField={
                  errors.card_number && errors.card_number.message
                }
                maxLength={16}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Codigo de Seguridad"
                field="sec_code"
                required
                register={register}
                errorsField={errors.sec_code}
                errorsMessageField={errors.sec_code && errors.sec_code.message}
                maxLength={3}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Vence"
                field="expiration_date"
                required
                register={register}
                errorsField={errors.expiration_date}
                errorsMessageField={
                  errors.expiration_date && errors.expiration_date.message
                }
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                label="Tipo de Tarjeta"
                field="card_type_id"
                required
                register={register}
                errorsMessageField={
                  errors.card_type_id && errors.card_type_id.message
                }
                selectionMessage="Seleccione Tarjeta"
              >
                {cardTypeList.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                label="Banco"
                field="bank_id"
                required
                register={register}
                errorsMessageField={errors.bank_id && errors.bank_id.message}
                selectionMessage="Seleccione Banco"
              >
                {banks.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                label="Orden"
                field="order"
                required
                register={register}
                errorsMessageField={errors.order && errors.order.message}
                selectionMessage="Seleccione"
              >
                {cardOptions.map((item: any, i: number) => (
                  <option key={item.id} value={item.id} hidden={item.hidden}>{item.description}</option>
                ))}
                ))}
              </CustomSelect>
            </Grid>
          </Grid>
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
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CardPersonForm;
