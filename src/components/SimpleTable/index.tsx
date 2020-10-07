import React, { FunctionComponent, createElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import DeleteIcon from "@material-ui/icons/Delete";

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
  tableCellHeader: { 
    '&:first-child': {
      paddingLeft: 10
    },
    '&:last-child': {
      paddingRight: 10
    }
  },
  });

interface DataTableProps {
  rows: any;
  columns: any;
  loading?: boolean;
  fontSize?: string;
}

const SimpleTable: FunctionComponent<DataTableProps> = ({
  rows = [],
  columns,
  loading,
  fontSize = '12px'
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow >
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableCellHeader}
                  style={{
                    minWidth: column.minWidth, 
                    fontSize,
                    background: '#3f51b5',
                    color: 'white',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow className={classes.progress}>
                <CircularProgress color="primary" />
              </TableRow>
            ) : (
                rows.map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} className={classes.tableCellHeader} style={{ fontSize  }} >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : createElement(column.component, { value })}
                          </TableCell>
                        );
                      })}
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

export default SimpleTable;
