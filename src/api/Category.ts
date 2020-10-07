import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const Category = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/category`, { headers: headers() });
  },
  create(data: object) {
    return AXIOS.post(
      `${Prefix.api}/category`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/category/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/category/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/category/${id}`, { headers: headers() });
  }
};

export default Category;
