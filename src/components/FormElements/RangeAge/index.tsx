import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

const numbers = {
    value: new RegExp('^[0-9]+$'),
    message: "Solo numeros"
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        field: {
            flexDirection: 'inherit'
        },
        error: {
            color: '#f44336',
        },
        label: {
            padding: '0px !important',
            fontWeight: 'bold',
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.54)',
            marginBottom: '-4px',
        },
        fieldContainer: {
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
        }
    }),
);

type ComponentProps = {
    startField: string;
    endField: string;
    startMsgErr: any;
    endMsgErr: any;
    register: Function;
    required?: boolean;
    watch?: any;
    label: string;
};

const RangeAge: FunctionComponent<ComponentProps> = ({
    startField,
    endField,
    startMsgErr,
    endMsgErr,
    register,
    required,
    watch,
    label
}) => {
    const classes = useStyles();

    const validate = () => {
        let start = watch(startField);
        let end = watch(endField);
        if (parseInt(start) > parseInt(end)) {
            return `${label} inicio debe ser menor`;
        }
        return true;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.label}>{label}:</Grid>
            <Grid item xs={6} className={classes.fieldContainer}>
                <TextField
                    label="Desde"
                    name={startField}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputRef={register({
                        validate,
                        pattern: numbers,
                    })}
                    className={classes.field}
                    error={startMsgErr ? true : false}
                />
            </Grid>
            <Grid item xs={6} className={classes.fieldContainer}>
                <TextField
                    label="Hasta"
                    name={endField}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.field}
                    inputRef={register({
                        pattern: numbers,
                        validate
                    })}
                />
            </Grid>
            <div className={classes.error}>{startMsgErr || endMsgErr}</div>
        </Grid>
    );
}

export default RangeAge;