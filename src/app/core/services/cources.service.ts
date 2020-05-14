import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourcesService {

  constructor(private http: HttpClient) { }

  getCources() {
    return this.http.get('/assets/json/cource.mock.json');
  }
}
