
import http from '../../http-common'

class CategoryService {
    getAll() {
        return http.get("/categorias");
    }
  
    create(data) {
      return http.post("/categorias", data);
    }
  
    update(id, data) {
      return http.put(`/categorias/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/categorias/${id}`);
    }

    getCategoryCmb() {
      return http.get(`/categories-cmb`);
    }
  
  }
  
  export default new CategoryService();