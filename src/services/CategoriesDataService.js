import http from "../http-common";
const API_URL = 'http://localhost:8080/api/';

class CategoriesDataService {
  getAll(params) {
    return http.get(API_URL + "categories", {params} );
  }

  get(id) {
    return http.get(API_URL + `categories/${id}` );
  }

  create(data) {
    return http.post(API_URL + "categories" , data);
  }

  update(id, data) {
    return http.put(API_URL + `categories/${id}` , data);
  }

  delete(id) {
    return http.delete(API_URL + `categories/${id}` );
  }

  deleteAll() {
    return http.delete(API_URL + "categories" );
  }

  findByTitle(catname) {
    return http.get(API_URL + `categories?catname=${catname}` );
  }
}

export default new CategoriesDataService();