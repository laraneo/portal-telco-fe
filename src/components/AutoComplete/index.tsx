import React, {FunctionComponent, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import _ from 'lodash';

import handleDebounce from '../../helpers/handleDebounce';

const useStyles = makeStyles((theme: Theme) => ({
    inputContainer: {
        width: '100%',
    },
}));


type AutoCompleteProps = {
    options: Array<string | number>;
    loading: boolean;
    label: string;
    handleSearch: any;
    getOptionLabel: Function;
    handleSelectShare: Function;
    errorsField?: any;
    errorsMessageField?: any;
    required?: boolean;
    field: string;
    register: Function;
  };

const AutoComplete: FunctionComponent<AutoCompleteProps> = ({
    options,
    loading,
    handleSearch,
    getOptionLabel,
    handleSelectShare,
    label,
    errorsField,
    errorsMessageField,
    required,
    field,
    register,
  }) => {
    const classes = useStyles();

    const seledtedData =
        {
            id: 1,
            description: "Banco de Venezuela",
            created_at: "2020-02-23 23:48:37",
            updated_at: "2020-02-23 23:48:37",
        };
    const openSearch = loading ? false : true;
    
    return (
        <Autocomplete
            id="asynchronous-demo"
            freeSolo
            onInputChange={_.debounce(handleSearch,1000)}
            getOptionLabel={(option: any) => getOptionLabel(option)}
            getOptionSelected={(option: any, value: any) => handleSelectShare(option, value)}
            options={options}
            loading={loading}
            // defaultValue={seledtedData ? seledtedData : null}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    fullWidth
                    name={field}
                    inputRef={register({
                        required: required ? "Required" : false,
                      })}
                    required={errorsField ? true : false}
                    error={errorsField ? true : false}
                    helperText={errorsField && errorsMessageField}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="primary" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            disableCloseOnSelect={false}
        />
    );
}

export default AutoComplete;