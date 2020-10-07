import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import "./index.sass";
import { updateModal } from "../../actions/modalActions";


/**
 * Generic Modal
 *
 * @param {boolean} status Status Modal
 * @param {html} element Children Component
 * @param {boolean} isLoader Status Loader for asynchronous task
 * @param {boolean} customSize Modal Custom Size, default = 600px
 *
 * behavior :
 *
 * updateModal({ payload : { status : true , element : <Component/> } }) Open Modal
 *
 */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2),
            position: 'relative',
            top: '42%',
        },
    }),
);

export default function Modal() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { status, element, isLoader, customSize, title } = useSelector((state: any) => state.modalReducer);
    return (
        <div className={`modal-container ${status ? "modal-container--active" : ""}`}>
            <div className="modal-backdrop">
                <div className={`modal modal--${customSize}`}>
                    <div className={`modal__loader ${isLoader ? "modal__loader--active" : ""} `}>
                        <CircularProgress className={classes.progress} color="primary" />
                    </div>
                    <div className="modal__header">
                        <div
                            className="modal__header-close-icon"
                            onClick={() =>
                                dispatch(
                                    updateModal({
                                        payload: {
                                            status: false,
                                            element: <div />,
                                            customSize: "",
                                        },
                                    })
                                )
                            }
                        >
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="modal__content">{element}</div>
                    <div className="modal__footer"></div>
                </div>
            </div>
        </div>
    );
}
