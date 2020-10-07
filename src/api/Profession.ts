import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const Profession = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/profession`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/profession`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/profession/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/profession/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/profession/${id}`, { headers: headers() });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/profession-search?term=${term}`, { headers: headers() });
  }
};

export default Profession;
