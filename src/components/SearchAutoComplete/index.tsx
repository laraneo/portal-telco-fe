import React, { FunctionComponent, useState } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    options: {
      height: '100px',
      overflowY: 'auto',
    },
  }));

type CustomSearchdProps = {
  handleSearch: any;
  loading: boolean;
  options: any;
  handleSelect: Function;
  errorsField?: any;
  errorsMessageField?: any;
  required?: boolean;
  label: string;
  getOptionLabel: any;
  selecDefault?: any;
};

const SearchAutoComplete: FunctionComponent<CustomSearchdProps> = ({
  handleSearch,
  loading,
  options,
  handleSelect,
  errorsField,
  errorsMessageField,
  required,
  label,
  getOptionLabel,
  selecDefault,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onSelect = (row: any) => {
    setInputValue(getOptionLabel(row));
    handleSelect(row);
    setOpen(false);
  };

  const onChange = async (event: any) => {
    setOpen(false);
    setInputValue(event.target.value);
    await handleSearch(event.target.value);
    setOpen(true);
  };

  const setInput = () => {
    const partner = selecDefault();
    if (partner) onSelect(partner);
  };
  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={selecDefault ? 10 : 12}>
            <TextField
              id="input-with-icon-grid"
              label={label}
              autoComplete="off"
              onChange={onChange}
              required={errorsField ? true : false}
              error={errorsField ? true : false}
              helperText={errorsField && errorsMessageField}
              value={inputValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="primary" size={20} />
                    ) : null}
                  </React.Fragment>
                )
              }}
            />
          </Grid>
          {
              selecDefault && (
                <Grid item xs={2}>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setInput()}>
                  <FileCopyIcon />
                </IconButton>
              </Grid>
              )
          }
        </Grid>
      </Grid>
      {open && (
        <Grid item xs={12}>
          <List component="nav" className={classes.options}>
            {options.length > 0 ?
              options.map((element: any, i: number) => (
                <ListItem button key={i} onClick={() => onSelect(element)}>
                  <ListItemText primary={getOptionLabel(element)} />
                </ListItem>
              ))
              :
              (<ListItem >
              <ListItemText primary={'Sin datos'} />
            </ListItem>)
            }
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchAutoComplete;
