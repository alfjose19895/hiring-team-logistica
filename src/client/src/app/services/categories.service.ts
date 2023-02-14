import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { CategoryResponse } from '../interfaces/categoryResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  API_URL = 'http://localhost:80/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  createCategory(name: string): Observable<CategoryResponse> {
    return this.httpClient.post<CategoryResponse>(
      `${this.API_URL}/categories`,
      { name },
      this.httpOptions
    );
  }

  deleteCategory(id: number): Observable<CategoryResponse> {
    return this.httpClient.delete<CategoryResponse>(
      `${this.API_URL}/categories/${id}`,
      this.httpOptions
    );
  }

  updateCategory(id: string, name: string): Observable<CategoryResponse> {
    return this.httpClient.patch<CategoryResponse>(
      `${this.API_URL}/categories/${id}`,
      {
        name,
      },
      this.httpOptions
    );
  }
}
