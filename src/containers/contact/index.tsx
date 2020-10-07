import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import ContactForm from '../../components/ContactForm';

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, .03)"
    }
})(MuiExpansionPanelSummary);

const useStyles = makeStyles((theme: Theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
}));

export default function Contact() {
    const [expanded, setExpanded] = useState<string | false>("panel");
    const classes = useStyles();

    const handleExpandedPanel = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={12}>
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
                            Contacto
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item sm={12} xs={12} md={6}>
                                <ContactForm />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Grid>
    )
}