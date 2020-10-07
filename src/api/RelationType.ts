import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/relation-type`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/relation-type`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/relation-type/${id}`, { headers: headers() });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/relation-type-list`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/relation-type/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/relation-type/${id}`, { headers: headers() });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/relation-type-search?term=${term}`, { headers: headers() });
  }
};

export default API;
