import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/transactionTypeActions";
import { updateModal } from "../../actions/modalActions";
import TransactionTypeForm from "../../components/TransactionTypeForm";
import DataTable1 from '../../components/DataTable1'
import TransactionTypeColumn from '../../interfaces/TransactionTypeColumn';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: TransactionTypeColumn[] = [
  { id: "id", label: "Id", minWidth: 10 },
  {
    id: "description",
    label: "Description",
    minWidth: 30,
    align: "right"
  },
  {
    id: "rate",
    label: "Tarifa",
    minWidth: 30,
    align: "right"
  },
];

export default function TransactionType() {
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.transactionTypeReducer);
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
          element: <TransactionTypeForm id={id} />
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <TransactionTypeForm />
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
    <div className="bank-container">
      <div className="bank-container__header">
        <div className="bank-container__title">Tipos de Transaciones</div>
        <div className="bank-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="bank-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable1
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
