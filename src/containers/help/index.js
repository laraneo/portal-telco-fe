import React from 'react';
import Parse from 'react-html-parser';
import { Grid } from '@material-ui/core';

export default function Help() {
    const helpTemplate = window.TEMPLATE_HELP;
    return (
        <Grid container>
            <Grid item xs={12}>Ayuda</Grid>
            <Grid item xs={12}>{Parse(helpTemplate)}</Grid>
        </Grid>
    )
}