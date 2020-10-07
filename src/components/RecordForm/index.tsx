import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import CustomTextField from "../FormElements/CustomTextField";
import { create, getRecordsByPerson } from "../../actions/recordActions";
import { getList as getTypeList, get } from "../../actions/recordTypeActions";
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
  typeRecordDetail : {
    color: 'red',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
}));

type FormData = {
  description: string;
  file1: string;
  record_type_id: number;
};

type RecordFormProps = {
  id?: number;
};

interface selectedRecordType {
  blocked: number;
  days: number;
}

const RecordForm: FunctionComponent<RecordFormProps> = ({
  id
}) => {
  const classes = useStyles();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [selectedRecordType, setSelectedRecordType] = useState<any>(null);
  const [imageField, setImageField] = useState();
  const { handleSubmit, register, errors, reset, getValues, setValue, watch } = useForm<
    FormData
  >();
  const { loading } = useSelector((state: any) => state.recordReducer);

  const { listData: recordTypeList } = useSelector((state: any) => state.recordTypeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeList());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onTypeChange = async () => {
    const recordType = watch('record_type_id');
    console.log('recordType ', recordType);
      if (recordType > 0) {
        const res: any = await dispatch(get(recordType));
        setSelectedRecordType(res);
      } else {
        setSelectedRecordType(null);
      }
  }

  const handleForm = async (form: object) => {
    const { record_type_id } = getValues();
    const res: any = await dispatch(get(record_type_id));
    const { days, blocked } = res;
    const expiration_date = moment().add(days, 'days').format('YYYY-MM-DD');
    const created = moment().format('YYYY-MM-DD');
    const data = {
      people_id: id,
      created,
      days,
      expiration_date,
      blocked,
    };
    await dispatch(create({ ...form, ...data }));
    dispatch(getRecordsByPerson({ id }));
  };

  const loadImage = (e: any) => {
    const ObjecUrlImage = window.URL.createObjectURL(e.target.files[0]);
    setImage({
      preview: ObjecUrlImage,
      raw: e.target.files[0]
    });
    const reader: any = new FileReader();
    reader.onload = () => {
      setValue("file1", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const triggerClick = (input: any) => {
    if (input) {
      setImageField(input);
    }
  };

  const handleImage = () => {
    imageField.click();
    setImageField(imageField);
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Expediente
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3} >
                <Grid item xs={6}>
                  <CustomSelect
                    label="Motivo"
                    selectionMessage="Seleccione"
                    field="record_type_id"
                    required
                    register={register}
                    errorsMessageField={
                      errors.record_type_id && errors.record_type_id.message
                    }
                    onChange={onTypeChange}
                  >
                    {recordTypeList.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={6}>
                  {
                    selectedRecordType && (
                      <div className={classes.typeRecordDetail}>
                        <div>Bloqueo: {selectedRecordType.blocked === 1 ? 'SI' : 'NO'}</div>
                        <div>Dias: {selectedRecordType.days}</div>
                        <div>Vencimiento: {moment().add(selectedRecordType.days, 'days').format('YYYY-MM-DD')}</div>
                      </div>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                placeholder="Description"
                field="description"
                required
                register={register}
                errorsField={errors.description}
                errorsMessageField={
                  errors.description && errors.description.message
                }
                multiline
              /></Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                component="span"
                size="small"
                // onClick={() => handleImage()}
                >
                Archivo 1
              </Button>
              <input
                style={{ display: "none" }}
                type="file"
                id="load_image"
                accept="image/*,.pdf"
                ref={triggerClick}
                onChange={loadImage}
              />
              <input
                style={{ display: "none" }}
                name="file1"
                ref={register}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                size="small"
                component="span"
              >
                Archivo 2
              </Button>

            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                component="span"
                size="small"
              >
                Archivo 3
              </Button>

            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                size="small"
                component="span"
              >
                Archivo 4
              </Button>

            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                size="small"
                component="span"
              >
                Archivo 5
              </Button>

            </Grid>
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
                  Crear
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

export default RecordForm;
