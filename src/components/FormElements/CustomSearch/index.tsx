import React, { FunctionComponent } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

import handleDebounce from '../../../helpers/handleDebounce';

type CustomSearchdProps = {
    handleSearch: Function;
    label?: string;
    errorsField? : any;
};

const CustomTextField: FunctionComponent<CustomSearchdProps> = ({
    handleSearch,
    label,
    errorsField,
}) => (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <SearchIcon />
            </Grid>
            <Grid item>
                <TextField
                    id="input-with-icon-grid"
                    label={label || "Search"}
                    onChange={handleDebounce(handleSearch, 1000)}
                    required={errorsField ? true : false}
                    error={errorsField ? true : false}
                />
            </Grid>
        </Grid>)

export default CustomTextField;