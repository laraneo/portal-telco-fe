import SecureStorage from "../config/SecureStorage";

interface HeadersData {
  [key:string]: string;
}

export default function headers() {
    const items: HeadersData = { 
      'Content-Type': 'application/json',
    };
    const token = SecureStorage.getItem('token');
    if (token) {
      items.Authorization = `Bearer ${token}`;
    }
    return items;
  }
  