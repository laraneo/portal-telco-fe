import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

interface MultipleSwitchPattern {
    status: string | number;
    color: string;
    toolTip: string;
}

interface ComProps {
    pattern: Array<MultipleSwitchPattern>;
    selected: any;
    handleClick: Function;
}

const MultipleSwitch: FunctionComponent<ComProps> = ({ pattern, selected, handleClick }) => {
    return (
        <Grid container spacing={1} >
            {pattern.length > 0 && pattern.map((e: any) => {
                const Icon = e.status === selected.status ? Brightness1Icon : RadioButtonUncheckedIcon;
                return (
                    <Grid item xs={3} onClick={() => handleClick(e.status, selected)} style={{ cursor: 'pointer' }} >
                         <Tooltip title={e.toolTip} placement="top" >
                            <Icon style={{ color: e.color }} />
                         </Tooltip>
                        
                    </Grid>
                )
            }

            )
            }
        </Grid>
    )
}

export default MultipleSwitch;