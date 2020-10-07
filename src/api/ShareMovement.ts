import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const ShareMovement = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/share-movement`, {
      params: {
        page,
        perPage
      },
      headers: headers()
    });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/share-movement-list`, {
      headers: headers()
    });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/share-movement`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/share-movement/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/share-movement/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/share-movement/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/share-movement-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  },
  getLastMovement(share : number) {
    return AXIOS.get(`${Prefix.api}/share-movement-last`, {
      params: { share },
      headers: headers()
    });
  },
};

export default ShareMovement;
