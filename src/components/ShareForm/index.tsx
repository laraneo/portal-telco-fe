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

import CustomTextField from "../FormElements/CustomTextField";
import {
  create,
  searchToAssign,
  reset as resetShare
} from "../../actions/shareActions";
import { getList } from "../../actions/shareTypeActions";
import SearchAutoComplete from "../SearchAutoComplete";

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
  share_number: string;
  father_share_id: string;
  share_type_id: string;
};

type ShareFormProps = {
  id?: number;
};

const ShareForm: FunctionComponent<ShareFormProps> = ({ id }) => {
  const classes = useStyles();
  const [shareType, setShareType] = useState<any>(null);
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const loading = useSelector((state: any) => state.shareReducer.loading);
  const { listData: shareTypeList } = useSelector(
    (state: any) => state.shareTypeReducer
  );
  const { shareToAssignList, shareToAssignLoading } = useSelector(
    (state: any) => state.shareReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    if (shareTypeList) {
      const selected = shareTypeList.find(
        (e: any) => e.description === "Propietario"
      );
      if (selected) {
        setShareType(selected);
        setValue('share_type_id', selected.id)
      } else {
        setShareType(null);
      }
    }
  }, [shareTypeList, setValue]);

  useEffect(() => {
    return () => {
      reset();
      dispatch(resetShare());
    };
  }, [reset, dispatch]);

  const handleForm = (form: object) => {
    dispatch(create(form));
  };

  const handleSearchShares = _.debounce((term: any) => {
    dispatch(searchToAssign(term));
  }, 1000);

  const handleSelectShare = (option: any) => {
    setValue("father_share_id", option.id);
  };

  const getOptionLabelShare = (option: any) => option.share_number;

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Accion
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="N° Accion"
                field="share_number"
                required
                register={register}
                errorsField={errors.share_number}
                errorsMessageField={
                  errors.share_number && errors.share_number.message
                }
              />
            </Grid>
            <Grid item xs={6}>
              <SearchAutoComplete
                label="Accion Padre"
                options={shareToAssignList}
                loading={shareToAssignLoading}
                handleSearch={handleSearchShares}
                handleSelect={handleSelectShare}
                required
                errorsField={errors.father_share_id}
                getOptionLabel={getOptionLabelShare}
                errorsMessageField={
                  errors.father_share_id && errors.father_share_id.message
                }
              />
              <input
                style={{ display: "none" }}
                name="father_share_id"
                ref={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12}>
              {shareType ? (
                <div>
                  <strong>Tipo de Accion</strong>: {shareType.description}
                </div>
              ) : (
                <CircularProgress color="primary" size={20} />
              )}
              <input
                style={{ display: "none" }}
                name="share_type_id"
                ref={register({
                  required: true
                })}
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

export default ShareForm;
