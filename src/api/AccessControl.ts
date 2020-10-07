import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/access-control`, {
      params: {
        page,
        perPage
      },
      headers: headers()
    });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/access-control-list`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/access-control`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/access-control/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/access-control/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/access-control/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/access-control-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  },
  filter(form: object, page: number, perPage: number) {
    return AXIOS.get(`${Prefix.api}/access-control-filter`, {
      params: {
        page: page ? page : 1,
        perPage,
        ...form,
      },
      headers: headers()
    });
  },
  filterReport(queryString: object) {
    return AXIOS.get(`${Prefix.api}/person-filter-report`, {
      params: { ...queryString },
      headers: headers()
    });
  },
  getPartnerFamilyStatistics() {
    return AXIOS.get(`${Prefix.api}/access-control-partner-family-statistics`, {
      headers: headers()
    });
  },
  getGuestStatistics() {
    return AXIOS.get(`${Prefix.api}/access-control-guest-statistics`, {
      headers: headers()
    });
  },
};

export default API;
