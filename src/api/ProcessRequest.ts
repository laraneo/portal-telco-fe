import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";
import { AxiosResponse } from "axios";

const API = {
  getAll(params: any): Promise<AxiosResponse> {
    return AXIOS.get(`${Prefix.api}/process-request`, {
      params: { ...params },
      headers: headers()
    });
  },
  getAllByManager(params: any): Promise<AxiosResponse> {
    return AXIOS.get(`${Prefix.api}/process-request-by-manager`, {
      params: { ...params },
      headers: headers()
    });
  },
  getUsersByManager(params: any): Promise<AxiosResponse> {
    return AXIOS.get(`${Prefix.api}/users-by-manager`, {
      params: { ...params },
      headers: headers()
    });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/process-request-list`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/process-request`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/process-request/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/process-request/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/process-request/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/process-request-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  }
};

export default API;
