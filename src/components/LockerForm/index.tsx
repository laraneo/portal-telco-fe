import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/lockerActions";
import { getList } from "../../actions/lockerLocationsActions";
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
    }
}));

type FormData = {
    description: string;
    locker_location_id: string;
};

type ComponentProps = {
    id?: number;
};

const LockerForm: FunctionComponent<ComponentProps> = ({
    id
}) => {
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue } = useForm<
        FormData
    >();
    const {
        lockerReducer: { loading },
        lockerLocationReducer: { listData: lockerLocationList, loading: lockerLocationLoading }
    } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    useEffect(() => {
        async function fetch() {
            if (id) {
                const response: any = await dispatch(get(id));
                setValue("description", response.description);
                setValue("locker_location_id", response.locker_location_id);
            }
        }
        fetch();
    }, [id, dispatch, setValue]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const handleForm = (form: object) => {
        if (id) {
            dispatch(update({ id, ...form }));
        } else {
            dispatch(create(form));
        }
    };

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Locker
        </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <CustomTextField
                        placeholder="Description"
                        field="description"
                        required
                        register={register}
                        errorsField={errors.description}
                        errorsMessageField={
                            errors.description && errors.description.message
                        }
                    />

                    <CustomSelect
                        label="Ubicacion"
                        selectionMessage="Seleccione"
                        field="locker_location_id"
                        required
                        register={register}
                        errorsMessageField={
                            errors.locker_location_id && errors.locker_location_id.message
                        }
                        loading={lockerLocationLoading}
                    >
                        {lockerLocationList.length > 0 && lockerLocationList.map((item: any) => (
                            <option key={item.id} value={item.id}>
                                {item.description}
                            </option>
                        ))}
                    </CustomSelect>

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

export default LockerForm;
