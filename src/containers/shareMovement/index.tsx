import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, search } from "../../actions/shareMovementActions";
import { updateModal } from "../../actions/modalActions";
import ShareMovemenForm from "../../components/ShareMovementForm";
import DataTable4 from '../../components/DataTable4'
import ShareMovementColumns from '../../interfaces/ShareMovementColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: ShareMovementColumns[] = [
  { 
    id: "id", 
    label: "Id", 
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "transaction",
    label: "Tipo",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "share",
    label: "N° Accion",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value.share_number}</span>
  },
  {
    id: "partner",
    label: "Socio",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value.name} {value.value.last_name}</span>
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value.name} {value.value.last_name}</span>
  },
  {
    id: "description",
    label: "Description",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "rate",
    label: "Tarifa",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "number_sale_price",
    label: "Precio Venta",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "number_procesed",
    label: "N° Procesado",
    minWidth: 30,
    align: "left",
    
    component: (value: any) => <span>{value.value}</span>
  },
];

export default function ShareMovement() {
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.shareMovementReducer);
  useEffect(() => {
    async function fetchData() {
      dispatch(getAll());
    }
    fetchData();
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <ShareMovemenForm />
        }
      })
    );
  }

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
    <div className="share-movement-container">
      <div className="share-movement-container__header">
        <div className="share-movement-container__title">Movimientos de Acciones</div>
        <div className="share-movement-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="share-movement-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable4
          rows={list}
          pagination={pagination}
          columns={columns}
          loading={loading}
          onChangePage={handleChangePage}
          onChangePerPage={handlePerPage}
        />
      </div>
    </div>
  );
}
