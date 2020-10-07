import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from 'moment';

import { getAll } from "../../actions/reportePagosActions";
import { updateModal } from "../../actions/modalActions";
import LockerForm from "../../components/LockerForm";
import DataTable4 from '../../components/DataTable4'
import reportePagosColumns from '../../interfaces/reportePagosColumns';
import UnpaidInvoicesColumns from '../../interfaces/UnpaidInvoicesColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';
import ReportePagosForm from "../../components/ReportePagoForm";
import { Grid, Chip } from "@material-ui/core";
import _ from 'lodash';

import { getReportedPayments, getUnpaidInvoices } from "../../actions/webServiceActions";
import { getClient } from "../../actions/personActions";
import Paypal from "../../components/Paypal";
import Helper from '../../helpers/utilities';
import ContactForm from "../../components/ContactForm";
import { updatePassword } from "../../actions/userActions";
import RegisterPasswordForm from "../../components/RegisterPasswordForm";

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, .03)"
    }
})(MuiExpansionPanelSummary);

function formatNumber(num: any) {
    num = "" + Math.floor(num * 100.0 + 0.5) / 100.0;

    var i = num.indexOf(".");

    if (i < 0) num += ",00";
    else {
        num = num.substring(0, i) + "," + num.substring(i + 1);
        var nDec = (num.length - i) - 1;
        if (nDec == 0) num += "00";
        else if (nDec == 1) num += "0";
        else if (nDec > 2) num = num.substring(0, i + 3);
    }

    return num;
}

const columns: reportePagosColumns[] = [
    {
        id: "dFechaPago",
        label: "Fecha",
        minWidth: 30,
        component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
    },
    {
        id: "NroReferencia",
        label: "Referencia",
        minWidth: 20,
        align: "center",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "sDescripcion",
        label: "Descripcion",
        minWidth: 10,
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "Destino",
        label: "Cuenta",
        minWidth: 10,
        component: (value: any) => <span> {value.value} </span>
    },
    {
        id: "nMonto",
        label: "Monto",
        minWidth: 30,
        align: "right",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "status",
        label: "Status",
        minWidth: 30,
        align: "center",
        component: (value: any) => {
            let status = '';
            let backgroundColor = '';
            if (value.value == "0") {
                status = "En Proceso";
                backgroundColor = '#2980b9';
            }
            if (value.value == "1") {
                status = "Procesado";
                backgroundColor = '#2ecc71';
            }
            if (value.value == "-1") {
                status = "Rechazado";
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
    },
];

const unpaidInvoicesColumns: UnpaidInvoicesColumns[] = [
    {
        id: "fact_num",
        label: "Nro",
        minWidth: 10,
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "fec_emis",
        label: "Emision",
        minWidth: 10,
        component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
    },
    {
        id: "fec_venc",
        label: "Vencimiento",
        minWidth: 10,
        component: (value: any) => <span>{moment(value.value).format("DD-MM-YYYY")}</span>
    },
    {
        id: "descrip",
        label: "Descripcion",
        minWidth: 10,
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "saldo",
        label: "Saldo",
        minWidth: 10,
        align: "right",
        component: (value: any) => <span>{value.value}</span>
    },
    {
        id: "acumulado",
        label: "Acumulado",
        minWidth: 10,
        align: "right",
        component: (value: any) => <span>{value.value}</span>
    },
];

const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: '18px',
    },
    searchContainer: {
        paddingBottom: '2%'
    },
    paymentFormContainer: {
        marginTop: '50px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
}));

export default function ReportePagos() {
    const [expanded, setExpanded] = useState<string | false>("panel-reportar-pago");
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        unpaidInvoices,
        reportedPayments,
        setUnpaidInvoicestLoading,
        setReportedPaymentsLoading
    } = useSelector((state: any) => state.webServiceReducer);

    const {
        personReducer: { client },
        loginReducer: { user },
        parameterReducer: { listData: parameterList },
    } = useSelector((state: any) => state);

    const paypalParameter = Helper.getParameter(parameterList, 'PAYPAL_CLIENT_ID');
    const habilitarPagoParameter = Helper.getParameter(parameterList, 'HABILITAR_PAGO');
    const paypalClientId = !_.isEmpty(paypalParameter) && habilitarPagoParameter.value == 1 && !_.isEmpty(paypalParameter) && paypalParameter.value !== '' ? paypalParameter.value : null;

    useEffect(() => {
        // dispatch(getUnpaidInvoices());
        // dispatch(getReportedPayments());
    }, [dispatch]);


    const handleExpandedPanel = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const handlePayment = (row: any) => {
    //     // console.log('row', row);
    //     const monto = Number(row.saldo);
    //     dispatch(
    //         updateModal({
    //             payload: {
    //                 status: true,
    //                 element: <Paypal
    //                     description={row.descrip}
    //                     invoiceId={row.fact_num}
    //                     customId={user.username}
    //                     amountDetail={monto.toFixed(2)}
    //                     amount={monto.toFixed(2)}
    //                     client={paypalClientId}
    //                 />,
    //             }
    //         })
    //     );
    // }

    return (
        <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={12}>
                {
                    !_.isEmpty(client) && (
                        <div>
                            <div>{client.cli_des}</div>
                            <div>{client.co_cli}</div>
                        </div>
                    )
                }
            </Grid>
            {/* <Grid item sm={12} xs={12} md={12}>
            <ExpansionPanel
                    expanded={expanded === "panel"}
                    onChange={handleExpandedPanel("panel")}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Typography className={classes.heading}>
                        Facturas por Pagar
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <DataTable4
                    rows={unpaidInvoices.data}
                    columns={unpaidInvoicesColumns}
                    loading={setUnpaidInvoicestLoading}
                    aditionalColumn={unpaidInvoices.length > 0 ? formatNumber(unpaidInvoices.total) : null}
                    aditionalColumnLabel={unpaidInvoices.length > 0 ? "Total" : null}
                    handlePayment={ paypalClientId ? handlePayment : null}
                />
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12}>
                <ExpansionPanel
                    expanded={expanded === "panel-pagos-reportados"}
                    onChange={handleExpandedPanel("panel-pagos-reportados")}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-pagos-reportados-content"
                        id="panel-pagos-reportados-header"
                    >
                        <Typography className={classes.heading}>
                            Pagos Reportados
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DataTable4
                            rows={reportedPayments}
                            columns={columns}
                            loading={setReportedPaymentsLoading}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12}>
                <ExpansionPanel
                    expanded={expanded === "panel-reportar-pago"}
                    onChange={handleExpandedPanel("panel-reportar-pago")}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-reportar-pago-content"
                        id="panel-reportar-pago-header"
                    >
                        <Typography className={classes.heading}>
                            Notificacion de Pagos
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item sm={12} xs={12} md={6}>
                                <ReportePagosForm />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Grid>
    );
}
