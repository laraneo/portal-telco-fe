import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
        textAlign: 'center',
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -9,
        marginLeft: -9
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '40%',
    },
    select: {
        padding: '10px 0px 10px 0px',
        width: ' 100%',
        backgroundColor: 'transparent',
        border: 0,
        borderBottom: '1px solid grey',
        fontSize: '16px'
    }
}));

export default styles;