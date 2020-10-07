import React, { FunctionComponent } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrder,
  getUnpaidInvoices,
  getReportedPayments,
} from "../../actions/webServiceActions";
import { updateModal } from "../../actions/modalActions";
import snackBarUpdate from "../../actions/snackBarActions";

interface ComponentProps {
  invoiceId: any;
  description: any;
  customId: any;
  amount: any;
  amountDetail: any;
  client: string;
  attemps: number;
}

const Paypal: FunctionComponent<ComponentProps> = ({
  invoiceId,
  description,
  customId,
  amount,
  amountDetail,
  client,
  attemps,
}) => {
  const dispatch = useDispatch();
  const { webServiceReducer: { tasa } } = useSelector((state: any) => state);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <strong>Descripcion:</strong> {description}
          </Grid>
          <Grid item xs={12}>
            <strong>Nro Nota:</strong> {invoiceId}
          </Grid>
          <Grid item xs={12}>
            <strong>Monto:</strong> {amountDetail} USD
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PayPalButton
          createOrder={(data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description,
                  custom_id: customId,
                  invoice_id: invoiceId,
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data: any, actions: any) => {
            // Capture the funds from the transaction
            dispatch(
              updateModal({
                payload: {
                  isLoader: true,
                },
              })
            );
            return actions.order.capture().then(async (details: any) => {
              // Show a success message to your buyer
              // alert("Transaction completed by " + details.payer.name.given_name);
              // OPTIONAL: Call your server to save the transaction
              const body = {
                order: data.orderID,
                invoice: invoiceId,
                amount,
                dTasa: tasa.tasa,
              };
              await dispatch(setOrder(body));
              dispatch(getUnpaidInvoices(attemps));
              dispatch(getReportedPayments());
              dispatch(
                updateModal({
                  payload: {
                    isLoader: false,
                  },
                })
              );
            });
          }}
          options={{
            clientId: client,
          }}
          catchError={(data: any, other: any) => {
            dispatch(
              updateModal({
                payload: {
                  isLoader: false,
                },
              })
            );
            dispatch(
              snackBarUpdate({
                payload: {
                  message: `Su Pago no pudo ser procesado <br> Mensaje de Error de Paypal: ${data}`,
                  status: true,
                  type: "error",
                },
              })
            );
          }}
          onError={(data: any, other: any) => {
            dispatch(
              updateModal({
                payload: {
                  isLoader: false,
                },
              })
            );
            dispatch(
              snackBarUpdate({
                payload: {
                  message: `Su Pago no pudo ser procesado <br> Mensaje de Error de Paypal: ${data}`,
                  status: true,
                  type: "error",
                },
              })
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Paypal;
