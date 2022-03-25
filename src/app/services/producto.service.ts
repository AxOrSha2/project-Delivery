import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url_api = 'http://127.0.0.1:4000/api/v1/productos';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {
    return this.http.get(this.url_api);
  }

  agregarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url_api, producto);
  }

  obtenerProducto(id: String): Observable<any> {
    return this.http.get(`${this.url_api}/${id} `);
  }

  actualizarProducto(id: String, producto: Producto): Observable<any> {
    return this.http.put(`${this.url_api}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url_api}/${id}`)
  }

}
