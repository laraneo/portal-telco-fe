import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAll, remove, search } from "../../actions/menuItemActions";
import { updateModal } from "../../actions/modalActions";
import MenuItemForm from "../../components/MenuItemForm";
import DataTable4 from '../../components/DataTable4'
import Columns from '../../interfaces/MenuItemColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';
import icons from "../../helpers/collectionIcons";
import SettingsIcon from '@material-ui/icons/Settings';

const columns: Columns[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "father",
    label: "Menu",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value ? value.value.description : '-'}</span>
  },
  {
    id: "icons",
    label: "Icono",
    minWidth: 10,
    align: "right",
    component: (value: any) => {
      let Icon = SettingsIcon;
      if (value.value) {
        let currenMenutIcon = icons.find((e: any) => e.slug === value.value.slug);
        if (currenMenutIcon) {
          Icon = currenMenutIcon.name;
        }
      }
      return <span>{value.value ? <Icon /> : <div />}</span>
    }
  },
  {
    id: "main",
    label: "Padre",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value ? value.value.description : '-'}</span>
  },
  {
    id: "description",
    label: "Description",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "slug",
    label: "Clave",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "route",
    label: "Ruta",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "order",
    label: "Orden",
    minWidth: 10,
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
  {
    id: "show_desk",
    label: "Escritorio",
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

export default function MenuItem() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.menuItemReducer);
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
          element: <MenuItemForm id={id} />,
          customSize: 'medium'
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <MenuItemForm />,
          customSize: 'medium'
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
        <div className={classes.headerTitle}>Menu Items</div>
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
