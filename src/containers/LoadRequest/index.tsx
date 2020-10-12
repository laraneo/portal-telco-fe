import React from 'react';

import Grid from "@material-ui/core/Grid";
import LoadRequestForm from '../../components/LoadRequestForm';

export default function LoadRequest(): JSX.Element {
    return(
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ fontWeight: 'bold' }} >Cargar Solicitud</Grid>
            <Grid item xs={4}>
                <LoadRequestForm />
            </Grid>
        </Grid>
    )
}