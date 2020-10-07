import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItem from "@material-ui/core/ListItem";
import FormControl from '@material-ui/core/FormControl';

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get, getList } from "../../actions/menuItemActions";
import { Grid, FormHelperText, ListItemIcon, ListItemText, Input } from "@material-ui/core";

import CustomSelect from "../FormElements/CustomSelect";
import { getAll as getAllRoles } from "../../actions/roleActions";
import { getMenuList } from "../../actions/menuActions";
import TransferList from "../TransferList";
import { getList as getIconList } from "../../actions/menuItemIconActions";
import icons from "../../helpers/collectionIcons";

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
}));

type FormData = {
    name: string;
    slug: string;
    description: string;
    parent: number;
    order: string;
    route: string;
    menu_id: string;
    menu_item_icon_id: string;
    show_mobile: string;
    show_desk: string;
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

const MenuItemForm: FunctionComponent<ComponentProps> = ({
    id
}) => {
    const [selectedData, setSelectedData] = useState<any>([]);
    const [selectedMenuItemIcon, setSelectedMenuItemIcon] = useState<string>("");
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue, getValues, control } = useForm<
        FormData
    >();
    const {
        menuItemReducer: { loading, setParentsLoading, listData: parents },
        roleReducer: { list },
        menuReducer: { menuList },
        menuItemIconReducer: { listData: iconList },
    } = useSelector((state: any) => state);
    const [selectedRoles, setSelectedRoles] = useState<SelectedItems>(
        initialSelectedItems
    );

    const dispatch = useDispatch();

    useEffect(() => {
        register({ name: 'menu_item_icon_id' }, { required: true });
    }, [register])

    useEffect(() => {
        dispatch(getList());
        const selected = selectedRoles;
        selected.itemsToAdd.length = 0;
        selected.itemsToRemove.length = 0;
        setSelectedRoles(selected);
        dispatch(getAllRoles());
        dispatch(getMenuList());
        dispatch(getIconList());
        async function fetch() {
            if (id) {
                const response: any = await dispatch(get(id));
                const { name, slug, description, route, menu_id, parent, menu_item_icon_id, roles, order, show_mobile, show_desk } = response;
                setValue("name", name);
                setValue("slug", slug);
                setValue("description", description);
                setValue("route", route);
                setValue("parent", parent);
                setValue("menu_id", menu_id);
                setValue("order", order);
                setValue("menu_item_icon_id", menu_item_icon_id);
                setValue("show_mobile", show_mobile);
                setValue("show_desk", show_desk);
                if (menu_item_icon_id) {
                    setSelectedMenuItemIcon(menu_item_icon_id);
                } else {
                    setSelectedMenuItemIcon("");
                }
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

    const handleForm = (form: any) => {
        const body = {
            ...form,
            name: form.description,
            roles: selectedRoles,
            slug: form.slug.toLowerCase(),
        }
        if (id) {
            dispatch(update({ id, ...body }));
        } else {
            dispatch(create(body));
        }
    };

    const onRolesChange = (event: any, type: string, selected: any) => {
        let roleList = selectedRoles;
        if (type === "add") {
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
        }
        if (type === "remove") {
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
        }

        setSelectedRoles(roleList);
    };

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Menu Item
        </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <CustomSelect
                                label="Menu"
                                selectionMessage="Seleccione"
                                field="menu_id"
                                register={register}
                                errorsMessageField={
                                    errors.menu_id && errors.menu_id.message
                                }
                            >
                                {menuList.length > 0 && menuList.map((item: any) => (
                                    <option key={item.id} value={item.id}>
                                        {item.description}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomSelect
                                label="Menu Padre"
                                selectionMessage="Seleccione"
                                field="parent"
                                register={register}
                                errorsMessageField={
                                    errors.parent && errors.parent.message
                                }
                                loading={setParentsLoading}
                                optionValueSelected={0}
                            >
                                {parents.length > 0 && parents.map((item: any) => (
                                    <option key={item.id} value={item.id}>
                                        {item.description}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                placeholder="Nombre"
                                field="description"
                                required
                                register={register}
                                errorsField={errors.description}
                                errorsMessageField={
                                    errors.description && errors.description.message
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
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

                        <Grid item xs={6}>
                            <CustomTextField
                                placeholder="Orden"
                                field="order"
                                required
                                register={register}
                                errorsField={errors.order}
                                errorsMessageField={
                                    errors.order && errors.order.message
                                }
                                inputType="number"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomTextField
                                placeholder="Ruta"
                                field="route"
                                register={register}
                                errorsField={errors.route}
                                errorsMessageField={
                                    errors.route && errors.route.message
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <Controller
                                defaultValue={selectedMenuItemIcon}
                                as={
                                    <Select
                                        label="Icono"
                                        labelId="menu_item_icon_id"
                                        name="menu_item_icon_id"
                                        id="menu_item_icon_id"
                                        style={{ width: '100%' }}
                                        onChange={(e: any) => setValue('menu_item_icon_id', e.target.value)}
                                        
                                    >
                                        {iconList.length > 0 && iconList.map((item: any) => {
                                            let Icon = DashboardIcon;
                                            const current = icons.find((e: any) => e.slug === item.slug);
                                            if (current) {
                                                Icon = current.name;
                                            }
                                            return (
                                                <MenuItem key={item.id} value={item.id} >
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <Icon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item.description} />
                                                    </ListItem>
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                }
                                name="menu_item_icon_id"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomSelect
                                label="Mostrar en Escritorio"
                                selectionMessage="Seleccione"
                                field="show_desk"
                                register={register}
                                errorsMessageField={
                                    errors.show_desk && errors.show_desk.message
                                }
                            >
                                <option value={1}> SI </option>
                                <option value={0}> NO </option>
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomSelect
                                label="Mostrar Mobile"
                                selectionMessage="Seleccione"
                                field="show_mobile"
                                register={register}
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

export default MenuItemForm;
