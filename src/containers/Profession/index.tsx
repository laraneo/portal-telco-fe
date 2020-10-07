import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/professionActions";
import { updateModal } from "../../actions/modalActions";
import ProfessionForm from "../../components/ProfessionForm";
import DataTable from '../../components/DataTable'
import MasterTableColumns from '../../interfaces/MasterTableColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: MasterTableColumns[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right"
  },
];

export default function Profession() {
  const dispatch = useDispatch();
  const { professions, loading } = useSelector((state: any) => state.professionReducer);
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
          element: <ProfessionForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <ProfessionForm />
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
    <div className="professsion-container">
      <div className="professsion-container__header">
        <div className="professsion-container__title">Profesion</div>
        <div className="professsion-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="professsion-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable
          data={professions}
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
