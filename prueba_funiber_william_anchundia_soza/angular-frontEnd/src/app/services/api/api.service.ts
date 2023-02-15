import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CategoryProductI } from 'src/app/models/categoryProduct.interface';
import { ProductI } from 'src/app/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlServer:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { 
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+localStorage.getItem('token')
    });
    return headers;
  }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direction = this.urlServer+"security/logeo/"+form.user+"/"+form.password+"/";
    return this.http.get<ResponseI>(direction);
  }

  //History-products
  getAllHistoryProduct():Observable<ResponseI>{
    let direction = this.urlServer+"history-product/all";
    const headers = this.getHeaders();
    return this.http.get<ResponseI>(direction,{ headers });
  }



  //category-product
  getAllCategoryProduct():Observable<ResponseI>{
    let direction = this.urlServer+"category-product/all";
    const headers = this.getHeaders();
    return this.http.get<ResponseI>(direction,{ headers });
  }

  deleteCategoryProduct(id:any):Observable<ResponseI>{
    let direction = this.urlServer+"category-product/"+id;
    const headers = this.getHeaders();
    return this.http.delete<ResponseI>(direction,{ headers });
  }

  createCategoryProduct(form:CategoryProductI):Observable<ResponseI>{
    let direction = this.urlServer+"category-product";
    const headers = this.getHeaders();
    return this.http.post<ResponseI>(direction,form,{ headers });
  }

  updateCategoryProduct(form:CategoryProductI):Observable<ResponseI>{
    let direction = this.urlServer+"category-product";
    const headers = this.getHeaders();
    return this.http.put<ResponseI>(direction,form,{ headers });
  }

  //product
  getAllProduct():Observable<ResponseI>{
    let direction = this.urlServer+"product/all";
    const headers = this.getHeaders();
    return this.http.get<ResponseI>(direction,{ headers });
  }

  getAllProductSearch(typeFilter:any,valueFilter:any):Observable<ResponseI>{
    let direction = this.urlServer+"product/allSearch/"+typeFilter+"/"+valueFilter;
    const headers = this.getHeaders();
    return this.http.get<ResponseI>(direction,{ headers });
  }

  deleteProduct(id:any):Observable<ResponseI>{
    let direction = this.urlServer+"product/"+id;
    const headers = this.getHeaders();
    return this.http.delete<ResponseI>(direction,{ headers });
  }

  createProduct(form:ProductI):Observable<ResponseI>{
    let direction = this.urlServer+"product";
    const headers = this.getHeaders();
    return this.http.post<ResponseI>(direction,form,{ headers });
  }

  updateProduct(form:ProductI):Observable<ResponseI>{
    let direction = this.urlServer+"product";
    const headers = this.getHeaders();
    return this.http.put<ResponseI>(direction,form,{ headers });
  }

}
