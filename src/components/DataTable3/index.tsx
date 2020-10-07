import React, { FunctionComponent, createElement } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Switch from "@material-ui/core/Switch";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  progress: {
    display: "flex",
    justifyContent: "left",
    padding: 10
  },
  head: {
    fontSize: "10px"
  }
});

interface DataTableProps {
  data: any;
  columns: any;
  isDelete?: boolean;
  handleEdit?: any;
  handleDelete?: any;
  handleSwitch?: any;
  loading?: boolean;
  fontSize?: string;
}

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

const DataTable3: FunctionComponent<DataTableProps> = ({
  data,
  columns,
  isDelete = true,
  handleSwitch,
  handleEdit,
  handleDelete,
  loading,
  fontSize = "14px"
}) => {
  const classes = useStyles();
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
                  style={{ minWidth: column.minWidth, fontSize }}
                >
                  {column.label}
                </TableCell>
              ))}
              {handleSwitch && <TableCell style={{ minWidth: 5 }}></TableCell>}
              <TableCell style={{ minWidth: 5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow className={classes.progress}>
                <CircularProgress color="primary" />
              </TableRow>
            ) : (
              data.map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column: any) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : createElement(column.component, { value })}
                        </TableCell>
                      );
                    })}
                    {handleSwitch && (
                      <TableCell style={{ minWidth: 5, fontSize, fontWeight: 'bold' }}>
                        <GreenSwitch
                          checked={row.status === "1" ?  true : false}
                          onChange={() => handleSwitch(row.id, row.status)}
                        />
                      </TableCell>
                    )}
                      <TableCell style={{ minWidth: 5, fontSize }}>
                        {
                          handleEdit && (
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(row)}
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                          )
                        }
                        {
                          handleDelete && (
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="secondary"
                              onClick={() => handleDelete(row)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          )
                        }
                      </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable3;
