import React, { FunctionComponent } from "react";
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
  }
});

interface DataTableProps {
  rows: any;
  pagination?: any;
  columns: any;
  isDelete?: boolean;
  handleEdit?: Function;
  handleDelete?: any;
  loading?: boolean;
  onChangePage: any;
  onChangePerPage: any;
}

const DataTable1: FunctionComponent<DataTableProps> = ({
  rows = [],
  pagination,
  columns,
  isDelete = true,
  handleEdit,
  handleDelete,
  loading,
  onChangePage,
  onChangePerPage
}) => {
  const classes = useStyles();

  const handlePage = (event: unknown, newPage: number) => {
    const page = pagination.currentPage === 1 ? 2 : newPage;
    onChangePage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePerPage(pagination.currentPage, event.target.value);
  };

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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {handleEdit && <TableCell  style={{ minWidth: 5 }}></TableCell>}
              {handleDelete && <TableCell style={{ minWidth: 5 }}></TableCell>}
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
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {handleEdit && (
                      <TableCell  align="right" style={{ minWidth: 5 }}>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(row.id)}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    )}
                    {handleDelete && (
                      <TableCell  align="right" style={{ minWidth: 5 }}>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="secondary"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Filas"
        rowsPerPageOptions={[5, 10, 20, 30, 40]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.perPage}
        page={pagination.prevPageUrl === null ? 0 : pagination.currentPage}
        onChangePage={handlePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable1;
