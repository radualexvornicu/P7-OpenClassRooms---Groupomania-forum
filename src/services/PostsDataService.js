import http from "../http-common";
const API_URL = 'http://localhost:8080/api/';

class PostsDataService {
  getAll(params, id) {
    return http.get(API_URL + `posts/topid/${id}`, {params});
  }

  get(id) {
    return http.get(API_URL + `posts/${id}`);
  }

  create(data) {
    return http.post(API_URL + "posts", data);
  }

  update(id, data) {
    return http.put(API_URL + `posts/${id}`, data);
  }

  delete(id) {
    return http.delete(API_URL + `posts/${id}` );
  }

  deleteAll() {
    return http.delete(API_URL + "posts" );
  }

  findByTitle(postsubject) {
    return http.get(API_URL + `posts?postsubject=${postsubject}` );
  }
}

export default new PostsDataService();