import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import ProductForm from "../../components/ProductForm";
import { getAll, remove } from '../../actions/productActions';
import { updateModal } from '../../actions/modalActions';
import DataTable from '../../components/DataTable'
import ProductColumn from '../../interfaces/productColumn';

const columns: ProductColumn[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right"
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right"
  }
];

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productReducer.products);
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
          element: <ProductForm id={id} />
        }
      })
    );
  };

  const handleDelete = (id: number) => {
    dispatch(remove(id));
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <ProductForm id={0} />
        }
      })
    );
  }

  return (
    <div className="product-container">
      <div className="product-container__header">
      <div className="product-container__title">Products</div>
      <div className="product-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div>
        <DataTable 
          data={products} 
          columns={columns} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
          isDelete
        />
      </div>
    </div>
  );
}
