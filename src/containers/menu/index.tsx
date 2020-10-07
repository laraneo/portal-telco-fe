import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAll, remove, search } from "../../actions/menuActions";
import { updateModal } from "../../actions/modalActions";
import MenuForm from "../../components/MenuForm";
import DataTable4 from '../../components/DataTable4'
import Columns from '../../interfaces/MenuColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: Columns[] = [
  { 
    id: "id", 
    label: "Id", 
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "slug",
    label: "Clave",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "description",
    label: "Descripcion",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
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

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.menuReducer);
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
          element: <MenuForm id={id} />,
          customSize: 'medium',
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <MenuForm />,
          customSize: 'medium',
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
        <div className={classes.headerTitle}>Menus</div>
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
