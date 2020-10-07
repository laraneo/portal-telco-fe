import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Button, Chip } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CustomTextField from '../../components/FormElements/CustomTextField';
import DataTable4 from '../../components/DataTable4';
import moment from 'moment';
import { getUnpaidInvoicesbyShare } from '../../actions/webServiceActions';
import snackBarUpdate from '../../actions/snackBarActions';
import CustomSelect from '../../components/FormElements/CustomSelect';
import { search } from './filter';

interface Columns {
    id:
    | ""
    | "status"
    | "co_cli"
    | "fact_num"
    | "fec_emis"
    | "fec_venc"
    | "descrip"
    | "total_fac"
    | "tipo"
    | "fec_emis_fact"
    | "co_cli2"
    | "idPago"
    | "acumulado"
    | "saldo"
    | "portal_id"
    | "iStatusDisabled";
    label: string;
    minWidth?: number;
    align?: "left" | "right" | "center";
    component?: any;
}

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    printButtonContainer: {
        textAlign: "left",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    rangleTitle: {
        lineHeight: 3,
        fontWeight: 'bold'
    },
    filtersContainer: {
        marginBottom: 10
    },
    subtitleRow: {
        textAlign: 'center',
    },
    personSearchTitle: {
        lineHeight: 4
    }
}));

const columns: Columns[] = [
    {
        id: "fec_emis",
        label: "Emision",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
    },
    {
        id: "fec_venc",
        label: "Vencimiento",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
    },
    {
        id: "fact_num",
        label: "Nro",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "descrip",
        label: "Descripcion",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "total_fac",
        label: "Monto",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "saldo",
        label: "Saldo",
        minWidth: 10,
        align: "left",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "status",
        label: "",
        minWidth: 20,
        align: "left",
        component: (value: any) => {
            let status = '';
            let backgroundColor = '';
            if (value.value == "0") {
                status = "Aprobado";
                backgroundColor = '#2ecc71';
            }
            if (value.value == "1") {
                status = "Pendiente";
                backgroundColor = '#e74c3c';
            }
            return (
                <Chip
                    label={status}
                    style={{
                        backgroundColor,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "10px"
                    }}
                    size="small"
                />
            )
        }
    }
];

type FormData = {
    share: string;
    status: string;
    fact_num: string;
    descrip: string;
};

type queryObject = {
    status?: string;
    fact_num?: string;
    descrip?: string;
};

export default function PendingInvoices() {

    const [filter, setFilter] = useState<Array<string | number>>([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const {
        webServiceReducer: { unpaidInvoices: list, setUnpaidInvoicestLoading: loading, }
    } = useSelector((state: any) => state);


    const {
        handleSubmit,
        register,
        errors,
        reset,
        getValues
    } = useForm<FormData>();

    const getQuery = (form: FormData) => {
        const query: queryObject = {};

        if (form.status !== '') query.status = form.status;
        if (form.fact_num !== '') query.fact_num = form.fact_num;
        if (form.descrip !== '') query.descrip = form.descrip;

        return query;
    }

    const handleForm = async (form: FormData) => {
        if (form.share !== '') {
            const res: any = await dispatch(getUnpaidInvoicesbyShare(form.share));
            let data = res.data;

            const query = getQuery(form);

            if (!_.isEmpty(query)) {
                data = data.filter(search, query);
            }
            setFilter(data);
        } else {
            dispatch(snackBarUpdate({
                payload: {
                    message: 'Introducir N° de accion',
                    status: true,
                    type: "error",
                },
            }))
        }
    };

    return (
        <Grid container spacing={3}>
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid item xs={12}>Facturas por Socio</Grid>

                <Grid item xs={12} style={{ marginBottom: 20 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <CustomTextField
                                placeholder="Accion"
                                field="share"
                                register={register}
                                errorsField={errors.share}
                                errorsMessageField={
                                    errors.share && errors.share.message
                                }
                                Icon={SearchIcon}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <CustomSelect
                                label="Status"
                                selectionMessage="Seleccione"
                                field="status"
                                register={register}
                                errorsMessageField={
                                    errors.status && errors.status.message
                                }
                            >
                                <option value={1}> Pendiente </option>
                                <option value={0}> Aprobado </option>
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <CustomTextField
                                placeholder="Factura"
                                field="fact_num"
                                register={register}
                                errorsField={errors.fact_num}
                                errorsMessageField={
                                    errors.fact_num && errors.fact_num.message
                                }
                                Icon={SearchIcon}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <CustomTextField
                                placeholder="Descripcion"
                                field="descrip"
                                register={register}
                                errorsField={errors.descrip}
                                errorsMessageField={
                                    errors.descrip && errors.descrip.message
                                }
                                Icon={SearchIcon}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 15 }}>
                            Buscar
                        </Button>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DataTable4
                        rows={filter}
                        columns={columns}
                        loading={loading}
                    />
                </Grid>
            </form>
        </Grid>
    )
}