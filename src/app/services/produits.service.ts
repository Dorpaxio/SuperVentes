import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import Produit from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  apiEndpoint = environment.endpoint + '/produits';

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiEndpoint);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiEndpoint, produit);
  }
}
