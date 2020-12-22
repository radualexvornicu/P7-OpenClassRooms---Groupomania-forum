import http from "../http-common";
const API_URL = 'http://localhost:8080/api/';

class TopicsDataService {
  getAllPage(params, id) {
    return http.get(API_URL + `topics/catid/${id}`, {params});
  }
  getAll(params) {
    return http.get(API_URL + `topics/catid/`, {params});
  }

  get(id) {
    return http.get(API_URL + `topics/${id}`);
  }

  create(data) {
    return http.post(API_URL + "topics", data);
  }

  update(id, data) {
    return http.put(API_URL + `topics/${id}`, data);
  }

  delete(id) {
    return http.delete(API_URL + `topics/${id}`);
  }

  deleteAll() {
    return http.delete(API_URL + "topics");
  }

  findByTitle(topicsubject) {
    return http.get(API_URL + `topics?topicsubject=${topicsubject}`);
  }
}

export default new TopicsDataService();