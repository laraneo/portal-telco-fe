import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";
import { AxiosResponse } from "axios";

const API = {
  getList() {
    return AXIOS.get(`${Prefix.api}/process-list`, { headers: headers() });
  },
  getProcessByCategory(category: number): Promise<AxiosResponse> {
    return AXIOS.get(`${Prefix.api}/process-by-category`, {
      params: { category },
      headers: headers(),
    });
  },
};

export default API;
