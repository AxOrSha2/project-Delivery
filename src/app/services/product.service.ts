import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url_api = 'http://127.0.0.1:4000/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.url_api);
  }

  createProduct(producto: Product): Observable<any> {
    return this.http.post(this.url_api, producto);
  }

  findProduct(id: String): Observable<any> {
    return this.http.get(`${this.url_api}/${id} `);
  }

  updateProduct(id: String, producto: Product): Observable<any> {
    return this.http.put(`${this.url_api}/${id}`, producto);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.url_api}/${id}`)
  }

}
