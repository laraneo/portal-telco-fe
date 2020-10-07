import React, { FunctionComponent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";

import Logo from "../Logo";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
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
    margin: theme.spacing(1, 0, 2),
  },
}));

type FormData = {
  username: string;
  password: string;
}

type LoginFormProps = {
  handleForm: any;
  loading: boolean;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ handleForm, loading }) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm<FormData>();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Logo />
        <Typography component="h1" variant="h5">
          Portal de Socios
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TextField
            variant="outlined"
            placeholder={window.campoUsuario}
            margin="normal"
            fullWidth
            id="email"
            label="Usuario"
            name="username"
            autoFocus
            inputRef={register({
              required: "Required",
            })}
            InputLabelProps={{
              shrink: true,
            }}
            required={errors.username ? true : false}
            error={errors.username ? true : false}
            helperText={errors.username && errors.username.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Clave"
            placeholder="Clave"
            type="password"
            id="password"
            inputRef={register({
              required: "Required"
            })}
            required={errors.password ? true : false}
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.wrapper}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Iniciar Sesion
          </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {/* <div className={classes.wrapper}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
            onClick={() => history.push('/update-password')}
          >
          Cambio de Contraseña
          </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div> */}
        </form>
      </div>
    </Container>
  );
}

export default LoginForm
