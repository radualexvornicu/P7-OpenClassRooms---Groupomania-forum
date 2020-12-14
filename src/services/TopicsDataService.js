import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/';

class TopicsDataService {
  getAll(catid) {
    return axios.get(API_URL + `topics/catid/${catid}`, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `topics/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "topics", { headers: authHeader() }, data);
  }

  update(id, data) {
    return axios.put(API_URL + `topics/${id}`, { headers: authHeader() }, data);
  }

  delete(id) {
    return axios.delete(API_URL + `topics/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL + "topics", { headers: authHeader() });
  }

  findByTitle(topicsubject) {
    return axios.get(API_URL + `topics?topicsubject=${topicsubject}`, { headers: authHeader() });
  }
}

export default new TopicsDataService();