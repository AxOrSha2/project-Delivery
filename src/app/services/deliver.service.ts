import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliver } from '../models/deliver';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  url_api = 'http://127.0.0.1:9000/api/v1/delivers';

  constructor(private http: HttpClient) { }

  obtenerDelivers(): Observable<any> {
    return this.http.get(this.url_api);
  }

  agregarDeliver(deliver: Deliver): Observable<any> {
    return this.http.post(this.url_api, deliver);
  }

  obtenerDeliver(id: String): Observable<any> {
    return this.http.get(`${this.url_api}/${id} `);
  }

  actualizarDeliver(id: String, deliver: Deliver): Observable<any> {
    return this.http.put(`${this.url_api}/${id}`,deliver);
  }

  eliminarDeliver(id:string): Observable<any> {
    return this.http.delete(`${this.url_api}/${id}`)
  }

}
