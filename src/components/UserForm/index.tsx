import React, { useEffect, useState, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import TransferList from "../TransferList";
import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/userActions";
import { getAll as getAllRoles } from "../../actions/roleActions";
import snackBarUpdate from "../../actions/snackBarActions";
import RangeAge from "../FormElements/RangeAge";

const useStyles = makeStyles(theme => ({
  rootUserForm: {
    width: "100%"
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
    width: '30%',
  },
}));

type FormData = {
  name: string;
  email: string;
  username: string;
  username_legacy: string | null;
  password: string;
  password2: string;
  roles: string;
  share_from: string;
  share_to: string;
};

type FormComponentProps = {
  id?: number;
};

const UserForm: FunctionComponent<FormComponentProps> = ({ id }) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState<any>([]);
  const [currentUsername, setCurrentUsername] = useState<boolean>(false);
  const [currentUsernameLegacy, setCurrentUsernameLegacy] = useState<boolean>(false);
  const { handleSubmit, register, errors, reset, setValue, watch } = useForm<
    FormData
  >();
  const loading = useSelector((state: any) => state.userReducer.loading);
  const { list } = useSelector((state: any) => state.roleReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoles());
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        const { name, email, roles, username, share_from, share_to, username_legacy } = response;
        setValue("username", username);
        setValue("username_legacy", username_legacy);
        setValue("name", name);
        setValue("email", email);
        setValue("share_from", share_from);
        setValue("share_to", share_to);
        if(username !== null || username !== '') {
          setCurrentUsername(true);
        } else {
          setCurrentUsername(false);
        }
        if(typeof username_legacy == 'string' && username_legacy !== '' ) {
          setCurrentUsernameLegacy(true);
        } else {
          setCurrentUsernameLegacy(false);
        }
        if (roles.length > 0) {
          const list = roles.map((element: any) => element.id);
          setValue("roles", JSON.stringify(list));
          setSelectedData(roles);
        } else {
          setSelectedData([]);
        }
      }
    }
    fetch();
  }, [id, dispatch, setValue]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = (form: FormData) => {

    let data = {
      ...form,
    };

    if (form.password2 !== '' && form.password !== form.password2) {
      dispatch(snackBarUpdate({
        payload: {
          message: 'Las claves no coinciden',
          type: "error",
          status: true
        }
      }));
    } else {
      if (form.password2 === '') delete data.password;
      if (id) {
        dispatch(update({ id, ...data }));
      } else {
        dispatch(create({ ...data }));
      }
    }

  };

  const onPermissionsChange = (event: any) => {
    setValue("roles", JSON.stringify(event));
  };
  return (
    <Container component="main" className={classes.rootUserForm}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Usuario
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Usuario"
                field="username"
                required
                register={register}
                errorsField={errors.username}
                errorsMessageField={errors.username && errors.username.message}
                disable={currentUsername}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Usuario Legacy"
                field="username_legacy"
                required
                register={register}
                errorsField={errors.username_legacy}
                errorsMessageField={errors.username_legacy && errors.username_legacy.message}
                disable={currentUsernameLegacy}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Nombre"
                field="name"
                required
                register={register}
                errorsField={errors.name}
                errorsMessageField={errors.name && errors.name.message}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Correo"
                field="email"
                required
                register={register}
                errorsField={errors.email}
                errorsMessageField={errors.email && errors.email.message}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Clave"
                field="password"
                register={register}
                errorsField={errors.password}
                errorsMessageField={
                  errors.password && errors.password.message
                }
                type="password"
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                placeholder="Confirmar Clave"
                field="password2"
                register={register}
                errorsField={errors.password2}
                errorsMessageField={
                  errors.password2 && errors.password2.message
                }
                type="password"
              />
            </Grid>
            <Grid item xs={4}>
            <RangeAge
                label="Accion"
                startField="share_from"
                endField="share_to"
                register={register}
                watch={watch}
                startMsgErr={errors.share_from && errors.share_from.message}
                endMsgErr={errors.share_to && errors.share_to.message}
              />
            </Grid>
            <Grid item xs={12}>
              {list.length > 0 && (
                <TransferList
                  data={list}
                  selectedData={selectedData}
                  leftTitle="Roles"
                  onSelectedList={onPermissionsChange}
                />
              )}
              <input
                style={{ display: "none" }}
                name="roles"
                ref={register}
              />
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

export default UserForm;
