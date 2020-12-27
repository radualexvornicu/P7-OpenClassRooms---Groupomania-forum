import axios from 'axios';
import http from "../http-common";

import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/content/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserName(id){
    return axios.get(API_URL + `name/${id}`, { headers: authHeader() });
  }
  update(id, data) {
    return http.put(API_URL + `profile/${id}`, data);
  }
 
  delete(id){
    return axios.delete(API_URL + `profile/${id}`);
  }
  
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
