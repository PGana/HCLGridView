import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourcesService {

  constructor(private http: HttpClient) { }

  getCources() {
    const url = environment.courcesUrl;
    return this.http.get(url + '/getCources');
  }
}
