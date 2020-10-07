import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import CustomTextField from "../FormElements/CustomTextField";
import { updatePassword } from "../../actions/userActions";
import snackBarUpdate from "../../actions/snackBarActions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    textAlign: 'center'
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
    width: '40%'
},
  registerTitle: {
    textAlign: 'center',
  }
}));

type FormData = {
  username: string;
  name: string;
  last_name: string;
  doc_id: string;
  birth_date: string;
  phone_number: string;
  email: string;
  group_id: string;
  gender_id: string;
  prevPassword: string;
  password: string;
  password2: string;
};

type ComponentProps = {
  id?: number;
};

const RegisterPasswordForm: FunctionComponent<ComponentProps> = ({
  id
}) => {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const {
    userReducer: { loading },
  } = useSelector((state: any) => state);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = async (form: FormData) => {
    const body = {
      ...form,
    }
    if(form.password === form.password2) {
      await dispatch(updatePassword({ ...body }));
    reset();
    } else {
      dispatch(snackBarUpdate({
        payload: {
          message: 'Contraseñas no coinciden',
          type: "error",
          status: true
        }
      }))
    }
  };

  return (
    <Container component="main" >
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid sm={12} xs={12} md={12} className={classes.registerTitle} >
              <Typography component="h1" variant="h5">
               Cambio de Contraseña 
        </Typography>
            </Grid>
            
            <Grid item sm={12} xs={12} md={12}>
              <CustomTextField
                placeholder="Contraseña anterior"
                field="prevPassword"
                register={register}
                required
                errorsField={errors.prevPassword}
                errorsMessageField={
                  errors.prevPassword && errors.prevPassword.message
                }
                type="password"
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
              <CustomTextField
                placeholder="Contraseña"
                field="password"
                register={register}
                required
                errorsField={errors.password}
                errorsMessageField={
                  errors.password && errors.password.message
                }
                type="password"
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
              <CustomTextField
                placeholder="Confirmar Contraseña"
                field="password2"
                register={register}
                required
                errorsField={errors.password2}
                errorsMessageField={
                  errors.password2 && errors.password2.message
                }
                type="password"
              />
            </Grid>
            <Grid sm={12} xs={12} md={12}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                >
                  Actualizar
            </Button>
                {loading && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
  );
};

export default RegisterPasswordForm;
