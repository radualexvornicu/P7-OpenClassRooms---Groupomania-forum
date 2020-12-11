import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/';

class CategoriesDataService {
  getAll() {
    return axios.get(API_URL + "categories", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `categories/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "categories", { headers: authHeader() }, data);
  }

  update(id, data) {
    return axios.put(API_URL + `categories/${id}`, { headers: authHeader() }, data);
  }

  delete(id) {
    return axios.delete(API_URL + `categories/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL + "categories", { headers: authHeader() });
  }

  findByTitle(catname) {
    return axios.get(API_URL + `categories?catname=${catname}`, { headers: authHeader() });
  }
}

export default new CategoriesDataService();