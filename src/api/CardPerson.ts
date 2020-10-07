import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(id: number) {
    return AXIOS.get(`${Prefix.api}/card-person`, {
      params: {
        id,
      },
      headers: headers()
    });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/card-person`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/card-person/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/card-person/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number,share: number, order: number) {
    return AXIOS.delete(`${Prefix.api}/card-person/${id}`, {
    data: {
      share,
      order
    }, 
    headers: headers() });
  },
  getCardStatistics() {
    return AXIOS.get(`${Prefix.api}/card-person-statistics`, {
      headers: headers()
    });
  },
};

export default API;
