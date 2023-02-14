import http from '../../http-common'

class ProductService {

    searchProduct(data) {
        return http.post("/product-search", data);
    }

    searchProductsHistory(data) {
      return http.post("/product-search-hist", data);
  }
  
    create(data) {
      return http.post("/products", data);
    }
  
    update(id, data) {
      return http.put(`/products/${id}`, data);
    }
  
    delete(id) {
        return http.delete(`/products/${id}`);
    }

    searchProductStock(data) {
        return http.post("/product-search-stock", data);
    }

    getProduct(id) {
        return http.get(`/get-product/${id}`);
    }

    detailHistory(id){
      return http.get(`/detail-history/${id}`);
    }
  
  }
  
  export default new ProductService();