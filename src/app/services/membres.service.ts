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

  connexion(body: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiEndpoint + '/connexion', body);
  }

  createCompte(body: { email: string, password: string, nom: string, prenom: string }): Observable<any> {
    return this.http.post(this.apiEndpoint + '/inscription', body);
  }
}
