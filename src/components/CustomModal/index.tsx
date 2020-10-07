import React from 'react';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import UserForm from '../UserForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { updateModal } from '../../actions/customModalActions';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(3),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    });

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        progress: {
            margin: theme.spacing(2),
            position: 'relative',
            top: '25%'
        },
    }),
);

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {onClose ? (
                <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function CustomModal() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { status, element, isLoader, customSize, title } = useSelector(
        (state: any) => state.customModalReducer
    );

    const onClose = () => {
        dispatch(updateModal({ payload: { status: false, element: <div />, customSize: 'md' } }))
    }

    return (
        <Dialog maxWidth={customSize} aria-labelledby="customized-dialog-title" onClose={onClose} open={status}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3} className="modal-main__content">
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={0}
                            className={`modal-main__loader ${isLoader ? 'modal-main__loader--active' : ''}`}
                        >
                            <CircularProgress className={classes.progress} color="primary" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>{element}</Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
