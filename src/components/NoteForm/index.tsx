import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import _ from 'lodash';

import CustomTextField from "../FormElements/CustomTextField";
import { create, get } from "../../actions/noteActions";
import { getList as getDepartmentList } from "../../actions/departmentActions";
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
    typeRecordDetail: {
        color: 'red',
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
}));

type FormData = {
    description: string;
    status: string;
    department_id: number;
};

type NoteFormProps = {
    id?: number;
    isView?: boolean;
};

const NoteForm: FunctionComponent<NoteFormProps> = ({
    id,
    isView = false
}) => {
    const [selectedNote, setSelectedNote] = useState<any>({});
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue } = useForm<FormData>();
    const { loading } = useSelector((state: any) => state.noteReducer);

    const { listData: departmentList } = useSelector((state: any) => state.departmentReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {
            if (id) {
                const response: any = await dispatch(get(id));
                console.log('response ', response);
                setSelectedNote(response);
            } else {
                setSelectedNote({});
            }
        }
        fetch();
    }, [id, dispatch, setValue]);

    useEffect(() => {
        dispatch(getDepartmentList());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);



    const handleForm = (form: object) => {
        const data = {
            people_id: id,
            created: moment().format('YYYY-MM-DD'),
            ...form,
        };
        dispatch(create(data));
    };

    const renderDetail = () => {
        return !_.isEmpty(selectedNote) && (
            <Grid container spacing={3}>
                 <Grid item xs={12}>
                    <strong>Fecha:</strong> {selectedNote.created}
                </Grid>
                 <Grid item xs={12}>
                    <strong>Status:</strong> {selectedNote.status === 1 ? 'Activo' : 'Inactivo'}
                </Grid>
                <Grid item xs={12}>
                    <strong>Description:</strong> {selectedNote.description}
                </Grid>
                <Grid item xs={12}>
                    <strong>Departamento:</strong> {selectedNote.department.description}
                </Grid>
            </Grid>
        )
    }

    const renderForm = () => {
        return (
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CustomSelect
                            label="Status"
                            selectionMessage="Seleccione"
                            field="status"
                            required
                            register={register}
                            errorsMessageField={
                                errors.status && errors.status.message
                            }
                        >
                            <option value={1}> Activo </option>
                            <option value={0}> Inactivo </option>
                        </CustomSelect>
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
                    <Grid item xs={12}>
                        <CustomSelect
                            label="Departamento"
                            selectionMessage="Seleccione"
                            field="department_id"
                            required
                            register={register}
                            errorsMessageField={
                                errors.department_id && errors.department_id.message
                            }
                        >
                            {departmentList.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                    {item.description}
                                </option>
                            ))}
                        </CustomSelect>
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
        )
    }

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Nota
        </Typography>
                {isView ? renderDetail() : renderForm()}
            </div>
        </Container>
    );
};

export default NoteForm;
