import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CustomTextField from "../FormElements/CustomTextField";
import { create } from "../../actions/notificacionActions";
import { getList as getDepartments } from "../../actions/departmentActions";
import { Grid } from "@material-ui/core";
import CustomSelect from "../FormElements/CustomSelect";
import ReCaptcha from "../common/ReCaptcha";
import snackBarUpdate from "../../actions/snackBarActions";
import Helper from '../../helpers/utilities';

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
    position: "relative",
    textAlign: 'center',
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
    width: '40%',
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
  nombre: string;
  telefono: string;
  correo: string;
  asunto: string;
  descripcion: string;
  departamento: string;
};

type ContactFormProps = {
  id?: number;
};

const ContactForm: FunctionComponent<ContactFormProps> = ({
  id
}) => {
  const classes = useStyles();
  const [captcha, setCaptcha] = useState<boolean>(false);
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const {
    notificacionReducer: { loading },
    departmentReducer: { listData: departments, loading: departmentsLoading },
    loginReducer: { user },
    parameterReducer: { listData: parameterList },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const checkCaptcha = (e: any) => setCaptcha(e);

  const handleForm = async (form: FormData) => {
    const { asunto, descripcion, departamento } = form;
    const currentDepartment: any = departments.find((e: any) => e.id == departamento);
    const sContenido = `Enviado por: ${user.name} <br> ${descripcion}`;
    const activeCaptcha = Helper.checkParameter(parameterList, "SHOW_CAPTCHA_CONTACT");
    const body = {
      sFuente: 'PARTNERPORTAL_CONTACTO',
      sCorreo: currentDepartment.email,
      sAsunto: asunto,
      sDestinatario: currentDepartment.description,
      sAccion: user.username,
      nStatus: 0,
      nTipo: 1,
      sContenido,
      dFecha: null,
      dFechaProgramada: null,
    }

    if (activeCaptcha) {
      if (captcha) {
        await dispatch(create(body));
        reset();
      } else {
        dispatch(snackBarUpdate({
          payload: {
            message: 'Error en el captcha',
            type: "error",
            status: true
          }
        }))
      }
    } else {
      await dispatch(create(body));
    }
  };


  return (
    <Container component="main">
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomSelect
                label="Departamento"
                selectionMessage="Seleccione"
                field="departamento"
                required
                register={register}
                errorsMessageField={
                  errors.departamento && errors.departamento.message
                }
                loading={departmentsLoading}
              >
                {departments.length > 0 && departments.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                placeholder="Asunto"
                field="asunto"
                required
                register={register}
                errorsField={errors.asunto}
                errorsMessageField={
                  errors.asunto && errors.asunto.message
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                placeholder="Descripcion"
                field="descripcion"
                multiline
                required
                register={register}
                errorsField={errors.descripcion}
                errorsMessageField={
                  errors.descripcion && errors.descripcion.message
                }
              />
            </Grid>
            {
              Helper.checkParameter(parameterList, "SHOW_CAPTCHA_CONTACT") && (
                <Grid item xs={12}>
                  <ReCaptcha isValid={checkCaptcha} />
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
                  Enviar
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

export default ContactForm;
