import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getStatusAccount(isCache: boolean) {
    return AXIOS.get(`${Prefix.api}/status-account`, { 
        params: {
          isCache,
        },
        headers: headers() 
    });
  },
  getUnpaidInvoices(isCache: boolean) {
    return AXIOS.get(`${Prefix.api}/get-unpaid-invoices`, { 
        params: { isCache },
        headers: headers() 
    });
  },
  getUnpaidInvoicesByShare(share: string) {
    return AXIOS.get(`${Prefix.api}/get-unpaid-invoices-by-share`, { 
        params: { share },
        headers: headers() 
    });
  },
  getReportedPayments() {
    return AXIOS.get(`${Prefix.api}/eb`, { 
        headers: headers() 
    });
  },
  getBalance(isCache: boolean) {
    return AXIOS.get(`${Prefix.api}/get-balance`, {
        params: { isCache }, 
        headers: headers() 
    });
  },
  setOrder(data: object) {
    return AXIOS.get(`${Prefix.api}/set-order`, {
        params: {
          ...data
        },
        headers: headers() 
    });
  },
  setInvoicePayment(data: object) {
    return AXIOS.get(`${Prefix.api}/set-invoice-payment`, {
        params: {
          ...data
        },
        headers: headers() 
    });
  },
  getTasa() {
    return AXIOS.get(`${Prefix.api}/get-tasa`, {
        headers: headers() 
    });
  },
};

export default API;
