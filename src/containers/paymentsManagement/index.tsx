import React, { FunctionComponent, useEffect, useState } from "react";
import { Grid, Chip, makeStyles, Button, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MessageIcon from '@material-ui/icons/Message';
import { green } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import _ from 'lodash';

import { getAll, update, filter } from "../../actions/reportePagosActions";
import DataTable4 from "../../components/DataTable4";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { updateModal } from "../../actions/modalActions";
import ReportePagoNotaForm from "../../components/ReportePagoNotaForm";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect";
import CustomTextField from "../../components/FormElements/CustomTextField";
import { getList as getBancoReceptorList } from "../../actions/bancoReceptorActions";
import MultipleSwitch from "../../components/common/MultipleSwitch";
import UnpaidInvoicesColumns from '../../interfaces/UnpaidInvoicesColumns';
import { getUnpaidInvoicesbyShare, setInvoicePayment } from "../../actions/webServiceActions";


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
    },
    submit: {

    }
}));


type InvoiceFormData = {
    invoice: string;
};

type InvoiceFormComponentProps = {
    handle: Function;
};

const InvoiceForm: FunctionComponent<InvoiceFormComponentProps> = ({
    handle
}) => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const classes = useStyles()
    const {
        handleSubmit,
        register,
        errors,
        reset,
        getValues,
    } = useForm<InvoiceFormData>();
    const handleForm = (form: InvoiceFormData) => {
        setConfirm(true)
    }

    const handleConfirmationForm = () => {
        const form = getValues();
        handle(form.invoice);
    }

    const renderConfirmation = () => (
        <Grid container spacing={3} justify="center">
            <Grid item xs={4}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => handleConfirmationForm()}
                >
                    Confirmar
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setConfirm(false)}
                >
                    Regresar
                </Button>
            </Grid>
        </Grid>
    )

    return (
        <Grid container spacing={1} justify="center">
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid item xs={12}>Incluir N° Factura</Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        placeholder="Factura"
                        field="invoice"
                        register={register}
                        errorsField={errors.invoice}
                        errorsMessageField={
                            errors.invoice && errors.invoice.message
                        }
                        required
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }} >
                    {
                        confirm ? renderConfirmation()
                            :
                            (
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Aceptar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            )


                    }
                </Grid>

            </form>
        </Grid >
    )
}


const GreenSwitch = withStyles({
    switchBase: {
        color: '#e74c3c',
        "&$checked": {
            color: '#27ae60'
        },
        "&$checked + $track": {
            backgroundColor: green[500]
        }
    },
    checked: {},
    track: {}
})(Switch);

interface Columns {
    id:
    | "idPago"
    | "nMonto"
    | "NroReferencia"
    | "sDescripcion"
    | "EstadoCuenta"
    | "status"
    | "dFechaProceso"
    | "Login"
    | "Archivos"
    | "codBancoOrigen"
    | "codCuentaDestino"
    | "NroReferencia2"
    | "dFechaRegistro"
    | "dFechaPago"
    | "Moneda"
    | "Nota"
    | "banco_origen"
    | "cuenta"
    label: string;
    minWidth?: number;
    align?: "left" | "right" | "center";
    component?: any;
    isHandleSubRow?: boolean;
}

type FormData = {
    status: string;
    banco: string;
    bancoDestino: string;
    referencia: string;
    accion: string;
    dFechaRegistro: string;
    noInvoice: string;
};


export default function PaymentsManagement() {
    const [disableStatus, setDisableStatus] = useState<boolean>(false);
    const dispatch = useDispatch();
    const classes = useStyles();


    const {
        reportePagosReducer: { list, loading, pagination },
        webServiceReducer: { unpaidInvoices, setUnpaidInvoicestLoading, },
        loginReducer: { user },
    } = useSelector((state: any) => state);

    const {
        handleSubmit,
        register,
        errors,
        reset,
        getValues,
        setValue,
    } = useForm<FormData>();

    const {
        bancoReceptorReducer: { listData: bancoReceptorList }
    } = useSelector((state: any) => state)

    useEffect(() => {
        dispatch(getBancoReceptorList());
    }, [dispatch]);

    const getStatusNote = (row: any) => {
        const value = list.find((e: any) => e.idPago == row);
        return value.Nota;
    }

    const handleNote = (row: any) => {
        dispatch(
            updateModal({
                payload: {
                    status: true,
                    element: <ReportePagoNotaForm id={row} />
                }
            })
        );
    }

    const renderPaymentStatus = (id: any) => {
        const selected = list.find((e: any) => e.idPago == id);
        if (selected) {
            return selected;
        }
        return <div></div>
    }

    const getSelectedRow = (id: any) => {
        const selected = unpaidInvoices.data.find((e: any) => e.portal_id == id);
        if (selected) {
            return selected;
        }
        return null;
    }

    const updateInvoiceConfirmation = (invoice: string, row: any, status: any) => {
        const form = getValues();
        dispatch(update(row.idPago, { status, fact_num: invoice, fact_date: null }, { query: form, page: pagination.currentPage, perPage: pagination.perPage }));
    }

    const handleSwitchStatus = (currentStatus: string, row: any) => {
        const form = getValues();
        let status: any = '';
        status = currentStatus;
        if (currentStatus !== row.status) {
            if (status === 4) {
                dispatch(
                    updateModal({
                        payload: {
                            status: true,
                            element: <InvoiceForm handle={(invoice: string) => updateInvoiceConfirmation(invoice, row, status)} />,
                            customSize: 'small',
                        }
                    })
                );
            } else {
                dispatch(update(row.idPago, { status, fact_num: null, fact_date: null }, { query: form, page: pagination.currentPage, perPage: pagination.perPage }));
            }
            
        }
    };

    const columns: Columns[] = [
        {
            id: "dFechaRegistro",
            label: "Registrado",
            minWidth: 10,
            component: (value: any) => {
                if (value.value) {
                    return <span>{value.value && moment(value.value).format('YYYY-MM-DD')} <br /> {moment(value.value).format('hh:mm:ss A')}</span>
                }
                return <div />
            },
        },
        {
            id: "Login",
            label: "Accion",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "dFechaPago",
            label: "Fecha",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => {
                if (value.value) {
                    return <span>{value.value && moment(value.value).format('YYYY-MM-DD')}</span>
                }
                return <div />
            },
        },
        {
            id: "NroReferencia",
            label: "Referencia",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "sDescripcion",
            label: "Descripcion",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "banco_origen",
            label: "Banco Origen",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value && value.value.cNombreBanco}</span>,
        },
        {
            id: "cuenta",
            label: "Cuenta",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value && value.value.cNumCuenta}</span>,
        },
        {
            id: "Moneda",
            label: "Moneda",
            minWidth: 10,
            align: "left",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "nMonto",
            label: "Monto",
            minWidth: 10,
            align: "right",
            isHandleSubRow: true,
            component: (value: any) => <span>{value.value}</span>,
        },
        {
            id: "idPago",
            label: "Nota",
            minWidth: 10,
            align: "left",
            component: (value: any) => {
                const note = getStatusNote(value.value);
                return (
                    <IconButton
                        aria-label="file"
                        size="small"
                        color="primary"
                        onClick={() => handleNote(value.value)}
                    >
                        <MessageIcon style={{ color: note ? '#2980b9' : '#2c3e50' }} fontSize="inherit" />
                    </IconButton>
                )
            }
        },
        {
            id: "Archivos",
            label: "Comprobante",
            minWidth: 10,
            align: "center",
            component: (value: any) => {
                console.log('value.value ', value.value);
                if (value.value) {
                    return (
                        <a target="_blank" href={value.value} title="comprobante" >
                            <IconButton
                                aria-label="file"
                                size="small"
                                color="primary"
                            >
                                <SearchIcon fontSize="inherit" />
                            </IconButton>
                        </a>
                    )
                }
                return <div />
            }
        },
        {
            id: "idPago",
            label: "",
            minWidth: 10,
            align: "left",
            component: (value: any) => {
                const selected = renderPaymentStatus(value.value);
                const pattern = [
                    { status: 0, color: "#2980b9", toolTip: 'En proceso' },
                    { status: 2, color: "#2ecc71", toolTip: 'Procesado' },
                    { status: -1, color: "#e74c3c", toolTip: 'Rechazado' },
                    { status: 4, color: "#f39c12", toolTip: 'Facturado' },
                ]
                return <MultipleSwitch pattern={pattern} selected={selected} handleClick={handleSwitchStatus} />
            },
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
                    status = "En proceso";
                    backgroundColor = '#2980b9';
                }
                if (value.value == "2") {
                    status = "Procesado";
                    backgroundColor = '#2ecc71';
                }
                if (value.value == "-1") {
                    status = "Rechazado";
                    backgroundColor = '#e74c3c';
                }
                if (value.value == "4") {
                    status = "Facturado";
                    backgroundColor = '#f39c12';
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

    const handleConditionSwitch = (row: any) => {
        if (row.status == "0") return true;
        if (row.status == "1") return false;
        if (row.status == "-1") return false;
    }


    const handleSubRowSwitch = (row: any, subRow: any) => {
        // const status = subRow.status === "1" ? 0 : 1;
        const data = {
            share: row.Login,
            numFactura: subRow.fact_num,
            idPago: row.idPago,
            fechaPago: row.dFechaPago,
        };
        dispatch(setInvoicePayment(data));
    };

    const renderSubRows = (row: any, selected: any) => {
        const invoicesByShareColumns: UnpaidInvoicesColumns[] = [
            {
                id: "status",
                label: "",
                minWidth: 30,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
            },
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
                id: "status",
                label: "",
                minWidth: 30,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
            },
            {
                id: "status",
                label: "",
                minWidth: 30,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
            },
            {
                id: "status",
                label: "",
                minWidth: 10,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
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
                minWidth: 30,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
            },
            {
                id: "status",
                label: "",
                minWidth: 10,
                align: "left",
                component: (value: any) => <span>&nbsp;</span>
            },
            {
                id: "portal_id",
                label: "",
                minWidth: 10,
                align: "right",
                component: (value: any) => {
                    const selected = getSelectedRow(value.value);
                    let status = '';
                    let backgroundColor = '';
                    if (selected.status == "1") {
                        status = "Pendiente";
                        backgroundColor = '#e74c3c';
                    }
                    if (selected.status == "0") {
                        status = "Pagado";
                        backgroundColor = '#2ecc71';
                    }
                    return (
                        <div>
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
                            <GreenSwitch
                                checked={handleConditionSwitch(selected)}
                                onChange={() => handleSubRowSwitch(row, selected)}
                            />
                        </div>
                    )
                }
            }
        ];
        if (row.idPago == selected) {
            return (
                <TableRow>
                    <TableCell colSpan={13}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.subtitleRow}>
                                <Chip label="Facturas" color="primary" />
                            </Grid>
                            <Grid item xs={12}>
                                <DataTable4
                                    rows={unpaidInvoices.data}
                                    columns={invoicesByShareColumns}
                                    loading={setUnpaidInvoicestLoading}
                                    fontSize="10px"
                                    colorColumn='#3f51b5'
                                />
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableRow>
            )
        }
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         const form = getValues();
    //         dispatch(filter(form));
    //     }
    //     fetchData();
    // }, [dispatch]);

    const handleSearch = (event: any) => {
        if (event.value.trim() === "") {
            dispatch(getAll());
        } else {
            //dispatch(search(event.value))
        }
    };

    const handleForm = async (form: FormData) => {
        dispatch(filter(form));
    };

    const handleChangePage = (newPage: number) => {
        const form = getValues();
        const page = pagination.currentPage === 1 ? 2 : newPage;
        dispatch(filter(form, page, pagination.perPage))
    };

    const handlePerPage = (page: number, perPage: number) => {
        const form = getValues();
        dispatch(filter(form, page, perPage))
    }

    const getSelectRow = (row: any) => {
        if (row.status === 0) {
            dispatch(getUnpaidInvoicesbyShare(row.Login));
            return row.idPago;
        }
        return 0;
    }

    const onSelectNoInvoice = (event: any) => {
        if (event.target.value === "1") {
            setDisableStatus(true);
            setValue('status', '');
        } else {
            setDisableStatus(false);
        }
    }

    return (
        <Grid container spacing={3}>
            <form
                className={classes.form}
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <Grid item xs={12} style={{ fontSize: 18 }}>Gestion de Cobranza</Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        placeholder="Accion"
                                        field="accion"
                                        register={register}
                                        errorsField={errors.accion}
                                        errorsMessageField={
                                            errors.accion && errors.accion.message
                                        }
                                        Icon={SearchIcon}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomSelect
                                        label="Status"
                                        selectionMessage="Seleccione"
                                        field="status"
                                        register={register}
                                        errorsMessageField={
                                            errors.status && errors.status.message
                                        }
                                        disabled={disableStatus}
                                    >
                                        <option value={0}> En Proceso </option>
                                        <option value={2}> Procesado </option>
                                        <option value={-1}> Rechazado </option>
                                    </CustomSelect>
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        placeholder="Referencia"
                                        field="referencia"
                                        register={register}
                                        errorsField={errors.referencia}
                                        errorsMessageField={
                                            errors.referencia && errors.referencia.message
                                        }
                                        Icon={SearchIcon}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" type="submit" style={{ marginTop: 15 }}>
                                        Buscar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomTextField
                                placeholder="Banco"
                                field="banco"
                                register={register}
                                errorsField={errors.banco}
                                errorsMessageField={
                                    errors.banco && errors.banco.message
                                }
                                Icon={SearchIcon}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <CustomSelect
                                label="Cuenta"
                                selectionMessage="Seleccione"
                                field="bancoDestino"
                                register={register}
                                errorsMessageField={
                                    errors.bancoDestino &&
                                    errors.bancoDestino.message
                                }
                            >
                                {bancoReceptorList.map((item: any) => (
                                    <option key={item.cCodCuenta} value={item.cCodCuenta}>
                                        {`${item.cNombreBanco} - ${item.cNumCuenta.substring(12, 16)}`}
                                    </option>
                                ))}
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomTextField
                                placeholder="Fecha"
                                field="dFechaRegistro"
                                register={register}
                                errorsField={errors.dFechaRegistro}
                                errorsMessageField={
                                    errors.dFechaRegistro && errors.dFechaRegistro.message
                                }
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <CustomSelect
                                label="Facturado"
                                selectionMessage="Seleccione"
                                field="noInvoice"
                                register={register}
                                errorsMessageField={
                                    errors.noInvoice && errors.noInvoice.message
                                }
                                onChange={onSelectNoInvoice}
                            >
                                <option value={1}> SI </option>
                                <option value={0}> NO </option>
                            </CustomSelect>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    !_.isEmpty(user) && user.share_from !== null && user.share_to !== null && (
                        <Grid item xs={12} style={{ marginTop: 20, fontWeight: 'bold' }}>
                            {`Acciones asignadas ${user.share_from} hasta ${user.share_to}`}
                        </Grid>
                    )
                }
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <DataTable4
                        rows={list}
                        pagination={pagination}
                        columns={columns}
                        loading={loading}
                        onChangePage={handleChangePage}
                        onChangePerPage={handlePerPage}
                        getSelectRow={getSelectRow}
                        renderSubRows={renderSubRows}
                    />
                </Grid>
            </form>
        </Grid>
    );
}
