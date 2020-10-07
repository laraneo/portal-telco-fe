import React, { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        maxHeight: 440
    },
    progress: {
        display: 'flex',
        justifyContent: 'left',
        padding: 10
    }
});

interface DataTableProps {
    rows: any;
    pagination?: any;
    columns: any;
    handleAssign?: any;
    loading?: boolean;
    onChangePage: any;
    onChangePerPage: any;
    selectOptionData: any;
}

const DataTableAssignPersons: FunctionComponent<DataTableProps> = ({
    rows = [],
    pagination,
    columns,
    handleAssign,
    loading,
    onChangePage,
    onChangePerPage,
    selectOptionData
}) => {
    const classes = useStyles();
    const [selectedPerson, setSelectedPerson] = useState(0);
    const [relationtType, setRelationType] = useState(null);
    const handlePage = (event: unknown, newPage: number) => {
        const page = pagination.currentPage === 1 ? 2 : newPage;
        onChangePage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangePerPage(pagination.currentPage, event.target.value)
    };

    const handleSelect = (event: any, id: number) => {
        setSelectedPerson(id);
        setRelationType(event.target.value);
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
                                    style={{ minWidth: column.minWidth, fontSize: '10px' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? (<TableRow className={classes.progress}><CircularProgress color="primary" /></TableRow>)
                                :
                                rows.map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column: any) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} style={{ fontSize: '10px' }}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell  style={{ fontSize: '10px' }}>
                                                <div>
                                                    <div className="custom-select-container">
                                                        <select name="relation"
                                                            onChange={(e) => handleSelect(e, row.id)}
                                                            style={{ fontSize: '10px' }}
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {
                                                                selectOptionData.map((item: any, i: number) => (
                                                                    <option value={item.id}>{item.description}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell  style={{ fontSize: '10px' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    disabled={selectedPerson === row.id ? false : true}
                                                    onClick={() => handleAssign(row.id, relationtType)}
                                                    style={{ fontSize: '10px' }}
                                                >
                                                    Asignar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        }
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
        </Paper >
    );
};

export default DataTableAssignPersons;
