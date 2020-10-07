import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';

type ComponentProps = {
    size?: number
}

const Loader: FunctionComponent<ComponentProps> = ({ size = 24 }) => {
    return (<CircularProgress size={size} />)
}

export default Loader;