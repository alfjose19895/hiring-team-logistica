import http from '../../http-common'

class ExitService {

    getAll() {
        return http.get("/exits");
    }
  
    create(data) {
      return http.post("/save-exit", data);
    }
  

    deatilExit(id) {
        return http.get(`/details-exit/${id}`);
    }
  
  }
  
  export default new ExitService();