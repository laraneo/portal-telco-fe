import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

import Upload from "../FormElements/Upload";
import CustomSelect from "../FormElements/CustomSelect";
import CustomTextField from "../FormElements/CustomTextField";
import { getList as getProcessList, getProcessByCategory } from "../../actions/processActions";
import { getList as getProcessCategoryList } from "../../actions/processCategoryActions";
import { create } from "../../actions/processRequestActions";

import Styles from "./style";

const useStyles = Styles;

type FormData = {
  process_id: string;
  file: string;
  reference: string;
  description: string;
  category: string;
};

export default function LoadRequestForm(): JSX.Element {
  const [ disableProcess, setDisableProcess ] = useState<boolean>(true)
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues,
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const {
    processRequestReducer: { loading },
    processReducer: { listData: processList },
    processCategoryReducer: { listData: processCategoryList },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getProcessCategoryList());
  }, [dispatch]);

  const handleForm = async (form: any) => {
    const body = {
      ...form,
      nStatus: 0,
    };
    await dispatch(create(body));
    reset();
  };

  const handleCategory = (event: any) => {
    setDisableProcess(true);
    getProcessByCategory(event.target.value)(dispatch).then(() => {
      setDisableProcess(false);
    });
  }

  return (
    <Grid container spacing={3}>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <Grid container spacing={1}>
          <Grid item sm={12} xs={12} md={12}>
            <CustomSelect
              label="Categoria"
              selectionMessage="Seleccione"
              field="category"
              required
              register={register}
              
              errorsMessageField={errors.category && errors.category.message}
              onChange={handleCategory}
            >
              {processCategoryList.map((item: any, i: number) => (
                <option key={i} value={item.id}>
                  {item.sName}
                </option>
              ))}
            </CustomSelect>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <CustomSelect
              label="Tipo de Solicitud"
              selectionMessage="Seleccione"
              field="process_id"
              required
              register={register}
              disabled={disableProcess}
              errorsMessageField={
                errors.process_id && errors.process_id.message
              }
            >
              {processList.map((item: any, i: number) => {
                const form = getValues();
                console.log('form ', form);
                if (item.idProcessCategory == form.category) {
                  return (
                    <option key={i} value={item.id}>
                      {item.sName}
                    </option>
                  );
                }
              })}
            </CustomSelect>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <CustomTextField
              placeholder="Referencia"
              field="reference"
              register={register}
              required
              errorsField={errors.reference}
              errorsMessageField={errors.reference && errors.reference.message}
            />
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <CustomTextField
              placeholder="Desripcion"
              field="description"
              register={register}
              required
              errorsField={errors.description}
              errorsMessageField={
                errors.description && errors.description.message
              }
            />
          </Grid>
          <Grid item sm={12} xs={12} md={12} style={{ paddingTop: 15 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                Cargar Archivo
              </Grid>
              <Grid item xs={12}>
                <Upload
                  field="file"
                  label="Archivo"
                  required
                  errorsField={errors.file}
                  requiredErrorMessage={errors.file && errors.file.message}
                  register={register}
                  setValue={setValue}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
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
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
