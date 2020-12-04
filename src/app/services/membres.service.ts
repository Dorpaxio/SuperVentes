import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import Membre from '../models/Membre';
import {Observable} from 'rxjs';
import Produit from '../models/Produit';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembresService {
  apiEndpoint = environment.endpoint + '/membres';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(this.apiEndpoint);
  }

  getPanier(membre: Membre = this.authService.user): Observable<{ produit: string | Produit, quantity: number }[]> {
    // GET `${endpoint}/${membre._id}/panier` -> 200
  }

  addToPanier(membre: Membre = this.authService.user, produit: Produit, quantity = 1): Observable<any> {
    // POST `${endpoint}/${membre._id}/panier` {produitId, quantity} -> 204
  }

  deletePanier(membre: Membre = this.authService.user): Observable<any> {
    // DELETE `${endpoint}/${membre._id}/panier` -> 204
  }
}
