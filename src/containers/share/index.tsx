import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import Chip from "@material-ui/core/Chip";

import './index.sass';
import { getAll, search } from "../../actions/shareActions";
import { updateModal } from "../../actions/modalActions";
import ShareForm from "../../components/ShareForm";
import DataTable4 from '../../components/DataTable4'
import ShareColumns from '../../interfaces/ShareColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: ShareColumns[] = [
  { 
    id: "id", 
    label: "Id", 
    minWidth: 10,
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "share_number",
    label: "N° Accion",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "father_share",
    label: "N° Accion Padre",
    minWidth: 30,
    align: "left",
    component: (value: any) => {
        if(value.value) {
            return (<span>{value.value.share_number}</span>)
        }
        return (<Chip
          label="Principal"
          style={{
            fontWeight: "bold",
            fontSize: "11px"
          }}
          size="small"
          color="primary"
        />)
    }
  },
  {
    id: "share_type",
    label: "Tipo Accion",
    minWidth: 30,
    align: "left",
    component: (value: any) => {
        if(value.value) {
            return (<span>{value.value.code}</span>)
        }
        return (<span>Asignada como Padre</span>)
    }
  },
  {
    id: "partner",
    label: "Socio",
    minWidth: 30,
    align: "left",
    component: (value: any) => {
        if(value.value) {
            return (<span>{value.value.name} {value.value.last_name}</span>)
        }
        return (<span>N/A</span>)
    }
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 30,
    align: "left",
    component: (value: any) => {
        if(value.value) {
            return (<span>{value.value.name} {value.value.last_name}</span>)
        }
        return (<span>N/A</span>)
    }
  },
  {
    id: "payment_method",
    label: "Forma de Pago",
    minWidth: 30,
    align: "left",
    component: (value: any) => {
        if(value.value) {
            return (<span>{value.value.description}</span>)
        }
        return (<span>N/A</span>)
    }
  },
];

export default function Share() {
  const dispatch = useDispatch();
  const { list, loading, pagination } = useSelector((state: any) => state.shareReducer);
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
          element: <ShareForm />
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
    <div className="share-container">
      <div className="share-container__header">
        <div className="share-container__title">Acciones</div>
        <div className="share-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="share-container__search">
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
