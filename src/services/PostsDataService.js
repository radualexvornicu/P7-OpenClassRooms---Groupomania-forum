import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/';

class PostsDataService {
  getAll(topid) {
    return axios.get(API_URL + `posts/topid/${topid}`, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `posts/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "posts", { headers: authHeader() }, data);
  }

  update(id, data) {
    return axios.put(API_URL + `posts/${id}`, { headers: authHeader() }, data);
  }

  delete(id) {
    return axios.delete(API_URL + `posts/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL + "posts", { headers: authHeader() });
  }

  findByTitle(postsubject) {
    return axios.get(API_URL + `posts?postsubject=${postsubject}`, { headers: authHeader() });
  }
}

export default new PostsDataService();