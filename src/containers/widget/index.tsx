import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAll, remove, search } from "../../actions/widgetActions";
import { updateModal } from "../../actions/modalActions";
import WidgetForm from "../../components/WidgetForm";
import DataTable4 from '../../components/DataTable4'
import Columns from '../../interfaces/widgetColumns';
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
  {
    id: "order",
    label: "Orden",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "show_mobile",
    label: "Mobile",
    minWidth: 30,
    align: "right",
    component: (value: any) => {
      let status = "";
      if (value.value === "0") status = "NO";
      if (value.value === "1") status = "SI";
      return <span>{status}</span>;
    }
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

export default function Widget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.widgetReducer);
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
          element: <WidgetForm id={id} />,
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
          element: <WidgetForm />,
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
        <div className={classes.headerTitle}>Widgets</div>
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
