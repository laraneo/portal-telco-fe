import React, { useEffect, useState, FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from "@material-ui/core/IconButton";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles( (theme: Theme) => createStyles(
    {
      captcha: {
        backgroundColor: '#3498db',
        fontStyle: 'italic',
        color: 'white',
        textDecoration: 'overline underline line-through',
        fontSize: 20,
        padding: 2,
        textAlign: 'center'
      }
    }
  ));

interface ComProps {
    isValid: Function;
}

const ReCaptcha: FunctionComponent<ComProps> = ({ isValid }) => {
    const [captcha, setCaptcha] = useState<string>("");
    const classes = useStyles();

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        let value = false;
        if (captcha === e.currentTarget.value) {
            value = true;
        } else {
            value = false;
        }
        isValid(value);
    }

    const getRamdom = () => {
        const ramdom = Math.random().toString(20).substring(5).slice(-5);
        setCaptcha(ramdom);
    }
    useEffect(() => {
        getRamdom();
    }, [])

    return (
        <Grid container spacing={1} >
            <Grid item xs={5}><div className={classes.captcha}>{captcha}</div></Grid>
            <Grid item xs={7}>
                <IconButton
                    aria-label="refresh"
                    size="small"
                    color="primary"
                    onClick={() => getRamdom()}
                >
                    <CachedIcon fontSize="inherit" />
            
                </IconButton>
            </Grid>
            <Grid item xs={5}><input type="text" onChange={handleInput} style={{ width: '100%' }} /></Grid>
            
        </Grid>
    )
}

export default ReCaptcha;