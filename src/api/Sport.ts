import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const Sport = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/sport`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/sport`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/sport/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/sport/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/sport/${id}`, { headers: headers() });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/sport-search?term=${term}`, { headers: headers() });
  }
};

export default Sport;
