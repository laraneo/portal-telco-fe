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
import { update, create, get } from "../../actions/menuActions";
import { Grid } from "@material-ui/core";
import TransferList from "../TransferList";
import { getList as getAllItems } from "../../actions/menuItemActions";

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
    roles: string;
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

const MenuForm: FunctionComponent<ComponentProps> = ({
    id
}) => {
    const [selectedData, setSelectedData] = useState<any>([]);
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue } = useForm<
        FormData
    >();
    const {
        widgetReducer: { loading },
        menuItemReducer: { listData: list }
    } = useSelector((state: any) => state);

    const [selectedItems, setSelectedItems] = useState<SelectedItems>(
        initialSelectedItems
    );

    const dispatch = useDispatch();

    const onMenuItemChange = (event: any, type: string, selected: any) => {
        let menuList = selectedItems;
        if (type === "add") {
            selected.forEach((element: any) => {
                const exist = menuList.itemsToAdd.find(
                    (e: any) => e.id === element.id
                );
                if (_.isEmpty(exist)) {
                    const exist = menuList.itemsToAdd.find(
                        (e: any) => e.id === element.id
                    );
                    if (!_.isEmpty(exist)) {
                        menuList.itemsToRemove.splice(menuList.itemsToRemove.findIndex((i: any) => i.id === element.id), 1);
                    }
                    menuList.itemsToAdd.push(element);
                }
            });
        }
        if (type === "remove") {
            selected.forEach((element: any) => {
                const exist = menuList.itemsToRemove.find(
                    (e: any) => e.id === element.id
                );
                if (_.isEmpty(exist)) {
                    const currentIndex = menuList.itemsToAdd.indexOf(element);
                    menuList.itemsToAdd.splice(currentIndex, 1);
                    menuList.itemsToRemove.push(element);
                }
            });
        }

        setSelectedItems(menuList);
    };

    useEffect(() => {
        const selected = selectedItems;
        selected.itemsToAdd.length = 0;
        selected.itemsToRemove.length = 0;
        setSelectedItems(selected);
        dispatch(getAllItems());
        async function fetch() {
            if (id) {
                const response: any = await dispatch(get(id));
                console.log('response ', response);
                const { name, slug, description, items } = response;
                setValue("name", name);
                setValue("slug", slug);
                setValue("description", description);
                console.log('items', items);
                if (items && items.length > 0) {
                    setSelectedData(items);
                    items.forEach((element: any) => {
                        selectedItems.itemsToAdd.push(element);
                        setSelectedItems(selectedItems);
                    });
                }
                console.log('selectedItems ', selectedItems);
            }
        }
        fetch();
    }, [id, dispatch, setValue, selectedItems]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const handleForm = (form: object) => {
        const body = {
            ...form,
            items: selectedItems,
        }
        if (id) {
            dispatch(update({ id, ...body }));
        } else {
            dispatch(create(body));
        }
    };

    const onPermissionsChange = (event: any) => {
        setValue("roles", JSON.stringify(event));
    };
    console.log('selectedData ', selectedData);
    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Menu
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
                        <Grid item xs={12}>
                            {list.length > 0 && (
                                <TransferList
                                    data={list}
                                    selectedData={selectedData}
                                    leftTitle="Menu Item"
                                    onSelectedList={onMenuItemChange}
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

export default MenuForm;
