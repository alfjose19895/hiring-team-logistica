import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductMeasurement } from '../interfaces/productMeasurement';
import { ProductResponse } from '../interfaces/productResponse';
import { Stock } from '../interfaces/stock';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URL = 'http://localhost:80/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  refresh$ = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.API_URL}/products`,
      this.httpOptions
    );
  }

  createProduct(
    product: Product,
    productMeasurement: ProductMeasurement,
    stock: Stock
  ): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(
      `${this.API_URL}/products`,
      { ...product, productMeasurement, stock },
      this.httpOptions
    );
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.httpClient.delete<ProductResponse>(
      `${this.API_URL}/products/${id}`,
      this.httpOptions
    );
  }

  updateProduct(
    product: Product,
    productMeasurement: ProductMeasurement,
    stock: Stock
  ): Observable<ProductResponse> {
    return this.httpClient.patch<ProductResponse>(
      `${this.API_URL}/products/${product.id}`,
      { ...product, productMeasurement, stock },
      this.httpOptions
    );
  }
}
