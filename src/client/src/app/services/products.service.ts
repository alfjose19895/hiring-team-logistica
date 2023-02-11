import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductResponse } from '../interfaces/productResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URL = 'http://127.0.0.1:8000/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.API_URL}/products`,
      this.httpOptions
    );
  }

  createProduct(product: Product): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(
      `${this.API_URL}/products`,
      {
        name: product.name,
        code: product.code,
        has_stock: product.has_stock,
        category_id: product.category_id,
      },
      this.httpOptions
    );
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.httpClient.delete<ProductResponse>(
      `${this.API_URL}/products/${id}`,
      this.httpOptions
    );
  }

  updateProduct(product: Product): Observable<ProductResponse> {
    return this.httpClient.patch<ProductResponse>(
      `${this.API_URL}/products/${product.id}`,
      {
        name: product.name,
        code: product.code,
        has_stock: product.has_stock,
        category_id: product.category_id,
      },
      this.httpOptions
    );
  }
}
