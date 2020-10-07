import React, { useEffect, useState } from 'react';

import LogoImage from './defaultLogo.png';
import { GetLogo } from '../../actions/parameterActions';
import { useDispatch } from 'react-redux';

export default function Logo() {
    const [ image, setImage ] = useState<string>(LogoImage);
    const dispatch = useDispatch();
    useEffect(() => {
        async function run() {
            const response: any = await dispatch(GetLogo());
            if(response && response.image !=="") {
                setImage(response.image)
            }
        }
        run();
    },[dispatch, setImage])
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={image} width="100" />
        </div>
    )
}