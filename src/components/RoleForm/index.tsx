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
import { update, create, get } from "../../actions/roleActions";
import { getAll as getAllPermissions } from "../../actions/permissionActions";

const useStyles = makeStyles(theme => ({
  rootRoleForm: {
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
  slug: string;
  description: string;
  permissions: string;
};

type FormComponentProps = {
  id?: number;
};

const RoleForm: FunctionComponent<FormComponentProps> = ({ id }) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState<any>([]);
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const loading = useSelector((state: any) => state.roleReducer.loading);
  const { list } = useSelector((state: any) => state.permissionReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPermissions());
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        const { name, slug, description, permissions } = response;
        setValue("name", name);
        setValue("slug", slug);
        setValue("description", description);
        if (permissions.length > 0) {
          const list = permissions.map((element: any) => element.id);
          setValue("permissions", JSON.stringify(list));
          setSelectedData(permissions);
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
    const body = {
      ...form,
      slug: form.slug.toLowerCase(),
    };
    
    if (id) {
    dispatch(update({ id, ...body }));
    } else {
    dispatch(create(body));
    }
  };

  const onPermissionsChange = (event: any) => {
    setValue("permissions", JSON.stringify(event));
  };

  return (
    <Container component="main" className={classes.rootRoleForm}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Rol
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
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
                    placeholder="Clave"
                    field="slug"
                    required
                    register={register}
                    errorsField={errors.slug}
                    errorsMessageField={errors.slug && errors.slug.message}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    placeholder="Descripcion"
                    field="description"
                    required
                    register={register}
                    errorsField={errors.description}
                    errorsMessageField={
                      errors.description && errors.description.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                {list.length > 0 && (
                  <TransferList
                    data={list}
                    selectedData={selectedData}
                    leftTitle="Permisos"
                    onSelectedList={onPermissionsChange}
                  />
                )}
                <input
                style={{ display: "none" }}
                name="permissions"
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

export default RoleForm;
