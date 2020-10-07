import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getList } from '../../actions/parameterActions'
import Helper from '../../helpers/utilities';

export default function About(){
    const dispatch = useDispatch();
    const { 
        parameterReducer: { listData: parameterList, dbHost, dbParameter, api } 
    } = useSelector((state: any) => state);

    useEffect(() => {
        dispatch(getList());
    },[dispatch])

    const renderParameter = (param: string) => {
        const parameter = Helper.getParameter(parameterList, param);
        return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={3}><strong>{parameter.description}:</strong></Grid>
                <Grid item xs={9} style={{ textAlign: 'left' }}>{parameter.value}</Grid>
            </Grid>
            </Grid>)
    }    

    return (
        <Grid container style={{ marginTop: 20 }}>
            <Grid item xs={12} style={{ marginBottom: 10 }}><strong>Control Socios</strong></Grid>
            {renderParameter("DB_VERSION")}
            {renderParameter("FRONTEND_VERSION")}
            {renderParameter("BACKEND_VERSION")}
            <Grid container>
                <Grid item xs={3}><strong>Endpoint Api URL:</strong></Grid>
                <Grid item xs={9} style={{ textAlign: 'left' }}>{api}</Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3}><strong>Host Base de datos:</strong></Grid>
                <Grid item xs={9} style={{ textAlign: 'left' }}>{dbHost}</Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3}><strong>Base de datos:</strong></Grid>
                <Grid item xs={9} style={{ textAlign: 'left' }}>{dbParameter}</Grid>
            </Grid>
        </Grid>
    )
}