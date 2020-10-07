import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import CustomTextField from "../FormElements/CustomTextField";
import { createGuest } from "../../actions/personActions";
import CustomSelect from "../FormElements/CustomSelect";

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
  },
  pictureContainer: {
    maxWidth: 185
  },
  media: {
    height: 200
  }
}));

type FormData = {
  name: string;
  last_name: string;
  primary_email: string;
  telephone1: string;
  gender_id: string;
  picture: string;
  rif_ci: string;
};

type GuestFormProps = {
  identification: any;
  refresh: Function;
};

const GuestForm: FunctionComponent<GuestFormProps> = ({
  identification,
  refresh
}) => {
  const classes = useStyles();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageField, setImageField] = useState();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues
  } = useForm<FormData>();
  const {
    personReducer: { loading },
    genderReducer: { list: genderList },
    loginReducer: { user },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const { picture } = getValues();

  useEffect(() => {
    setValue("rif_ci", identification);
  }, [setValue, identification]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = async (form: object) => {
    const body = {
      ...form,
      id_card_picture: null,
      passport: "",
      card_number: "",
      expiration_date: moment().format('YYYY-MM-DD'),
      birth_date: moment().format('YYYY-MM-DD'),
      representante: "",
      company_person_id: 0,
      status_person_id: 1,
      marital_statuses_id: 0,
      countries_id: 0,
      profession_list: null,
      user: user.username,
      date: moment().format('YYYY-MM-DD'),
    };
    dispatch(createGuest(body, refresh));
  }

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

  let imagePreview = picture;
  if (image.preview) imagePreview = image.preview;

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Invitado
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card className={classes.pictureContainer}>
                <CardActionArea onClick={() => handleImage()}>
                  <CardMedia className={classes.media} image={imagePreview} />
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
            <Grid item xs={8}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <CustomTextField
                    placeholder="Nombre"
                    field="name"
                    required
                    register={register}
                    errorsField={errors.name}
                    errorsMessageField={errors.name && errors.name.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    placeholder="Apellido"
                    field="last_name"
                    required
                    register={register}
                    errorsField={errors.last_name}
                    errorsMessageField={
                      errors.last_name && errors.last_name.message
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    placeholder="Cedula"
                    field="rif_ci"
                    required
                    register={register}
                    errorsField={errors.rif_ci}
                    errorsMessageField={errors.rif_ci && errors.rif_ci.message}
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <CustomTextField
                    placeholder="Telefono"
                    field="telephone1"
                    register={register}
                    errorsField={errors.telephone1}
                    errorsMessageField={
                      errors.telephone1 && errors.telephone1.message
                    }
                    inputType="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomSelect
                    label="Sexo"
                    field="gender_id"
                    required
                    register={register}
                    errorsMessageField={
                      errors.gender_id && errors.gender_id.message
                    }
                    selectionMessage="Seleccione Sexo"
                  >
                    {genderList.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    ))}
                  </CustomSelect>
                </Grid>
              </Grid>
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
              Registrar
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

export default GuestForm;
