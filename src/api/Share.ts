import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/share`, {
      params: {
        page,
        perPage
      },
      headers: headers()
    });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/share`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/share/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/share/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/share/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/share-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  },
  getByPartner(id: number) {
    return AXIOS.get(`${Prefix.api}/share-by-partner/${id}`, { headers: headers() });
  },
  searchToAssign(term: string) {
    return AXIOS.get(`${Prefix.api}/search-to-assign`, {
      params: {
        term,
      },
      headers: headers()
    });
  },
  filter(form: object, page: number, perPage: number) {
    return AXIOS.get(`${Prefix.api}/share-filter`, {
      params: {
        page: page ? page : 1,
        perPage,
        ...form,
      },
      headers: headers()
    });
  },
  filterReport(queryString: object) {
    return AXIOS.get(`${Prefix.api}/share-filter-report`, {
      params: { ...queryString },
      headers: headers()
    });
  },
};

export default API;
