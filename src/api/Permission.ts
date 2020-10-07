import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/permission`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/permission`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/permission/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/permission/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/permission/${id}`, {
      headers: headers()
    });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/permission-search?term=${term}`, {
      headers: headers()
    });
  },
  searchToAssign(term: string) {
    return AXIOS.get(`${Prefix.api}/search-person-to-assign`, {
      params: { term },
      headers: headers()
    });
  }
};

export default API;
