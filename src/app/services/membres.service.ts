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
    return this.http.get<{ produit: string | Produit, quantity: number }[]>(this.apiEndpoint + "/" + membre._id + "/panier");
  }

  addToPanier(membre: Membre = this.authService.user, produit: Produit, quantity = 1): Observable<any> {
    return this.http.post<any>(this.apiEndpoint + "/" + membre._id + "/panier",{produitId: produit._id, quantity: quantity});
    // POST `${endpoint}/${membre._id}/panier` {produitId, quantity} -> 204
  }

  deleteOnePanier(membre: Membre = this.authService.user, produit: Produit): Observable<any> {
    return this.http.delete<any>(this.apiEndpoint + "/" + membre._id + "/panier/" + produit._id)
    //TODO : Implementer deleteOne dans l'API
  }

  deletePanier(membre: Membre = this.authService.user): Observable<any> {
    return this.http.delete<any>(this.apiEndpoint + "/" + membre._id + "/panier");
    // DELETE `${endpoint}/${membre._id}/panier` -> 204
  }
}
