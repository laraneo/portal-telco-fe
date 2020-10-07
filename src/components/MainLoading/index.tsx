
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";

import './index.sass';
import Loader from '../common/Loader';

/**
 * Custom Generic Modal
 *
 * @param {boolean} status Status Loading
 *
 * behavior :
 *
 * import { mainStatusLoading } from 'Actions/mainLoadingActions';
 *
 * this.props.mainStatusLoading(status) Open / Close
 *
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

export default function MainLoader() {
  const { isLoading } = useSelector((state: any) => state.mainLoaderReducer);
  return (
    <div className={`main-loading-container main-loading-container--${isLoading ? "active" : ""} `}>
      <div className="main-loading-container__backdrop">
        <div className={`main-loading-container__content`} >
          <Loader size={60}/>
          <div>Cargando ...</div>
        </div>
      </div>
    </div>
  );
}