import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll } from "../../actions/categoryActions";
import { updateModal } from "../../actions/modalActions";
import CategoryForm from "../../components/CategoryForm";
import DataTable from '../../components/DataTable'
import CategoryColumn from '../../interfaces/categoryColumn';

const columns: CategoryColumn[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right"
  },
];

export default function Category() {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categoryReducer.categories);
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
          element: <CategoryForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <CategoryForm id={0} />
        }
      })
    );
  }
  return (
    <div className="category-container">
      <div className="category-container__header">
      <div className="category-container__title">Categories</div>
      <div className="category-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div>
        <DataTable 
          data={categories} 
          columns={columns} 
          handleEdit={handleEdit}
          handleDelete={() => {}}
          isDelete={false}
        />
      </div>
    </div>
  );
}
