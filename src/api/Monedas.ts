import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getList() {
    return AXIOS.get(`${Prefix.api}/monedas`, { headers: headers() });
  },
};

export default API;
