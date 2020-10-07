import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'

import { update, get } from "../../actions/reportePagosActions";
import { Grid } from "@material-ui/core";
import CustomEditor from "../Editor";

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
        width: '30%'
    },
    select: {
        padding: '10px 0px 10px 0px',
        width: ' 100%',
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: '1px solid grey',
        fontSize: '16px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
}));

type FormData = {
    user_notes: string;
};

type ComponentProps = {
    id?: number;
};

const ReportePagoNotaForm: FunctionComponent<ComponentProps> = ({ id }) => {
    const [userNotes, setUserNotes] = useState();
    const classes = useStyles();
    const {
        handleSubmit,
        reset,
    } = useForm<FormData>();
    const { loading } = useSelector((state: any) => state.reportePagosReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {
            if (id) {
                const res: any = await dispatch(get(id));
                const { Nota } = res;
                setUserNotes(Nota);
            }
        }
        fetch();
    }, [id, dispatch]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const handleForm = (form: object) => {
        dispatch(update(id, {Nota: userNotes}));
    };

    const handleChangeEditor = (value: any) => {
        setUserNotes(value);
    }

    return (
        <Container component="main">
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ textAlign: 'center' }} >Nota</Grid>
                    <Grid item xs={12}>
                        <CustomEditor onChange={handleChangeEditor} content={userNotes} />
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
                                {id ? "Actualizar" : "Crear"}
                            </Button>
                            {loading && (
                                <CircularProgress size={24} className={classes.buttonProgress} />
                            )}
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ReportePagoNotaForm;
