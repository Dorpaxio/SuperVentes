import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import Membre from '../models/Membre';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembresService {
  apiEndpoint = environment.endpoint + '/membres';

  constructor(private http: HttpClient) {
  }

  getMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(this.apiEndpoint);
  }
}
