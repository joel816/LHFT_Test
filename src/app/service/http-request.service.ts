import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../model/interface.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>('http://localhost:5000/configuration/get');
  }

}
