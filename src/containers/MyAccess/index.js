import React from "react";
import { Grid, Paper } from "@material-ui/core";
import QRCode from "../../components/QRCode";
import { useSelector } from "react-redux";

export default function MyAccess() {
  const {
    loginReducer: { user },
  } = useSelector((state) => state);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Mi Acceso
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start">
          {user.partnerProfile && (
            <Grid item xs={3}>
                <QRCode code={user.partnerProfile.access_code} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
