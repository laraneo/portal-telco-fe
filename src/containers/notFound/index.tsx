import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function NotFound(){
    const history = useHistory();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>La pagina que intenta acceder no existe</Grid>
            <Grid item xs={12}>
                <Button 
                    type="button" 
                    color="primary"
                    onClick={() => history.push('/dashboard/main')}
                >
                    Menu Principal
                </Button>
            </Grid>
        </Grid>
    )
}