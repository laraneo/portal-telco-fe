import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/permissionActions";
import { updateModal } from "../../actions/modalActions";
import PermissionForm from "../../components/PermissionForm";
import DataTable4 from '../../components/DataTable4'
import PermissionColumns from '../../interfaces/PermissionColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: PermissionColumns[] = [
  { 
    id: "id", 
    label: "Id", 
    minWidth: 30,
    component: (value: any) => <span>{value.value}</span> 
  },
  {
    id: "name",
    label: "Clave",
    minWidth: 30,
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "description",
    label: "Descripción",
    minWidth: 30,
    component: (value: any) => <span>{value.value}</span>,
  },
];

export default function Permission() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.permissionReducer);
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
          element: <PermissionForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <PermissionForm />
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

  return (
    <div className="gender-container">
      <div className="gender-container__header">
        <div className="gender-container__title">Permisos</div>
        <div className="gender-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="gender-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable4
          rows={list}
          columns={columns}
          handleEdit={handleEdit}
          isDelete
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
