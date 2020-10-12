import React, { FunctionComponent } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./index.sass";

type CustomSelectProps = {
  field: string;
  required?: boolean;
  disabled?: boolean;
  register: Function;
  errorsMessageField: any;
  selectionMessage?: string;
  label?: string;
  loading?: boolean;
  onChange?: any;
  optionValueSelected?: any;
};

const CustomSelect: FunctionComponent<CustomSelectProps> = ({
  field,
  required = false,
  register,
  errorsMessageField,
  children,
  selectionMessage = "Seleccione",
  label,
  loading = false,
  onChange,
  disabled = false,
  optionValueSelected = ""
}) =>
  loading ? (
    <CircularProgress color="primary" size={40} />
  ) : (
      <div className="custom-select-container">
        {label && (
          <div
            className={`custom-select-container__label custom-select-container__label--${
              disabled ? "disabled" : ""
              }`}
          >
            {label}
          </div>
        )}
        <select
          ref={register({
            required: required ? "Requerido" : false
          })}
          name={field}
          onChange={onChange ? onChange : () => { }}
          disabled={disabled}
        >
          <option value={optionValueSelected}>{selectionMessage}</option>
          {children}
        </select>
        {errorsMessageField && (
          <div className="custom-select-container__message">
            {errorsMessageField}
          </div>
        )
        }
      </div>
    );

export default CustomSelect;
