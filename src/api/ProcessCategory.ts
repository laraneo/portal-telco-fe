import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";
import { AxiosResponse } from "axios";

const API = {
  getList(): Promise<AxiosResponse> {
    return AXIOS.get(`${Prefix.api}/process-category-list`, { headers: headers() });
  },
};

export default API;
