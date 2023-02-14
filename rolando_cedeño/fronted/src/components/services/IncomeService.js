import http from '../../http-common'

class IncomeService {

    getAll() {
        return http.get("/incomes");
    }
  
    create(data) {
      return http.post("/save-income", data);
    }
  

    deatilIncome(id) {
        return http.get(`/details-income/${id}`);
    }
  
  }
  
  export default new IncomeService();