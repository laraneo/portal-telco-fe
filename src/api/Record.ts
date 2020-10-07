import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/record`, {
      params: {
        page,
        perPage
      },
      headers: headers()
    });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/record-list`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/record`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/record/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/record/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/record/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/record-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  },
  getRecordsByPerson(form: object, page: number, perPage: number) {
    return AXIOS.get(`${Prefix.api}/record-by-person`, {
      params: {
        page: page ? page : 1,
        perPage,
        ...form
      },
      headers: headers()
    });
  },
  getRecordStatistics() {
    return AXIOS.get(`${Prefix.api}/record-statistics`, {
      headers: headers()
    });
  },
};

export default API;
