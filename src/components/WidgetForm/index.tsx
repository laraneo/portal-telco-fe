import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/widgetActions";
import { Grid } from "@material-ui/core";
import TransferList from "../TransferList";
import { getAll as getAllRoles } from "../../actions/roleActions";
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
    order: string;
    roles: string;
    show_mobile: string;
};

type ComponentProps = {
    id?: number;
};

interface SelectedItems {
    itemsToAdd: Array<string | number>;
    itemsToRemove: Array<string | number>;
}

const initialSelectedItems = {
    itemsToAdd: [],
    itemsToRemove: []
};

const WidgetForm: FunctionComponent<ComponentProps> = ({
    id
}) => {
    const [selectedData, setSelectedData] = useState<any>([]);
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue } = useForm<
        FormData
    >();
    const {
        widgetReducer: { loading },
        roleReducer: { list }
    } = useSelector((state: any) => state);

    const [selectedRoles, setSelectedRoles] = useState<SelectedItems>(
        initialSelectedItems
    );

    const dispatch = useDispatch();

    const onRolesChange = (event: any, type: string, selected: any) => {
        let roleList = selectedRoles;
        if (type === "add") {
            console.log(' add selected ', selected);
            selected.forEach((element: any) => {
                const exist = roleList.itemsToAdd.find(
                    (e: any) => e.id === element.id
                );
                if (_.isEmpty(exist)) {
                    const exist = roleList.itemsToAdd.find(
                        (e: any) => e.id === element.id
                    );
                    if (!_.isEmpty(exist)) {
                        roleList.itemsToRemove.splice(roleList.itemsToRemove.findIndex((i: any) => i.id === element.id), 1);
                    }
                    roleList.itemsToAdd.push(element);
                }
            });
            console.log('add roleList ', roleList);
        }
        if (type === "remove") {
            console.log('remov selected ', selected);
            selected.forEach((element: any) => {
                const exist = roleList.itemsToRemove.find(
                    (e: any) => e.id === element.id
                );
                if (_.isEmpty(exist)) {
                    const currentIndex = roleList.itemsToAdd.indexOf(element);
                    roleList.itemsToAdd.splice(currentIndex, 1);
                    roleList.itemsToRemove.push(element);
                }
            });
            console.log('remove roleList ', roleList);
        }

        setSelectedRoles(roleList);
    };

    useEffect(() => {
        const selected = selectedRoles;
        selected.itemsToAdd.length = 0;
        selected.itemsToRemove.length = 0;
        setSelectedRoles(selected);
        dispatch(getAllRoles());
        async function fetch() {
            if (id) {
                const response: any = await dispatch(get(id));
                const { name, slug, description, roles, order, show_mobile } = response;
                setValue("name", name);
                setValue("slug", slug);
                setValue("description", description);
                setValue("order", order);
                setValue("show_mobile", show_mobile);
                if (roles && roles.length > 0) {
                    setSelectedData(roles);
                    roles.forEach((element: any) => {
                        selectedRoles.itemsToAdd.push(element);
                        setSelectedRoles(selectedRoles);
                    });
                }
            }
        }
        fetch();
    }, [id, dispatch, setValue, selectedRoles]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const handleForm = (form: object) => {
        const body = {
            ...form,
            roles: selectedRoles,
        }
        console.log('body', body);
        if (id) {
            dispatch(update({ id, ...body }));
        } else {
            dispatch(create(body));
        }
    };

    const onPermissionsChange = (event: any) => {
        setValue("roles", JSON.stringify(event));
    };

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Widget
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
                                errorsMessageField={
                                    errors.name && errors.name.message
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                placeholder="Clave"
                                field="slug"
                                required
                                register={register}
                                errorsField={errors.slug}
                                errorsMessageField={
                                    errors.slug && errors.slug.message
                                }
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
                        <Grid item xs={4}>
                            <CustomTextField
                                placeholder="Orden"
                                field="order"
                                required
                                register={register}
                                errorsField={errors.order}
                                errorsMessageField={
                                    errors.order && errors.order.message
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomSelect
                                label="Mostrar Mobile"
                                selectionMessage="Seleccione"
                                field="show_mobile"
                                register={register}
                                required
                                errorsMessageField={
                                    errors.show_mobile && errors.show_mobile.message
                                }
                            >
                                <option value={1}> SI </option>
                                <option value={0}> NO </option>
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={12}>
                            {list.length > 0 && (
                                <TransferList
                                    data={list}
                                    selectedData={selectedData}
                                    leftTitle="Roles"
                                    onSelectedList={onRolesChange}
                                />
                            )}
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

export default WidgetForm;
