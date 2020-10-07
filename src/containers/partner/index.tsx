import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getPartners, search, searchByPartners } from "../../actions/personActions";
import { updateModal } from "../../actions/modalActions";
import PersonForm from "../../components/PersonForm";
import DataTable4 from '../../components/DataTable4'
import CustomSearch from '../../components/FormElements/CustomSearch';
import PersonColumn from '../../interfaces/PersonColumn';
import { Chip, Grid } from "@material-ui/core";

const columns: PersonColumn[] = [
  {
    id: "id",
    label: "Id", minWidth: 10,
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "shares",
    label: "Acciones",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "rif_ci",
    label: "RIF/CI",
    minWidth: 10,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "isPartner",
    label: "Parentesco",
    minWidth: 30,
    align: "right",
    component: (value: any) => {
      return (
        <Chip
          label={value.value === "1" ? "Socio" : "Familiar"}
          style={{
            backgroundColor: value.value === "1" ? "#2ecc71" : "#f1c40f",
            color: "white",
            fontWeight: "bold",
            fontSize: "10px"
          }}
          size="small"
        />
      )
    }
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },
  // {
  //   id: "card_number",
  //   label: "Carnet",
  //   minWidth: 20,
  //   align: "right",
  //   component: (value: any) => <span>{value.value}</span>,
  // },
  //     {
  //   id: "passport",
  //   label: "Pasaporte",
  //   minWidth: 20,
  //   align: "right",
  //   component: (value: any) => <span>{value.value}</span>,
  // },
  {
    id: "primary_email",
    label: "Correo Primario",
    minWidth: 20,
    align: "right",
    component: (value: any) => <span>{value.value}</span>,
  },

];

export default function Partners() {
  const dispatch = useDispatch();
  const { partnersList, loading, pagination } = useSelector((state: any) => state.personReducer);
  useEffect(() => {
    async function fetchData() {
      dispatch(getPartners());
    }
    fetchData();
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <PersonForm />,
          customSize: 'large'
        }
      })
    );
  }

  const handleSearch = (event: any) => {
    if (event.value.trim() === '') {
      dispatch(getPartners())
    } else {
      dispatch(searchByPartners(event.value))
    }
  }

  const handleEdit = (id: number) => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <PersonForm id={id} />,
          customSize: 'large'
        }
      })
    );
  };

  const handleChangePage = (newPage: number) => {
    const page = pagination.currentPage === 1 ? 2 : newPage;
    dispatch(getPartners(page, pagination.perPage))
  };

  const handlePerPage = (page: number, perPage: number) => {
    dispatch(getPartners(page, perPage))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} >Socios</Grid>
      <Grid item xs={12} sm={12} md={12} >
        <CustomSearch handleSearch={handleSearch} />
        </Grid>
      <Grid item xs={12} sm={12} md={12} >
        <DataTable4
          rows={partnersList}
          pagination={pagination}
          columns={columns}
          loading={loading}
          handleEdit={handleEdit}
          onChangePage={handleChangePage}
          onChangePerPage={handlePerPage}
        />
      </Grid>
    </Grid>
  );
}
