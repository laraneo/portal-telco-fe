import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/relationTypeActions";
import { updateModal } from "../../actions/modalActions";
import RelationTypeForm from "../../components/RelationTypeForm";
import DataTable from '../../components/DataTable'
import PersonRelationColumns from '../../interfaces/PersonRelationColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: PersonRelationColumns[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right"
  },
  {
    id: "inverse_relation",
    label: "Relacion inversa",
    minWidth: 170,
    align: "right"
  },
];

export default function RelationType() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.relationTypeReducer);
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
          element: <RelationTypeForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <RelationTypeForm />
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
    <div className="relation-type-form-container">
      <div className="relation-type-form-container__header">
        <div className="relation-type-form-container__title">Tipo Relacion</div>
        <div className="relation-type-form-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="relation-type-form-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable
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
