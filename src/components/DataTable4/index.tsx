import React, { FunctionComponent, createElement, useState } from "react";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TablePagination } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import PaymentIcon from '@material-ui/icons/Payment';
import Switch from "@material-ui/core/Switch";
import { green } from "@material-ui/core/colors";

import logo from './paypal-logo.jpeg';

const GreenSwitch = withStyles({
  switchBase: {
    color: '#e74c3c',
    "&$checked": {
      color: '#27ae60'
    },
    "&$checked + $track": {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    root: {
      overflowX: "auto",
      [theme.breakpoints.up('sm')]: {
        width: "100%",
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: window.innerWidth - 20,
        width: window.innerWidth - 20,
      },
    },
    container: {
      maxHeight: 440
    },
    progress: {
      display: "flex",
      justifyContent: "left",
      padding: 10
    },
    tableCellHeader: {
      padding: 4,
      '&:first-child': {
        paddingLeft: 5
      },
      '&:last-child': {
        paddingRight: '0px !important'
      }
    },
  }
));

interface DataTableProps {
  rows: any;
  pagination?: any;
  columns: any;
  isDelete?: boolean;
  handleEdit?: Function;
  handleView?: Function;
  handlePayment?: any;
  handleDelete?: any;
  loading?: boolean;
  onChangePage?: any;
  onChangePerPage?: any;
  fontSize?: string;
  handleSubRowComponent?: Function;
  renderSubRows?: any;
  aditionalColumn?: string;
  aditionalColumnLabel?: any;
  handleSwitch?: Function;
  getSelectRow?: any;
  colorColumn?: string;
  handleRowEdit?: any;
}

const DataTable4: FunctionComponent<DataTableProps> = ({
  rows = [],
  pagination,
  columns,
  isDelete = true,
  handleEdit,
  handleView,
  handleDelete,
  loading,
  onChangePage,
  onChangePerPage,
  handleSubRowComponent,
  renderSubRows,
  fontSize = '12px',
  aditionalColumn,
  aditionalColumnLabel,
  handlePayment,
  handleSwitch,
  getSelectRow,
  colorColumn,
  handleRowEdit
}) => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(0);
  const handlePage = (event: unknown, newPage: number) => {
    const page = pagination.currentPage === 1 ? 2 : newPage;
    onChangePage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePerPage(pagination.currentPage, event.target.value);
  };

  const handleSelect = (id: number) => {
    if (id == selectedRow) {
      setSelectedRow(0);
    } else {
      setSelectedRow(id);
    }
  }

  const handleConditionSwitch = (row: any) => {
    if (row.status == "0") return false;
    if (row.status == "1") return true;
    if (row.status == "-1") return false;
  }

  const renderBody = () => {
    if (rows.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} style={{ fontWeight: 'bold', textAlign: 'center' }} >Sin datos</TableCell>
        </TableRow>
      )
    }
    return rows.map((row: any) => {
      return (
        <React.Fragment>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1} key={row.id}
            style={{ cursor: handleRowEdit ? 'pointer' : 'auto' }}
            onClick={() => {
              if (handleRowEdit) {
                return handleRowEdit(row);
              }
              return {};
            }}
          >
            {columns.map((column: any) => {
              const value = row[column.id];
              const isHandleSubRow = row[column.isHandleSubRow];
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableCellHeader}
                  style={{
                    fontSize,
                    cursor: column.isHandleSubRow && getSelectRow ? 'pointer' : 'auto'
                  }}
                  onClick={() => {
                    if (column.isHandleSubRow && getSelectRow) {
                      return handleSelect(getSelectRow(row));
                    }
                    return {};
                  }}
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : createElement(column.component, { value })}
                </TableCell>
              );
            })}
            {handlePayment && row.originalAmount !== "0" && (
              <TableCell align="right" style={{ minWidth: 5 }}>
                <div onClick={() => handlePayment(row)}>
                  <img src={logo} alt="example image" style={{ cursor: 'pointer' }} width="35" height="25" />
                </div>
              </TableCell>
            )}
            {handleSwitch && (
              <TableCell align="right" style={{ minWidth: 5, fontSize }}>
                <GreenSwitch
                  checked={handleConditionSwitch(row)}
                  onChange={() => handleSwitch(row)}
                />
              </TableCell>
            )}
            <TableCell align="right" style={{ minWidth: 7, display: !handleView && !handleEdit && !handleDelete ? 'none' : 'table-cell' }}>
              {handleView && (
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(row.id)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
              )}
              {handleEdit && (
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(row.id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              )}
              {handleDelete && (
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
          {renderSubRows && renderSubRows(row, selectedRow)}
        </React.Fragment>
      );
    })
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableCellHeader}
                  style={{
                    minWidth: column.minWidth,
                    fontSize,
                    fontWeight: 'bold',
                    background: colorColumn && colorColumn,
                    color: colorColumn ? 'white' : 'black',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {handleSwitch && <TableCell style={{
                minWidth: 5,
                background: colorColumn && colorColumn,
                color: colorColumn ? 'white' : 'black',
              }}></TableCell>}
              <TableCell style={{
                minWidth: 6,
                background: colorColumn && colorColumn,
                color: colorColumn ? 'white' : 'black', display: !handleView && !handleEdit && !handleDelete ? 'none' : 'table-cell'
              }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: 'hidden', textAlign: 'center' }}>
            {loading ? (
              <TableRow className={classes.progress}>
                <TableCell colSpan={columns.length}><CircularProgress color="primary" /></TableCell>
              </TableRow>
            ) : renderBody()}
            {aditionalColumn && (
              <TableRow>
                <TableCell
                  className={classes.tableCellHeader}
                  align="right"
                  style={{
                    minWidth: fontSize
                  }}
                  colSpan={columns.length}
                >
                  {aditionalColumnLabel}: {aditionalColumn}
                </TableCell>
              </TableRow>
            )
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        pagination && (
          <TablePagination
            labelRowsPerPage="Filas"
            labelDisplayedRows={() => `${pagination.from}-${pagination.to}`}
            component="div"
            count={rows.to}
            rowsPerPage={pagination.perPage}
            page={pagination.prevPageUrl === null ? 0 : pagination.currentPage}
            onChangePage={handlePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )
      }
    </Paper>
  );
};

export default DataTable4;
