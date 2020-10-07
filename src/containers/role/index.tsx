import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/roleActions";
import { updateModal } from "../../actions/modalActions";
import RoleForm from "../../components/RoleForm";
import DataTable2 from '../../components/DataTable2'
import RoleColumns from '../../interfaces/RoleColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: RoleColumns[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 30,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "slug",
    label: "Clave",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "description",
    label: "Descripción",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
];

export default function Role() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.roleReducer);
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
          element: <RoleForm id={id} />,
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
          element: <RoleForm />,
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

  return (
    <div className="gender-container">
      <div className="gender-container__header">
        <div className="gender-container__title">Roles</div>
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
        <DataTable2
          data={list}
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
