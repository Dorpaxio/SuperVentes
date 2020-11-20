import { Injectable } from '@angular/core';
import Marque from '../models/Marque';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarquesService {
  apiEndpoint = environment.endpoint + '/marques';

  constructor(private http: HttpClient) {
  }

  getMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.apiEndpoint);
  }

  createMarque(marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiEndpoint, marque);
  }

  getMarque(id: string): Observable<Marque> {
    return this.http.get<Marque>(this.apiEndpoint + '/' + id);
  }

  deleteMarque(id: string): Observable<any> {
    return this.http.delete<any>(this.apiEndpoint + '/' + id);
  }
}
