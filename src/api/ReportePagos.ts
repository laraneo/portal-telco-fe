import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/reporte-pagos`, {
      params: {
        page,
        perPage,
      },
      headers: headers(),
    });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/reporte-pagos`,
      {
        ...data,
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/reporte-pagos/${id}`, {
      headers: headers(),
    });
  },
  update(id: any, data: any) {
    return AXIOS.put(
      `${Prefix.api}/reporte-pagos/${id}`,
      {
        ...data,
      },
      { headers: headers() }
    );
  },
  filter(form: object, page: number, perPage: number) {
    return AXIOS.get(`${Prefix.api}/reporte-pagos-filter`, {
      params: {
        page: page ? page : 1,
        perPage,
        ...form,
      },
      headers: headers(),
    });
  },
};

export default API;
