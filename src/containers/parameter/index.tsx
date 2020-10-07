import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAll, remove, search } from "../../actions/parameterActions";
import { updateModal } from "../../actions/modalActions";
import ParameterForm from "../../components/ParameterForm";
import DataTable4 from '../../components/DataTable4'
import Columns from '../../interfaces/ParameterColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: Columns[] = [
  { 
    id: "id", 
    label: "Id", 
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "description",
    label: "Description",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "parameter",
    label: "Parametro",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "value",
    label: "Valor",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "eliminable",
    label: "Eliminable",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value === "1" ? 'SI' : 'NO'}</span>
  },
];

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '18px',
  },
  searchContainer: {
    paddingBottom: '2%'
  }
}));

export default function Parameter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.parameterReducer);
  useEffect(() => {
    async function fetchData() {
      dispatch(getAll());
    }
    fetchData();
  }, [dispatch]);

  const handleEdit = (id: number) => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <ParameterForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <ParameterForm />
        }
      })
    );
  }

  const handleDelete = (id: number) => {
    dispatch(remove(id));
  };

  const handleSearch = (event: any) => {
    if (event.value.trim() === '') {
      dispatch(getAll())
    } else {
      dispatch(search(event.value))
    }
  }

  const handleChangePage = (newPage: number) => {
    const page = pagination.currentPage === 1 ? 2 : newPage;
    dispatch(getAll(page, pagination.perPage))
  };

  const handlePerPage = (page: number, perPage: number) => {
    dispatch(getAll(page, perPage))
  }

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.headerTitle}>Parametros</div>
        <div onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className={classes.searchContainer}>
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable4
          rows={list}
          pagination={pagination}
          columns={columns}
          handleEdit={handleEdit}
          isDelete
          handleDelete={handleDelete}
          loading={loading}
          onChangePage={handleChangePage}
          onChangePerPage={handlePerPage}
        />
      </div>
    </div>
  );
}
